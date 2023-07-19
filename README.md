
Version 1. 6/20/2023 ------------------------------------------------------------------

-- BACKGROUND --
Welcome to the Centralized Hub for Inventories Platform (CHIP), a web-based application
for the creation, visualization, and use of Software Bills of Materials (SBOMs).

For reference, a SBOM is a formal record of all software packages and components used by
a software project or machine. These components can be commercial or open-source, and in
turn rely on other components themselves. This creates a series of reliances, or a chain
of sbomComponents, that is not easily visible to the creator or user of the main project.
An SBOM helps to solve this issue by finding all the sbomComponents of a project and
listing them out (in our case) as a JSON file.

Due to the heirarchical nature of SBOMs, most SBOM JSON files are at or over tens of
thousands of lines of text, which make them impossible to parse manually.

Therefore, our application was created with the goal of displaying an SBOM in an easily
understandable manner. CHIP is a dockerized application designed to take in a CycloneDX
formatted JSON file that has been created with Syft, an open-source SBOM generator.


-- HOW TO USE --
To use our application, you will need the following:

        1. Docker Desktop.
        2. A SBOM JSON file in the CycloneDX format. You can either upload your own if
        it already exists, or you can create one using Syft (full instructions below).

-- API ROUTES --
Here is a comprehensive list of our API routes and what they can be used for:

        1. GET     /users/{userId}/sboms
        Finds all sboms associated with a user with id of {userId}.
        2. GET     /sboms/{sbomId}
        Finds sbom by id.
        3. GET     /sboms
        Finds all sboms.
        4. GET     /vulnerabilities
        Finds all vulnerabilities.
        5. GET     /sboms/{sbomId}/vulnerabilities
        Finds all vulnerabilities of sbom with id of {sbomId}.
        6. GET /sboms/{sbomId}/metadata
        Finds the metadata of sbom with id of {sbomId}.
        7. GET /sboms/{sbomId}/sbomComponents
        Finds all components of sbom with id of {sbomId}
        8. POST /users/{userId}/sboms
        Add a new sbom to a user's sbom list
        9. PUT /sboms/{sbomId}
        Edit a sbom's name and description
        10. GET /sbom_components/{sbom_componentId}/licenses
        Finds the licenses of an sbom component.
        11. GET /sbom_components/{sbom_componentId}
        Finds a specific sbom component.
        12. GET /metadata/{metadatumId}/tools
        Finds the tools used to create the sbom
        13. GET /metadata/{metadatumId}/components
        Finds the component of the metadata
        14. GET /sboms/{sbomId}/metadata
        Finds the metadata of a specific sbom.
        15. GET /metadata/{metadatumId}
        Finds a specific metadatum
        16. GET /

