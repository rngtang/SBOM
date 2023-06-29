class ScriptsController < ApplicationController
    protect_from_forgery with: :null_session

    def windows 
        script_windows = <<-SCRIPT
        Write-Host "Hello World" -ForegroundColor Green

        Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
        # choco 
        choco install syft -y --force

        Write-Host "Which file would you like to create an SBOM for?" -ForegroundColor Green
        $selectedFile= Read-Host 
        Write-Host "Creating $selectedFile.json ..." -ForegroundColor Green

        syft $selectedFile -o json=$selectedFile.json

        Write-Host "You have now created $selectedFile.sbom.json, which is your SBOM to upload." -ForegroundColor Green

        Read-Host -Prompt "Press Enter to exit script and terminal" 

        Exit
        SCRIPT
        
        send_data script_windows, filename: 'windows_install.ps1', type: 'application/x-powershell'
    end 

    def linux
        script_linux = <<-SCRIPT
        # !/bin/bash

        # chmod +x linux_install.sh 
        COLOR='\033[0;32m'
        NC='\033[0m' 
        
        # RUN WITH: bash linux_install "/absolute/path/use/command/pwd"
        selected_file="$1" 
        echo -e "${COLOR} Absolute path of selected file: ${NC} $selected_file" 
        
        # pulls script to install syft into a new file called install.sh and runs it 
        echo -e "${COLOR}--- INSTALLING SYFT... ---${NC}"  
        wget https://raw.githubusercontent.com/anchore/syft/main/install.sh
        chmod +x install.sh
        ./install.sh
        # sudo mv ./bin/syft /usr/local/bin
        echo -e "${COLOR}--- Successful: INSTALLED SYFT ---${NC}"
        
        
        # pulls script to install grype into a new file called install.sh.1 and runs it 
        echo -e "${COLOR}--- INSTALLING GRYPE... ---${NC}" 
        wget https://raw.githubusercontent.com/anchore/grype/main/install.sh
        chmod +x install.sh.1
        ./install.sh.1
        # sudo mv ./bin/grype /usr/local/bin
        echo -e "${COLOR}--- Successful: INSTALLED GRYPE ---${NC}"
        
        
        echo -e "${COLOR} Creating an SBOM for your file... ${NC}"
        ./bin/syft $selected_file -o json=$selected_file.json 
        echo -e "${COLOR} Finished creating $selected_file.json ${NC}"
        
        ./bin/grype sbom:$selected_file.json 
        
        echo -e "${COLOR}You have now created $selected_file.json, which is your SBOM to upload. Your vulnerabilities are stored in the grype database and can be seen with <grype db status>${NC}"        
        
        SCRIPT

        send_data script_linux, filename: 'install_linux.sh', type: 'text/x-sh'
    end 
  end
  