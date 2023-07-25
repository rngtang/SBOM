class ScriptsController < ApplicationController
    protect_from_forgery with: :null_session

    def linux
        script_code = <<-SCRIPT
        # !/bin/bash

        # set ability to execute itself
        chmod +x "$0" 
        COLOR='\033[0;32m'
        NC='\033[0m'
        
        selected_file=$(basename "$(pwd)")
        echo -e "${COLOR} Project (directory) name: ${NC} $selected_file"
        
        # install cdxgen
        echo -e "${COLOR}--- INSTALLING CDXGEN... ---${NC}"  
        sudo npm install -g @cyclonedx/cdxgen@8.6.0
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
        jq -s 'add' $selected_file.1.json $selected_file.2.json > $selected_file.LINUX.json
        
        # finished
        echo -e "${COLOR}You have now created $selected_file.LINUX.json, which is your SBOM to upload. Your vulnerabilities are stored in the grype database and can be seen with <grype db status>${NC}"        
                
        SCRIPT
        send_data script_code, filename: 'install_linux.sh', type: 'text/x-sh'
    end 

    def mac
        mac_code = <<-SCRIPT
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
        jq -s 'add' $selected_file.1.json $selected_file.2.json > $selected_file.MAC.json

        # Output the results
        echo -e "${COLOR}You have now created $selected_file.MAC.json, which is your SBOM to upload. Your vulnerabilities are stored in the grype database and can be seen with <grype db status>${NC}" 

        SCRIPT
        send_data mac_code, filename: 'mac_install.sh', type: 'text/x-sh'
    end

    def windows
        ps_code = <<-SCRIPT
        # automatically uses name of directory (Project name) as the name of SBOM
        param (
            [Parameter(Mandatory=$false)]
            [string]$selectedFile = (Get-Item $PSScriptRoot).BaseName
        )
        
        # install cdxgen. assume they have node/npm
        Write-Host "Installing cdxgen. This may take a while." -ForegroundColor Green
        npm install -g @cyclonedx/cdxgen@8.6.0
        
        # run cdxgen to create sbom
        Write-Host "Creating $selectedFile.json..." -ForegroundColor Green 
        cdxgen -r -o "${selectedFile}.WINDOWS.json"
        
        # Remove .xml file if it exists
        $xmlFile = "${selectedFile}.xml"
        if (Test-Path $xmlFile -PathType Leaf) {
            Remove-Item $xmlFile
        }
        
        # finish
        Write-Host "You have now created $selectedFile.WINDOWS.json, which is your SBOM to upload." -ForegroundColor Green
        
        # exit the terminal 
        # Read-Host -Prompt "Press Enter to exit script and terminal" 
        Exit
        
        SCRIPT
        send_data ps_code, filename: 'windows_install.ps1', type: 'text/plain'
    end 

    def docker
        docker_code = <<-DOCKERFILE
        FROM node:14
        WORKDIR /app
        COPY . .
        RUN npm install -g @cyclonedx/cdxgen@8.6.0
        RUN wget https://raw.githubusercontent.com/anchore/grype/main/install.sh && chmod +x install.sh && ./install.sh
        CMD ["./install_linux.sh"]
        DOCKERFILE
        send_data docker_code, filename: 'Dockerfile', type: 'text/plain'
    end
    
  end
  