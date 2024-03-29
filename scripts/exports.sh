#!/bin/bash
stylus --compress packages/styles/main.styl -o ./dist/main.css 

cd ./dist/components
for f in ./*; do
    if [[ $f == *.js ]]; then
        touch ../"$f"
        echo "module.exports = require('./components/$(basename -s .js "$f")');" >>../"$f"
    fi
     if [[ $f == *.d.ts ]]; then
        touch ../"$f"
        echo "export * from './components/$(basename -s .d.ts "$f")'" >>../"$f"
        echo "export { default } from './components/$(basename -s .d.ts "$f")'" >>../"$f"
    fi
done

cd ../hooks

for f in ./*; do
    if [[ $f == *.js ]]; then
        touch ../"$f"
        echo "module.exports = require('./hooks/$(basename -s .js "$f")');" >>../"$f"
    fi
     if [[ $f == *.d.ts ]]; then
        touch ../"$f"
        echo "export * from './hooks/$(basename -s .d.ts "$f")'" >>../"$f"
        echo "export { default } from './hooks/$(basename -s .d.ts "$f")'" >>../"$f"
    fi
done

cd ../utils

for f in ./*; do
    if [[ $f == *.js ]]; then
        touch ../"$f"
        echo "module.exports = require('./utils/$(basename -s .js "$f")');" >>../"$f"
    fi
     if [[ $f == *.d.ts ]]; then
        touch ../"$f"
        echo "export * from './utils/$(basename -s .d.ts "$f")'" >>../"$f"
        echo "export { default } from './utils/$(basename -s .d.ts "$f")'" >>../"$f"
    fi
done

cd ..

mv use-data-view.d.ts data.d.ts
mv use-data-view.js data.js

mv use-form.d.ts form.d.ts
mv use-form.js form.js

touch index.d.ts


cd ..

cp README.md ./dist
cp LICENSE ./dist
cp package.json ./dist

