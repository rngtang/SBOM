#!/bin/bash
chmod +x linux_install.sh
COLOR='\033[0;32m'
NC='\033[0m' # No Color

# RUN WITH: bash script.sh "path/to/selected/file.txt"
# selected_file="$1" # Access the selected file
# echo -e "${COLOR}Selected file: $selected_file${NC}" # Perform operations on the selected file

# pulls script to install syft into a new file called install.sh and runs it 
echo -e "${COLOR}--- INSTALLING CDXGEN... ---${NC}"  
wget https://raw.githubusercontent.com/anchore/syft/main/install.sh
# chmod +x install.sh
# ./install.sh
npm install -g @cyclonedx/cdxgen@8.6.0

# sudo mv ./bin/syft /usr/local/bin
echo -e "${COLOR}--- Successful: INSTALLED CDXGEN ---${NC}"

# pulls script to install grype into a new file called install.sh.1 and runs it 
echo -e "${COLOR}--- INSTALLING GRYPE... ---${NC}" 
wget https://raw.githubusercontent.com/anchore/grype/main/install.sh
chmod +x install.sh.1
./install.sh.1
# sudo mv ./bin/grype /usr/local/bin
echo -e "${COLOR}--- Successful: INSTALLED GRYPE ---${NC}"

# asks user to give the file to run 
# needs to be precise name -> need to add error handling
echo -e "${COLOR}Which file would you like to create an SBOM for?${NC}"
read NAME
echo -e "${COLOR}Creating $NAME.json ...${NC}"

cdxgen -o $NAME.json

# ./bin/syft $NAME -o cyclonedx-json=$NAME.sbom.json
grype sbom:./$NAME.json -o cyclonedx-json > grype.json

echo -e "${COLOR}You have now created $NAME.sbom.json, which is your SBOM to upload. Your vulnerabilities are stored in the grype database and can be seen with <grype db status>${NC}"