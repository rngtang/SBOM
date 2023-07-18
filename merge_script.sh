# !/bin/bash
# make sure you're running script from your test branch (NOT development)
branch=$(git symbolic-ref --short HEAD)

# commit local changes 
echo "commit local changes"
git add .
git commit -m "ready to merge development in"
git push

# # get most updated development
# echo "get most updated development"
# git checkout development
# git pull

<<<<<<< HEAD
# go back to local branch
echo "go back to local branch"
git checkout $branch
=======
# # go back to local branch
# echo "go back to local branch"
# branch=$(git symbolic-ref --short HEAD)
# git checkout $branch
>>>>>>> development

# # merge development into local branch 
# echo "merge dev into local branch"
# git merge development


# # resolve any merge conflicts 
# echo "resolve any merge conflicts"


# # then commit merge conflict resolution
# echo "then commit merge conflict resolution"
# git add .
# git commit -m "merged development"
# git push

# # go back to development and merge local branch 
# echo "go back to dev and merge local"
# git checkout development 
# git merge $branch

# # update development 
# echo "update dev"
# git add .
# git commit -m "merged branch $branch" 
# git push
