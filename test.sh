echo "hello world"
selected_file="$1"

# deno
echo "installing deno"
# wget https://deno.land/x/install/install.sh
# chmod +x install.sh
# ./install.sh
sudo apt-get install unzip -y
curl -fsSL https://deno.land/x/install/install.sh | sh
# irm https://deno.land/install.ps1 | iex

deno --version
deno install --allow-read --allow-env --allow-run --allow-sys=uid,systemMemoryInfo --allow-write --allow-net -n cdxgen "npm:@cyclonedx/cdxgen"

# echo "installling cdxgen"
# deno install --allow-read --allow-env --allow-run --allow-sys --allow-write --allow-net -n cdxgen "npm:@cyclonedx/cdxgen" -f

# echo "craating sbom"
# cdxgen -r -o $selected_file.json --allow-sys

# Write-Host "You have now created $selectedFile.json, which is your SBOM to upload." -ForegroundColor Green

echo "REACHED END ???"
# Read-Host -Prompt "Press Enter to exit script and terminal" 

# Exit
