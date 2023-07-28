#!/bin/bash
# Color codes
COLOR='\033[0;32m'
NC='\033[0m'

# # The file to be analyzed is passed as an argument
# selected_file="$1"
# the selected file is just the name of the directory
selected_file=$(basename "$(pwd)")

# Output the selected file
echo -e "${COLOR} Project (directory) name: ${NC} $selected_file"

echo -e "${COLOR}--- ** Checking CDXGEN installation... ---${NC}"

if which cdxgen >/dev/null 2>&1; then
    echo -e "${COLOR}--- CDXGEN is already installed. Skipping re-installation... ---${NC}"
else
    echo -e "${COLOR}--- Cdxgen was not found. INSTALLING CDXGEN... ---${NC}"
    # see if way to install without sudo
    # mkdir -p ./bin
    # npm install --prefix ./bin @cyclonedx/cdxgen@8.6.0
    sudo npm install -g @cyclonedx/cdxgen@8.6.0
    echo -e "${COLOR}--- Successful: INSTALLED CDXGEN ---${NC}"
fi

# Generate Software Bill of Materials (SBOM) for the selected file
echo -e "${COLOR} Creating an SBOM for your file. This may take a while... ${NC}"
cdxgen -r -o $selected_file.1.json

if [ -x "./bin/grype" ]; then
    echo -e "${COLOR}--- GRYPE is already installed. Skipping re-installation... ---${NC}"
else
    echo -e "${COLOR}--- Grype was not found. INSTALLING GRYPE... ---${NC}"
    wget https://raw.githubusercontent.com/anchore/grype/main/install.sh
    chmod +x install.sh
    ./install.sh
    echo -e "${COLOR}--- Successful: INSTALLED GRYPE ---${NC}"
fi

echo -e "${COLOR}--- ** CHECKING JQ INSTALLATION... ---${NC}"

if [ -x "./jq" ]; then
    echo -e "${COLOR}--- JQ is already installed. Skipping re-installation... ---${NC}"
else
    echo -e "${COLOR}--- JQ was not found. INSTALLING JQ... ---${NC}"
    wget -O jq https://github.com/stedolan/jq/releases/latest/download/jq-linux64
    chmod +x jq
    echo -e "${COLOR}--- Successful: INSTALLED JQ ---${NC}"
fi


# Run Grype to analyze the SBOM
echo -e "${COLOR} Finished running cdxgen on $selected_file. Running grype... ${NC}"
grype sbom:./$selected_file.1.json -o cyclonedx-json > $selected_file.2.json

# If an XML file was created in the process, delete it
if [ -f $selected_file.1.xml ]; then
    rm $selected_file.1.xml
fi

# Combine the JSON files into one
jq -s 'add' $selected_file.1.json $selected_file.2.json > $selected_file.linux.json

# remove the extra .1 file created
# if [ -f $selected_file.1.json ]; then
#     rm $selected_file.1.json
# fi
# remove the extra .2 file created
# if [ -f $selected_file.2.json ]; then
#     rm $selected_file.2.json
# fi

# Output the results
echo -e "${COLOR}You have now created $selected_file.linux.json, which is your SBOM to upload. Your vulnerabilities are stored in the grype database and can be seen with <grype db status>${NC}" 
