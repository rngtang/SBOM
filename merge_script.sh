# !/bin/bash
# make sure you're running script from your test branch (NOT development)
branch=$(git symbolic-ref --short HEAD)

# echo "commit local changes"
git add .
git commit -m "ready to merge development in"
git push

# echo "get most updated development"
git checkout development
git pull

# echo "go back to local branch"
git checkout $branch

# echo "merge dev into local branch"
git merge development

# echo "resolve any merge conflicts"
while true; do
    read -p "Have you resolved ALL merge conflicts? Answer 'yes' to continue. Press <Enter> to keep prompting. `echo $'\n> '`" -r input
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

# echo "then commit merge conflict resolution"
git add .
git commit -m "merged development"
git push

# echo "go back to dev and merge local"
git checkout development 
git merge $branch

# echo "update development"
git add .
git commit -m "merged branch $branch" 
git push
