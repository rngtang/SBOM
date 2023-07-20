Version 0.9 -------------- 7/19/23 -----------------

-- API ROUTES --
Here is a comprehensive list of our API routes and what they can be used for:


        SBOMs - Everything about sboms
        2. GET          /sboms/{sbomId}
        Finds sbom by id.
                Responses:
                200 -   successful operation
                        returns a json file
                        {
                                "id": 0,
                                "bomFormat": "string",
                                "specVersion": "string",
                                "serialNumber": "string",
                                "version": int,
                                "name": "string",
                                "description": "string",
                                "archive": boolean,
                                "user_id": 0,
                                "created_at": "2023-07-19T18:29:45.992Z",
                                "updated_at": "2023-07-19T19:37:42.519Z",
                                "metadata": [
                                        {
                                                "id": 0,
                                                "timestamp": "2023-07-06T10:48:36-04:00",
                                                "sbom_id": 1,
                                                "created_at": "2023-07-19T18:29:46.288Z",
                                                "updated_at": "2023-07-19T18:29:46.288Z",
                                                "tools": [
                                                        {
                                                                "id": 0,
                                                                "vendor": "string",
                                                                "name": "string",
                                                                "version": "string",
                                                                "metadatum_id": 0,
                                                                "created_at": "2023-07-19T18:29:46.315Z",
                                                                "updated_at": "2023-07-19T18:29:46.315Z"
                                                        }
                                                ]
                                        }
                                ],
                                "vulnerabilities": [
                                        {
                                                "id": 0,
                                                "bom_ref": "string",
                                                "vulnID": "string",
                                                "description": "string",
                                                "recommendation": "string (link)",
                                                "affected": [
                                                        "string"
                                                ],
                                                "sbom_id": 0,
                                                "created_at": "2023-07-19T18:29:46.348Z",
                                                "updated_at": "2023-07-19T18:29:46.348Z",
                                                "ratings": [
                                                        {
                                                                "id": 0,
                                                                "score": "string,
                                                                "severity": "string",
                                                                "vulnerability_id": 0,
                                                                "created_at": "2023-07-19T18:29:46.384Z",
                                                                "updated_at": "2023-07-19T18:29:46.384Z"
                                                        }
                                                ],
                                                "sources": [
                                                        {
                                                                "id": 0,
                                                                "name": "string",
                                                                "url": "string",
                                                                "vulnerability_id": 0,
                                                                "created_at": "2023-07-19T18:29:46.419Z",
                                                                "updated_at": "2023-07-19T18:29:46.419Z"
                                                        }
                                                ]
                                        }
                                ],
                                "sbom_components": [
                                        {
                                                "id": 0,
                                                "bom_ref": "string",
                                                "group": "string",
                                                "name": "string",
                                                "version": "string",
                                                "purl": "string",
                                                "sbom_id": 0,
                                                "created_at": "2023-07-19T18:29:46.041Z",
                                                "updated_at": "2023-07-19T18:29:46.041Z",
                                                "properties": [
                                                        {
                                                                "id": 0,
                                                                "name": "string",
                                                                "value": "string",
                                                                "sbom_component_id": 0,
                                                                "created_at": "2023-07-19T18:29:46.072Z",
                                                                "updated_at": "2023-07-19T18:29:46.072Z"
                                                        }
                                                ]
                                        }
                                ],
                                "dependencies": [
                                        {
                                                "id": 0,
                                                "ref": "string",
                                                "dependsOn": [
                                                        "string"
                                                ],
                                                "sbom_id": 0,
                                                "created_at": "2023-07-19T18:29:46.228Z",
                                                "updated_at": "2023-07-19T18:29:46.228Z"
                                        }
                                ]
                        }
                404 -   invalid {sbomId}
        3. GET          /sboms
        Finds all sboms.
                200 -   returns json with list of all sboms
        4. GET          /sboms/{sbomId}/vulnerabilities
        Finds all vulnerabilities of sbom with id of {sbomId}.
                200 -   returns json
                        "vulnerabilities": [
                                        {
                                                "id": 0,
                                                "bom_ref": "string",
                                                "vulnID": "string",
                                                "description": "string",
                                                "recommendation": "string (link)",
                                                "affected": [
                                                        "string"
                                                ],
                                                "sbom_id": 0,
                                                "created_at": "2023-07-19T18:29:46.348Z",
                                                "updated_at": "2023-07-19T18:29:46.348Z",
                                                "ratings": [
                                                        {
                                                                "id": 0,
                                                                "score": "string,
                                                                "severity": "string",
                                                                "vulnerability_id": 0,
                                                                "created_at": "2023-07-19T18:29:46.384Z",
                                                                "updated_at": "2023-07-19T18:29:46.384Z"
                                                        }
                                                ],
                                                "sources": [
                                                        {
                                                                "id": 0,
                                                                "name": "string",
                                                                "url": "string",
                                                                "vulnerability_id": 0,
                                                                "created_at": "2023-07-19T18:29:46.419Z",
                                                                "updated_at": "2023-07-19T18:29:46.419Z"
                                                        }
                                                ]
                                        }
                                ]
                        404 -   invalid {sbomId}
        5. GET          /sboms/{sbomId}/metadata
        Finds the metadata of sbom with id of {sbomId}.
                200 -   returns json
                        "metadata": [
                                        {
                                                "id": 0,
                                                "timestamp": "2023-07-06T10:48:36-04:00",
                                                "sbom_id": 1,
                                                "created_at": "2023-07-19T18:29:46.288Z",
                                                "updated_at": "2023-07-19T18:29:46.288Z",
                                                "tools": [
                                                        {
                                                                "id": 0,
                                                                "vendor": "string",
                                                                "name": "string",
                                                                "version": "string",
                                                                "metadatum_id": 0,
                                                                "created_at": "2023-07-19T18:29:46.315Z",
                                                                "updated_at": "2023-07-19T18:29:46.315Z"
                                                        }
                                                ]
                                        }
                                ]
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
