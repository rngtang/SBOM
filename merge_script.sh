# !/bin/bash
# make sure you're running script from your test branch (NOT development)

# commit local changes 
git add .
git commit -m "ready to merge development in"
git push

# get most updated development
git checkout development
git pull

# go back to local branch
branch=$(git symbolic-ref --short HEAD)
git checkout $branch

# merge development into local branch 
git merge development


# resolve any merge conflicts 


# then commit merge conflict resolution
git add .
git commit -m "merged development"
git push

# go back to development and merge local branch 
git checkout development 
git merge $branch

# update development 
git add .
git commit -m "merged branch $branch" 
git push