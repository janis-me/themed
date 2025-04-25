pnpm -w run build
pnpm --parallel --filter=@janis.me/themed-docs --filter=@janis.me/themed-playground --filter=@janis.me/themed-generator build

rm -rf ./dist

mkdir ./dist
mkdir ./dist/playground
mkdir ./dist/generator
cp -r ./packages/docs/.vitepress/dist/* ./dist
cp -r ./packages/playground/dist/* ./dist/playground
cp -r ./packages/generator/dist/* ./dist/generator