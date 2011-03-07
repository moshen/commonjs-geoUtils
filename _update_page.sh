#!/bin/sh

git checkout master ./README.md
README=`cat README.md`
echo "---\nlayout: index\n---\n$README" > index.md
git reset HEAD README.md
rm README.md

git add index.md
git commit -m "Updated website `date`"

git push origin gh-pages

