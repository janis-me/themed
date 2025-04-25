import { atom } from 'jotai';

import { EXAMPLES } from './constants';

const urlParams = new URLSearchParams(window.location.search);
const exampleParam = urlParams.get('example') as keyof typeof EXAMPLES;
const headerParam = urlParams.get('header') as 'true' | 'false' | null;
const initialExample = Object.keys(EXAMPLES).includes(exampleParam) ? exampleParam : 'simple';
const initialCode = EXAMPLES[initialExample];

export const headerAtom = atom<boolean>(headerParam === 'false' ? false : true);
export const exampleAtom = atom<typeof initialExample | null>(initialExample);
export const editorAtom = atom<string>(initialCode);
