Version 0.9 -------------- 7/19/23 -----------------

-- API ROUTES --
Here is a comprehensive list of our API routes and what they can be used for:


        SBOMs - Everything about sboms
        2. GET          /sboms/{sbomId}
        Finds sbom by id.gi
        3. GET          /sboms
        Finds all sboms.
        4. GET          /sboms/{sbomId}/vulnerabilities
        Finds all vulnerabilities of sbom with id of {sbomId}.
        5. GET          /sboms/{sbomId}/metadata
        Finds the metadata of sbom with id of {sbomId}.
        6. GET          /sboms/{sbomId}/sbomComponents
        Finds all components of sbom with id of {sbomId}.
        7. POST         /users/{userId}/sboms
        Add a new sbom to a user's sbom list.
        8. PUT          /sboms/{sbomId}
        Edit a sbom's name and description.

        SBOM COMPONENTS - Everything about sbom components
        9. GET         /sbom_components/{sbom_componentId}/licenses
        Finds the licenses of an sbom component.
        10. GET         /sbom_components/{sbom_componentId}
        Finds a specific sbom component.
        
        METADATA - Everything about metadata
        11. GET         /metadata/{metadatumId}/tools
        Finds the tools used to create the sbom.
        12. GET         /metadata/{metadatumId}/components
        Finds the component of the metadata.
        13. GET         /metadata/{metadatumId}
        Finds a specific metadatum.
        
        VULNERABILITIES - Everything about vulnerabilities
        14. GET          /vulnerabilities
        Finds all vulnerabilities.
        15. GET         /vulnerabilities/{vulnerabilityId}/ratings
        Finds the rating of a specific vulnerability.
        16. GET         /vulnerabilities/{vulnerabilityId}
        Finds a specific vulnerability.
        17. GET         /ratings/{ratingId}/sources
        Finds the source of a specific rating.

        DEPENDENCIES - Everything about dependencies
        18. GET         /sboms/{sbomId}/dependencies
        Finds all dependencies of specific sbom.
        19. GET         /dependencies/{dependencyId}/tree
        Finds all direct children of specific dependency.
        20. GET         /sboms/{sbomId}/dependencies_tree
        Finds a dependency tree for a specific SBOM.

        USERS - Everything about users
        21. GET         /users
        Finds all users.
        22. POST        /users
        Creates a new user.
        23. GET         /users/{userId}
        Finds a specific user.
        1. GET          /users/{userId}/sboms
        Finds all sboms associated with a user with id of {userId}.

        SCRIPTS - All about sbom creation scripts
        24. GET         /scripts/linux
        Finds a Linux script for downloading and creating an SBOM
        25. GET         /scripts/windows
        Finds a Windows script for downloading and creating an sbom.

        AUTHORIZATION - About user authorization
        26. POST        /sessions
        Creates a new session for the current user.
