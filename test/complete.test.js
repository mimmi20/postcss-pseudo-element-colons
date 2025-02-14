import postcss from 'postcss';
import { describe, it, expect } from 'vitest';
import plugin from '../index.js';

describe('Various complete test', function () {
  const tests = [
    {
      name: 'convert to single colons',
      source: `
      ul::before {
        background: white;
      }
      `,
      expected: `
      ul:before {
        background: white;
      }
      `,
      options: { 'colon-notation': 'single' },
    },
    {
      name: 'convert to double colons',
      source: `
      ul:before {
        background: white;
      }
      `,
      expected: `
      ul::before {
        background: white;
      }
      `,
      options: { 'colon-notation': 'double' },
    },
  ];

  tests.forEach(({ name, source, expected, options }) => {
    it(name, function () {
      const actual = postcss([plugin(options)]).process(source).css;

      expect(actual).toBe(expected);
    });
  });
});
