const defaultOptions = {
  selectors: ['before', 'after', 'first-letter', 'first-line'],
  'colon-notation': 'double',
};

const plugin = (options = {}) => {
  const currentOptions = {
    ...defaultOptions,
    ...options,
  };

  const visited = new WeakSet();

  return {
    postcssPlugin: 'postcss-pseudo-element-colons',
    Rule(rule) {
      if (visited.has(rule)) {
        return;
      }

      const replacements = new RegExp('(?:|:):(' + currentOptions.selectors.join('|') + ')', 'gi');

      if (!rule.selector.match(replacements)) {
        visited.add(rule);
        return;
      }

      const notation = currentOptions['colon-notation'] === 'double' ? '::' : ':';

      rule.selector = rule.selector.replace(replacements, notation + '$1');
      visited.add(rule);
    },
  };
};

plugin.postcss = true;

export default plugin;
