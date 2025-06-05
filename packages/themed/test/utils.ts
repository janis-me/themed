import * as sass from 'sass-embedded';

import { createThemedImporter } from '@janis.me/sass-loader';

export async function compile(input: string) {
  const res = await sass.compileStringAsync(input, {
    importers: [
      createThemedImporter(str => {
        console.log(str);
      }),
    ],
  });

  return res;
}
