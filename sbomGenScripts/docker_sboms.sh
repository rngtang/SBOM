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

# Generate Software Bill of Materials (SBOM) for the selected file
echo -e "${COLOR} Creating an SBOM for your file. This may take a while... ${NC}"
cdxgen -r -o $selected_file.1.json

# Run Grype to analyze the SBOM
echo -e "${COLOR} Finished running cdxgen on $selected_file. Running grype... ${NC}"
grype sbom:./$selected_file.1.json -o cyclonedx-json > $selected_file.2.json

# use jq to filter out just the vulnerabilities of the grype file 
/sboms/jq '{ vulnerabilities: .vulnerabilities, components: .components}' $selected_file.2.json > grypefiltered.json
# use jq to combine the vulnerabilities with the first (cdxgen) file
/sboms/jq -s 'add' $selected_file.1.json grypefiltered.json > $selected_file.SBOM.json

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

# Output the results
echo -e "${COLOR}You have now created $selected_file.SBOM.json, which is your SBOM to upload.${NC}" 
