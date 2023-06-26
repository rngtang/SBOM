#!/bin/bash
whoami
date

echo "Hello world"

chmod +x install.sh
curl -sSfL https://raw.githubusercontent.com/anchore/syft/main/install.sh | sh -s -- -b 
sudo cp bin/syft /usr/local/bin
syft -h 

echo "DONE"