#!/bin/bash
chmod +x linux_install.sh

echo "--- INSTALLING SYFT... ---" 
wget https://raw.githubusercontent.com/anchore/syft/main/install.sh
chmod +x install.sh
./install.sh
sudo mv ./bin/syft /usr/local/bin
echo "--- Successful: INSTALLED SYFT ---"

echo "--- INSTALLING GRYPE... ---" 
wget https://raw.githubusercontent.com/anchore/grype/main/install.sh
chmod +x install.sh.1
./install.sh.1
sudo mv ./bin/grype /usr/local/bin
echo "--- Successful: INSTALLED GRYPE ---"



echo "Which file would you like to create an SBOM for?"
read NAME
echo "Creating $NAME.cdx.json ..."

syft $NAME -o cyclonedx-json=$NAME.sbom.json
grype sbom:$NAME.sbom.json 
# -o cyclonedx-json

echo "You have now created $NAME.sbom.json, which is your SBOM to upload. Your vulnerabilities are stored in the grype database and can be seen with <grype db status>"
