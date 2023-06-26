
Version 2. 6/26/2023 ------------------------------------------------------------------

-- BACKGROUND --
Welcome to the Centralized Hub for Inventories Platform (CHIP), a web-based application
for the creation, visualization, and use of Software Bills of Materials (SBOMs)!

For reference, a SBOM is a formal record of all software packages and components used by
a software project or machine. These components can be commercial or open-source, and in
turn rely on other components themselves. This creates a series of reliances, or a chain
of dependencies, that is not easily visible to the creator or user of the main project.
An SBOM helps to solve this issue by finding all the dependencies of a project and
listing them out (in our case) as a JSON file.

Due to the heirarchical nature of SBOMs, most SBOM JSON files are at or over hundreds
of thousands of lines of text, which make them impossible to parse manually.

Therefore, our application was created with the goal of displaying an SBOM in an easily
understandable manner. CHIP is a dockerized application designed to take in a CycloneDX
formatted JSON file that has been created with Syft, an open-source SBOM generator.


-- HOW TO USE -- 
The intended use of our website will be as so: first, the user will need to log in with 
their Duke ID through Shibboleth SSO. Then, the user will be brought to our home page, 
which details what an SBOM is, what our website does, and how to create an SBOM of their
own using Syft. On the left will be a navigation bar containing the options to go to 
'View SBOMs', 'Generate SBOMs', 'Profile', and 'Logout' pages. 


-- HOW TO MAKE AN SBOM -- 
If you do not already have a CycloneDX formatted JSON file to upload as your SBOM, here 
are the instructions on how to make one. These can also be found on our 'Generate SBOMs'
page after logging in.

1. Download Docker Desktop. If you already have Docker Desktop, open the application.  
2. In your terminal, go to the file of the file your wish to create an SBOM for and git 
clone our git repository using the command <git clone --------------->. 
3. After successfully cloning the repository, a command of <ls> should display your 
own file you wish to Syft along with a new file called 'docker-compose.yml' (and possibly
other new files too). 
4. Run the command <docker-compose up>. A series of downloads should follow, which will 
automatically generate your SBOM for you. To check that the process was done correctly,
use another <ls>. A new file called <filename>.cdx.json should have been created. 
5. This new file is the SBOM you will upload to our website. Navigate to our website's 
'View SBOMs' page and upload the SBOM where prompted. 

