pnpm run build:all

echo "Build was done. Check the output. Continue publishing?"
select yn in "Yes" "No"; do
    case $yn in
        Yes ) break;;
        No ) exit;;
    esac
done

pnpm run publish:themed
pnpm run publish:react-themed