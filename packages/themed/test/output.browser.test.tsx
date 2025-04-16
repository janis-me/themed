import { assert, expect, test } from 'vitest';

test('general rendering', () => {
  const testElem = `<h1 id="title" style="color: red">Hello, Vitest!</h1>;`;

  document.body.innerHTML = testElem;

  const title = document.getElementById('title');

  // Ensure the title exists
  expect(title).not.toBeNull();

  assert(title, 'Title element should not be null');

  // Ensure the title text is correct
  expect(title.textContent).toBe('Hello, Vitest!');
  expect(title.style.color).toBe('red');
  expect(getComputedStyle(title).color).toBe('rgb(255, 0, 0)');
});
