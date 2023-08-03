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
    echo -e "${COLOR}--- CDXGEN is already installed. Skipping re-installation. ---${NC}"
else
    echo -e "${COLOR}--- Cdxgen was not found. INSTALLING CDXGEN... ---${NC}"
    sudo npm install -g @cyclonedx/cdxgen@8.6.0
    echo -e "${COLOR}--- Successful: INSTALLED CDXGEN ---${NC}"
fi

# run cdxgen selected file to create SBOM w/o vulnerabilities
echo -e "${COLOR} Creating an SBOM for your file. This may take a while... ${NC}"
cdxgen -r -o $selected_file.1.json
echo -e "${COLOR} Finished running cdxgen on $selected_file. Proceeding to grype. ${NC}"

# check for or install grype, and run it depending on where it is
echo -e "${COLOR}--- ** Checking GRYPE installation... ---${NC}"
if [ -x "./bin/grype" ]; then
    echo -e "${COLOR}--- GRYPE is already installed. Skipping re-installation and running grype... ---${NC}"
    ./bin/grype sbom:$selected_file.1.json -o cyclonedx-json > $selected_file.2.json
elif which grype >/dev/null 2>&1; then
    echo -e "${COLOR}--- GRYPE is already installed. Skipping re-installation and running grype... ---${NC}"
    grype sbom:$selected_file.1.json -o cyclonedx-json > $selected_file.2.json
else
    echo -e "${COLOR}--- Grype was not found. INSTALLING GRYPE... ---${NC}"
    wget https://raw.githubusercontent.com/anchore/grype/main/install.sh
    chmod +x install.sh
    ./install.sh
    echo -e "${COLOR}--- Successful: INSTALLED GRYPE ---${NC}"
    echo -e "${COLOR}--- Running grype... ---${NC}"
    ./bin/grype sbom:$selected_file.1.json -o cyclonedx-json > $selected_file.2.json
fi

echo -e "${COLOR} Finished running grype on $selected_file. Proceeding to jq. ${NC}"

# combine cdxgen and grype outputs into one file using jq, install jq locally. First check if jq is installed. 
echo -e "${COLOR}--- ** Checking JQ installation... ---${NC}"
if [ -x "./jq" ] || which jq >/dev/null 2>&1; then
    echo -e "${COLOR}--- JQ is already installed. Skipping re-installation. ---${NC}"
else
    echo -e "${COLOR}--- JQ was not found. INSTALLING JQ... ---${NC}"
    wget -O jq https://github.com/stedolan/jq/releases/latest/download/jq-linux64
    chmod +x jq
    echo -e "${COLOR}--- Successful: INSTALLED JQ ---${NC}"
fi

# use jq to filter out just the vulnerabilities of the grype file 
jq '{ vulnerabilities: .vulnerabilities, components: .components}' $selected_file.2.json > grypefiltered.json
# use jq to combine the vulnerabilities with the first (cdxgen) file
jq -s 'add' $selected_file.1.json grypefiltered.json > $selected_file.SBOM.json

# CLEAN UP
# remove the extra .xml file created
if [ -f $selected_file.1.xml ]; then
    rm $selected_file.1.xml
fi
# remove the extra .1 file created
if [ -f $selected_file.1.json ]; then
    rm $selected_file.1.json
fi
# remove the extra .2 file created
if [ -f $selected_file.2.json ]; then
    rm $selected_file.2.json
fi
# remove the vulnerabilities file created
if [ -f grypefiltered.json ]; then
    rm grypefiltered.json
fi

# finished
echo -e "${COLOR}You have now created $selected_file.SBOM.json, which is your SBOM to upload. ${NC}" 
