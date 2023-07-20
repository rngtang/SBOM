Write-Host "Hello World" -ForegroundColor Green
# .\OneDrive - Duke University\Documents\Code+

# Start-Process PowerShell -Verb runAs

# deno
Write-Host "Installing deno" -ForegroundColor Green
irm https://deno.land/install.ps1 | iex

Write-Host "Installing cdxgen. This may take a while." -ForegroundColor Green
deno install --allow-read --allow-env --allow-run --allow-sys --allow-write --allow-net -n cdxgen "npm:@cyclonedx/cdxgen" -f

Write-Host "What is the name of the file would you like to create an SBOM for? This is the same as the name of the directory you are in." -ForegroundColor Green
$selectedFile= Read-Host 

Write-Host "Creating $selectedFile.json ..." -ForegroundColor Green 
cdxgen -r -o $selected_file.json --allow-sys

# Write-Host "You have now created $selectedFile.json, which is your SBOM to upload." -ForegroundColor Green

Read-Host -Prompt "Press Enter to exit script and terminal" 

Exit

