#!/bin/sh

git checkout master ./README.md
README=`cat README.md`
echo "---\nlayout: index\n---\n$README" > index.md
git reset HEAD README.md

git checkout develop tests/tests.html
mv tests/tests.html tests.html
git reset HEAD tests/tests.html

git add tests.html index.md
git commit -m "Updated website"

git push origin gh-pages

