#!/bin/bash

echo "Hello!" 

chmod +x linux_install.sh

# curl -sSfL https://raw.githubusercontent.com/anchore/syft/main/install.sh 
wget https://raw.githubusercontent.com/anchore/syft/main/install.sh

chmod +x install.sh
./install.sh

sudo mv ./bin/syft /usr/local/bin
syft -h 

echo "INSTALLED SYFT"


echo "Hello! Which file would you like to create an SBOM for?"
read NAME
echo "Creating $NAME.cdx.json ..."

syft $NAME -o cyclonedx-json=$NAME.cdx.json

echo "You have now created $NAME.cdx.json
