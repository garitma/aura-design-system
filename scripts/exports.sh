#!/bin/bash
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
        echo "module.exports = require('./components/$(basename -s .js "$f")');" >>../"$f"
    fi
     if [[ $f == *.d.ts ]]; then
        touch ../"$f"
        echo "export * from './components/$(basename -s .d.ts "$f")'" >>../"$f"
        echo "export { default } from './components/$(basename -s .d.ts "$f")'" >>../"$f"
    fi
done

cd ..

mv use-data-view.d.ts data.d.ts
mv use-data-view.js data.js

mv use-form.d.ts form.d.ts
mv use-form.js form.js
