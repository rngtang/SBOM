# !/bin/bash

chmod +x "$0" 
echo "hello world"

jq '{ vulnerabilities: .vulnerabilities }' sbom.2.json > new_sbom.json
jq -s 'add' sbom.1.json new_sbom.json > final.SBOM.json