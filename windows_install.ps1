param (
    [Parameter(Mandatory=$false)]
    [string]$selectedFile = (Get-Item $PSScriptRoot).BaseName
)

Write-Host "Installing cdxgen. This may take a while." -ForegroundColor Green
npm install -g @cyclonedx/cdxgen@8.6.0

Write-Host "Creating $selectedFile.json..." -ForegroundColor Green 
cdxgen -r -o "${selectedFile}.json"

# Remove .xml file if it exists
$xmlFile = "${selectedFile}.1.xml"
if (Test-Path $xmlFile -PathType Leaf) {
    Remove-Item $xmlFile
}

Write-Host "You have now created $selectedFile.json, which is your SBOM to upload." -ForegroundColor Green

Read-Host -Prompt "Press Enter to exit script and terminal" 

Exit