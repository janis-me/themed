import { expect, test } from 'vitest';
import { jsx } from './utils';

test('properly handles form inputs', async () => {
  const testElem = jsx`<h1 id="title" style={{color: "red";}}>Hello, Vitest!</h1>;`;

  document.body.innerHTML = testElem;

  const title = document.getElementById('title');

  // Ensure the title exists
  expect(title).not.toBeNull();

  // Ensure the title text is correct
  expect(title!.textContent).toBe('Hello, Vitest!');

  // Check if styles are applied (optional)
  const color = getComputedStyle(title as HTMLElement).color;
  console.log(color);
});
