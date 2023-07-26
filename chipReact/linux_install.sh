# !/bin/bash

# set ability to execute itself
chmod +x "$0" 
COLOR='\033[0;32m'
NC='\033[0m'

# # check for cdxgen installation
# function is_cdxgen_installed() {
#     if which cdxgen >/dev/null 2>&1; then
#         echo "true"
#     else
#         echo "false"
#     fi
# }

# # check for grype installation in local folder called bin
# function is_grype_installed() {
#     if [ -x "./bin/grype" ]; then
#         echo "true"
#     else
#         echo "false"
#     fi
# }

# name the sbom the directory (project) name
selected_file=$(basename "$(pwd)")
echo -e "${COLOR} Project (directory) name: ${NC} $selected_file"

# install cdxgen
echo -e "${COLOR}--- ** Checking CDXGEN installation... ---${NC}"

if which cdxgen >/dev/null 2>&1; then
    echo -e "${COLOR}--- CDXGEN is already installed. Skipping re-installation... ---${NC}"
else
    echo -e "${COLOR}--- INSTALLING CDXGEN... ---${NC}"
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
echo -e "${COLOR} Finished running grype on $selected_file. Appending vulnerabilities... ${NC}"

# run grype on SBOM (piped in from cdxgen)
./bin/grype sbom:$selected_file.1.json -o cyclonedx-json > $selected_file.2.json

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
