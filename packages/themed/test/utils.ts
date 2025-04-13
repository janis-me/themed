/**
 * Tagged template literal function for coercing certain values to what
 * we would expected for a more JSX-like syntax.
 *
 * For values that we don't want to coerce, we just skip outputting them
 * Example:
 *   `class="${variable}"`
 * If the value of my variable was one of these types I don't want
 * JavaScript to coerce, then I'd get this:
 *   'class=""'
 */
export function jsx(strings: TemplateStringsArray, ...values: unknown[]) {
  let out = '';
  strings.forEach((string, i) => {
    const value = values[i];

    // Array - Join to string and output with value
    if (Array.isArray(value)) {
      out += string + value.join('');
    }
    // String - Output with value
    else if (typeof value === 'string') {
      out += string + value;
    }
    // Number - Coerce to string and output with value
    // This would happen anyway, but for clarity's sake on what's happening here
    else if (typeof value === 'number') {
      out += string + String(value);
    }
    // object, undefined, null, boolean - Don't output a value.
    else {
      out += string;
    }
  });

  return out;
}
