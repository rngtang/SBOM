# Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
# Start-Process powershell -Verb RunAs 
# Start-Process PowerShell -Verb runAs -ArgumentList "-file c:\temp\powershell\powershellexamplescript.ps1"

# Code beyond this point will be executed in the elevated PowerShell session

# $selectedFile = $args[0]
# Write-Host "Selected file: $selectedFile"
 
Write-Host "Hello World" -ForegroundColor Green

# using syft to create a SBOM for a file in same directory
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
# choco 
choco install syft -y --force

Write-Host "Which file would you like to create an SBOM for?" -ForegroundColor Green
$NAME= Read-Host 
Write-Host "Creating $NAME.cdx.json ..." -ForegroundColor Green

syft $NAME -o cyclonedx-json=$NAME.sbom.json

Write-Host "You have now created $NAME.sbom.json, which is your SBOM to upload." -ForegroundColor Green

Read-Host -Prompt "Press Enter to exit" 
