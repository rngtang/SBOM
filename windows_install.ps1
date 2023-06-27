# Set-ExecutionPolicy -ExecutionPolicy Unrestricted
# Function Check-RunAsAdministrator()
# {
#   #Get current user context
#   $CurrentUser = New-Object Security.Principal.WindowsPrincipal $([Security.Principal.WindowsIdentity]::GetCurrent())
  
#   #Check user is running the script is member of Administrator Group
#   if($CurrentUser.IsInRole([Security.Principal.WindowsBuiltinRole]::Administrator))
#   {
#        Write-host "Script is running with Administrator privileges!"
#   }
#   else
#     {
#        #Create a new Elevated process to Start PowerShell
#        $ElevatedProcess = New-Object System.Diagnostics.ProcessStartInfo "PowerShell";
 
#        # Specify the current script path and name as a parameter
#        $ElevatedProcess.Arguments = "& '" + $script:MyInvocation.MyCommand.Path + "'"
 
#        #Set the Process to elevated
#        $ElevatedProcess.Verb = "runas"
 
#        #Start the new elevated process
#        [System.Diagnostics.Process]::Start($ElevatedProcess)
 
#        #Exit from the current, unelevated, process
#        Exit
 
#     }
# }
 
# #Check Script is running with Elevated Privileges
# Check-RunAsAdministrator


# RUN WITH: powershell.exe -File script.ps1 "path/to/selected/file.txt"

ForegroundColor Green
# $selectedFile = $args[0]
# Write-Host "Selected file: $selectedFile"
 
Write-Host "Hello World" -ForegroundColor Green

# using syft to create a SBOM for a file in same directory
Set-ExecutionPolicy Bypass -Scope Process
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
choco 
choco install syft -y

Write-Host "Which file would you like to create an SBOM for?" -ForegroundColor Green
$NAME= Read-Host 
Write-Host "Creating $NAME.sbom.json ..." -ForegroundColor Green

syft $NAME -o cyclonedx-json=$NAME.sbom.json

Write-Host "You have now created $NAME.sbom.json, which is your SBOM to upload." -ForegroundColor Green

Read-Host -Prompt "Press Enter to exit" -ForegroundColor Green
