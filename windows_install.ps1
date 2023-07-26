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