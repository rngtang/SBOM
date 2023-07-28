class ScriptsController < ApplicationController
    protect_from_forgery with: :null_session

    def linux
        script_code = <<-SCRIPT
        # !/bin/bash

        # set ability to execute itself
        chmod +x "$0" 

        # set colors 
        COLOR='\033[0;32m'
        NC='\033[0m'

        # name the sbom the directory (project) name
        selected_file=$(basename "$(pwd)")
        echo -e "${COLOR} Project (directory) name: ${NC} $selected_file"

        # install cdxgen
        echo -e "${COLOR}--- ** Checking CDXGEN installation... ---${NC}"

        if which cdxgen >/dev/null 2>&1; then
            echo -e "${COLOR}--- CDXGEN is already installed. Skipping re-installation... ---${NC}"
        else
            echo -e "${COLOR}--- Cdxgen was not found. INSTALLING CDXGEN... ---${NC}"
            # see if way to install without sudo
            # mkdir -p ./bin
            # npm install --prefix ./bin @cyclonedx/cdxgen@8.6.0
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
        echo -e "${COLOR} Finished running cdxgen on $selected_file. Running grype... ${NC}"

        # run grype on SBOM (piped in from cdxgen)
        ./bin/grype sbom:$selected_file.1.json -o cyclonedx-json > $selected_file.2.json

        # remove the extra .xml file created
        if [ -f $selected_file.1.xml ]; then
            rm $selected_file.1.xml
        fi

        # combine cdxgen and grype outputs into one file using jq, install jq locally. First check if jq is installed. 
        # sudo apt-get install jq ./
        echo -e "${COLOR}--- ** CHECKING JQ INSTALLATION... ---${NC}"

        if [ -x "./jq" ]; then
            echo -e "${COLOR}--- JQ is already installed. Skipping re-installation... ---${NC}"
        else
            echo -e "${COLOR}--- JQ was not found. INSTALLING JQ... ---${NC}"
            wget -O jq https://github.com/stedolan/jq/releases/latest/download/jq-linux64
            chmod +x jq
            echo -e "${COLOR}--- Successful: INSTALLED JQ ---${NC}"
        fi

        jq -s 'add' $selected_file.1.json $selected_file.2.json > $selected_file.LINUX.json

        # remove the extra .1 file created
        if [ -f $selected_file.1.json ]; then
            rm $selected_file.1.json
        fi
        # remove the extra .2 file created
        if [ -f $selected_file.2.json ]; then
            rm $selected_file.2.json
        fi

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

        # Install cdxgen
        echo -e "${COLOR}--- ** Checking CDXGEN installation... ---${NC}"

        if which cdxgen >/dev/null 2>&1; then
            echo -e "${COLOR}--- CDXGEN is already installed. Skipping re-installation... ---${NC}"
        else
            echo -e "${COLOR}--- Cdxgen was not found. INSTALLING CDXGEN... ---${NC}"  
            # see if way to install without sudo
            sudo npm install -g @cyclonedx/cdxgen@8.6.0
            echo -e "${COLOR}--- Successful: INSTALLED CDXGEN ---${NC}"
        fi

        # Install grype
        echo -e "${COLOR}--- ** CHECKING GRYPE INSTALLATION... ---${NC}"

        if [ -x "./bin/grype" ]; then
            echo -e "${COLOR}--- GRYPE is already installed. Skipping re-installation... ---${NC}"
        else
            echo -e "${COLOR}--- Grype was not found. INSTALLING GRYPE... ---${NC}"
            brew install grype
            echo -e "${COLOR}--- Successful: INSTALLED GRYPE ---${NC}"
        fi

        # Generate Software Bill of Materials (SBOM) for the selected file
        echo -e "${COLOR} Creating an SBOM for your file. This may take a while... ${NC}"
        cdxgen -r -o $selected_file.1.json

        # Run Grype to analyze the SBOM
        echo -e "${COLOR} Finished running cdxgen on $selected_file. Running grype... ${NC}"
        grype sbom:$selected_file.1.json -o cyclonedx-json > $selected_file.2.json

        # If an XML file was created in the process, delete it
        if [ -f $selected_file.1.xml ]; then
            rm $selected_file.1.xml
        fi

        # Install jq, a command-line JSON processor
        echo -e "${COLOR}--- ** CHECKING JQ INSTALLATION... ---${NC}"

        if command -v jq >/dev/null 2>&1; then
            echo -e "${COLOR}--- JQ is already installed. Skipping re-installation... ---${NC}"
        else
            echo -e "${COLOR}--- JQ was not found. INSTALLING JQ... ---${NC}"
            brew install jq
            echo -e "${COLOR}--- Successful: INSTALLED JQ ---${NC}"
        fi

        # Combine the JSON files into one
        jq -s 'add' $selected_file.1.json $selected_file.2.json > $selected_file.MAC.json

        # remove the extra .1 file created
        if [ -f $selected_file.1.json ]; then
            rm $selected_file.1.json
        fi
        # remove the extra .2 file created
        if [ -f $selected_file.2.json ]; then
            rm $selected_file.2.json
        fi

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

        # install cdxgen, first check if user already has it. assume they do have node/npm
        Write-Host "--- ** Checking CDXGEN installation... ---" -ForegroundColor Green

        if (Get-Command cdxgen -ErrorAction SilentlyContinue) {
            Write-Host "--- CDXGEN is already installed. Skipping re-installation... ---" -ForegroundColor Green
        }
        else {
            Write-Host "--- INSTALLING CDXGEN... ---" -ForegroundColor Green
            npm install -g @cyclonedx/cdxgen@8.6.0
            Write-Host "--- Successful: INSTALLED CDXGEN ---" -ForegroundColor Green
        }

        # run cdxgen to create sbom
        Write-Host "Creating $selectedFile.WINDOWS.json..." -ForegroundColor Green 
        cdxgen -r -o "${selectedFile}.WINDOWS.json"

        # Remove .xml file if it exists
        $xmlFile = "${selectedFile}.WINDOWS.xml"
        if (Test-Path $xmlFile -PathType Leaf) {
            Remove-Item $xmlFile
        }

        # finish
        Write-Host "You have now created $selectedFile.WINDOWS.json, which is your SBOM to upload. Please note that this file does not include any vulnerabilities." -ForegroundColor Green

        # exit the terminal 
        # Read-Host -Prompt "Press Enter to exit script and terminal" 
        Exit
        
        SCRIPT
        send_data ps_code, filename: 'windows_install.ps1', type: 'text/plain'
    end 

    def docker
        dockerfile_code = <<-DOCKERFILE
        FROM ubuntu:20.04

        # Install dependencies
        RUN apt-get update \\
            && apt-get install -y curl wget npm

        # Create a directory for the project
        WORKDIR /project

        # Copy bash script into the Docker image
        COPY linux_install.sh /project

        # Expose volume for external mounting
        VOLUME ["/project"]
        DOCKERFILE

        send_data dockerfile_code, filename: 'Dockerfile', type: 'text/x-docker'
    end
    
  end
  