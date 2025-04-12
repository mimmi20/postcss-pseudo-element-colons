const defaultOptions = {
  selectors: ['before', 'after', 'first-letter', 'first-line'],
  'colon-notation': 'double',
};

const plugin = (options = {}) => {
  const currentOptions = {
    ...defaultOptions,
    ...options,
  };

  return {
    postcssPlugin: 'postcss-pseudo-element-colons',
    Rule(rule) {
      const replacements = new RegExp('(?:|:):(' + currentOptions.selectors.join('|') + ')', 'gi');

      if (!rule.selector.match(replacements)) {
        return;
      }

      const notation = currentOptions['colon-notation'] === 'double' ? '::' : ':';

      rule.selector = rule.selector.replace(replacements, notation + '$1');
    },
  };
};

plugin.postcss = true;

export default plugin;
