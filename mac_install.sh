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

# Install CDXGEN
echo -e "${COLOR}--- INSTALLING CDXGEN... ---${NC}"  
sudo npm install -g @cyclonedx/cdxgen@8.6.0
echo -e "${COLOR}--- Successful: INSTALLED CDXGEN ---${NC}"

# Install Grype
echo -e "${COLOR}--- INSTALLING GRYPE... ---${NC}"
brew install grype
echo -e "${COLOR}--- Successful: INSTALLED GRYPE ---${NC}"

# Generate Software Bill of Materials (SBOM) for the selected file
echo -e "${COLOR} Creating an SBOM for your file... ${NC}"
cdxgen -r -o $selected_file.1.json
echo -e "${COLOR} Finished creating $selected_file.json ${NC}"

# Run Grype to analyze the SBOM
grype sbom:$selected_file.1.json -o cyclonedx-json > $selected_file.2.json
# If an XML file was created in the process, delete it
if [ -f $selected_file.1.xml ]; then
    rm $selected_file.1.xml
fi

# Install jq, a command-line JSON processor
brew install jq

# Combine the JSON files into one
jq -s 'add' $selected_file.1.json $selected_file.2.json > $selected_file.FINAL.json

# Output the results
echo -e "${COLOR}You have now created $selected_file.json, which is your SBOM to upload. Your vulnerabilities are stored in the grype database and can be seen with <grype db status>${NC}" 
