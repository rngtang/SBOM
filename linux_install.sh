#!/bin/bash

echo "Hello world"

chmod +x linux_install.sh

# curl -sSfL https://raw.githubusercontent.com/anchore/syft/main/install.sh 
wget https://raw.githubusercontent.com/anchore/syft/main/install.sh

echo "installed??"

chmod +x install.sh
./install.sh

cd bin 

sudo mv ./syft /usr/local/bin
syft -h 

echo "DONE"