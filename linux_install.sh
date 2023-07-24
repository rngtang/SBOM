# !/bin/bash

# set ability to execute itself
chmod +x "$0" 
COLOR='\033[0;32m'
NC='\033[0m'

selected_file=$(basename "$(pwd)")
echo -e "${COLOR} Project (directory) name: ${NC} $selected_file"

# install cdxgen
echo -e "${COLOR}--- INSTALLING CDXGEN... ---${NC}"  
npm install -g @cyclonedx/cdxgen@8.6.0
echo -e "${COLOR}--- Successful: INSTALLED CDXGEN ---${NC}"

# install grype
echo -e "${COLOR}--- INSTALLING GRYPE... ---${NC}"
wget https://raw.githubusercontent.com/anchore/grype/main/install.sh
chmod +x install.sh.1
./install.sh.1
echo -e "${COLOR}--- Successful: INSTALLED GRYPE ---${NC}"

# running cdxgen selected file
echo -e "${COLOR} Creating an SBOM for your file. This may take a while... ${NC}"
cdxgen -r -o $selected_file.1.json
echo -e "${COLOR} Finished running grype on $selected_file ${NC}"

# pipe sbom created by cdxgen into grype
./bin/grype sbom:$selected_file.1.json -o cyclonedx-json > $selected_file.2.json
if [ -f $selected_file.1.xml ]; then
    rm $selected_file.1.xml
fi

# combine cdxgen and grype outputs into one file 
sudo apt-get install jq ./
jq -s 'add' $selected_file.1.json $selected_file.2.json > $selected_file.FINAL.json

# finished
echo -e "${COLOR}You have now created $selected_file.json, which is your SBOM to upload. Your vulnerabilities are stored in the grype database and can be seen with <grype db status>${NC}"        





# # !/bin/bash
# chmod +x linux_install.sh
# COLOR='\033[0;32m'
# NC='\033[0m'
# # RUN WITH: bash linux_install "/absolute/path/use/command/pwd"

# selected_file="$1"
# echo -e "${COLOR} Absolute path of selected file: ${NC} $selected_file"

# # pulls script to install syft into a new file called install.sh and runs it
# # wget https://raw.githubusercontent.com/anchore/syft/main/install.sh
# # chmod +x install.sh
# # ./install.sh
# echo -e "${COLOR}--- Successful: INSTALLED CDXGEN ---${NC}"

# # pulls script to install grype into a new file called install.sh.1 and runs it
# echo -e "${COLOR}--- INSTALLING GRYPE... ---${NC}"
# wget https://raw.githubusercontent.com/anchore/grype/main/install.sh
# chmod +x install.sh.1
# ./install.sh.1
# echo -e "${COLOR}--- Successful: INSTALLED GRYPE ---${NC}"

# echo -e "${COLOR} Creating an SBOM for your file... ${NC}"
# ./bin/syft $selected_file -o json=$selected_file.json

# echo -e "${COLOR} Finished creating $selected_file.json ${NC}"
# echo -e "${COLOR}You have now created $selected_file.json, which is your SBOM to upload. Your vulnerabilities are stored in the grype database and can be seen with <grype db status>${NC}"        
