pnpm -w run build
pnpm --parallel --filter=@janis.me/themed-docs --filter=@janis.me/themed-playground build

rm -rf ./dist

mkdir ./dist
mkdir ./dist/playground
cp -r ./packages/docs/.vitepress/dist/* ./dist
cp -r ./packages/playground/dist/* ./dist/playground