# !/bin/bash

# set ability to execute itself
chmod +x "$0" 

# set colors 
COLOR='\033[0;32m'
NC='\033[0m'

# name the sbom the directory (project) name
selected_file=$(basename "$(pwd)")
echo -e "${COLOR} Project (directory) name: ${NC} $selected_file"

# install cdxgen
echo -e "${COLOR}--- ** Checking CDXGEN installation... ---${NC}"

if which cdxgen >/dev/null 2>&1; then
    echo -e "${COLOR}--- CDXGEN is already installed. Skipping re-installation... ---${NC}"
else
    echo -e "${COLOR}--- INSTALLING CDXGEN... ---${NC}"
    # see if way to install without sudo
    sudo npm install -g @cyclonedx/cdxgen@8.6.0
    echo -e "${COLOR}--- Successful: INSTALLED CDXGEN ---${NC}"
fi

# install grype
echo -e "${COLOR}--- ** CHECKING GRYPE INSTALLATION... ---${NC}"

if [ -x "./bin/grype" ]; then
    echo -e "${COLOR}--- GRYPE is already installed. Skipping re-installation... ---${NC}"
else
    echo -e "${COLOR}--- Grype was not found. INSTALLING GRYPE... ---${NC}"
    wget https://raw.githubusercontent.com/anchore/grype/main/install.sh
    chmod +x install.sh
    ./install.sh
    echo -e "${COLOR}--- Successful: INSTALLED GRYPE ---${NC}"
fi

# run cdxgen selected file to create SBOM w/o vulnerabilities
echo -e "${COLOR} Creating an SBOM for your file. This may take a while... ${NC}"
cdxgen -r -o $selected_file.1.json
echo -e "${COLOR} Finished running cdxgen on $selected_file. Running grype... ${NC}"


echo "BEFORE"
# run grype on SBOM (piped in from cdxgen)
./bin/grype sbom:$selected_file.1.json -o cyclonedx-json > $selected_file.2.json
echo "AFTER"

# remove the extra .xml file created
if [ -f $selected_file.1.xml ]; then
    rm $selected_file.1.xml
fi

# combine cdxgen and grype outputs into one file using jq. First check if jq is installed. 
# sudo apt-get install jq ./
echo -e "${COLOR}--- ** CHECKING JQ INSTALLATION... ---${NC}"

if [ -x "./jq" ]; then
    echo -e "${COLOR}--- JQ is already installed. Skipping re-installation... ---${NC}"
else
    echo -e "${COLOR}--- INSTALLING JQ... ---${NC}"
    wget -O jq https://github.com/stedolan/jq/releases/latest/download/jq-linux64
    chmod +x jq
    echo -e "${COLOR}--- Successful: INSTALLED JQ ---${NC}"
fi

jq -s 'add' $selected_file.1.json $selected_file.2.json > $selected_file.LINUX.json

# finished
echo -e "${COLOR}You have now created $selected_file.LINUX.json, which is your SBOM to upload. Your vulnerabilities are stored in the grype database and can be seen with <grype db status>${NC}"        
