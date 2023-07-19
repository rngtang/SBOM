# !/bin/bash
# make sure you're running script from your test branch (NOT development)
branch=$(git symbolic-ref --short HEAD)

# commit local changes 
# echo "commit local changes"
git add .
git commit -m "ready to merge development in"
git push

# get most updated development
# echo "get most updated development"
git checkout development
git pull

# go back to local branch
# echo "go back to local branch"
git checkout $branch

# merge development into local branch 
# echo "merge dev into local branch"
git merge development

# resolve any merge conflicts 
# echo "resolve any merge conflicts"
while true; do
    read -p "Have you resolved ALL merge conflicts? Answer 'yes' to continue. Press Enter to keep prompting. `echo $'\n> '`" -r input
    if [[ "$input" == "yes" ]]; then
        break
    elif [[ -z "$input" ]]; then
        continue
    else
        echo "Invalid input. Please enter 'yes' or press Enter to continue."
    fi
done

# The script will continue here if the user entered "yes"
echo "Continuing to merge into development..."

# then commit merge conflict resolution
# echo "then commit merge conflict resolution"
git add .
git commit -m "merged development"
git push

# go back to development and merge local branch 
# echo "go back to dev and merge local"
git checkout development 
git merge $branch

# update development 
# echo "update dev"
git add .
git commit -m "merged branch $branch" 
git push
