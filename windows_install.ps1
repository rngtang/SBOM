# Start-Process PowerShell -Verb runAs -ArgumentList "-NoExit 'C:\Users\87jud\OneDrive - Duke University\Documents\Code+\windows_install.ps1'"

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

