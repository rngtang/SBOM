Version 0.99 -------------- 7/28/23 -----------------

-- API ROUTES --
Here is a comprehensive list of the API routes that are actively used in our application along with what they are used for:


SBOMs - Everything about sboms

        1. GET          /sboms/{sbomId}
        Finds one sbom by sbom id.
                Responses:
                200 -   successful, returns a json file for SBOM
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

        2. GET          /sboms/{sbomId}/vulnerabilities
        Finds all vulnerabilities of sbom with id of {sbomId}. [Used in Vulnerabilities.js]
                Responses:
                200 -   successful, returns json with all vulnerabilities for that sbom
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

        6. GET          /users/{userId}/sbom_names
        Get just the names of a user's uploaded, non-archived, SBOMs. Used to check against having two of the same names.
                Responses: 
                200 -   successful, returns array of just names 
                        [
                                "dummy2"
                        ]
        
        7. GET          /users/{userId}/sbom_top
        Gets every parameter except sbom components, dependencies, and vulnerabilities for all SBOMs of a user. Used for faster accordion loading. [Used in GetSBOMs.js]
                Responses:
                200 -   successful, returns json of just certain parts of all SBOMs
                        [
                                {
                                        "id": 2,
                                        "bomFormat": "CycloneDX",
                                        "specVersion": "1.4",
                                        "serialNumber": "urn:uuid:79e42b7c-882b-4a7e-a94b-ea5d9a89f825",
                                        "version": 1,
                                        "name": "dummy2",
                                        "description": "hello!",
                                        "archive": false,
                                        "metadata": [
                                                {
                                                        "id": 2,
                                                        "timestamp": "2023-07-06T10:48:36-04:00",
                                                        "sbom_id": 2,
                                                        "created_at": "2023-07-31T14:38:41.837Z",
                                                        "updated_at": "2023-07-31T14:38:41.837Z",
                                                        "tools": [
                                                                {
                                                                        "id": 2,
                                                                        "vendor": "anchore",
                                                                        "name": "grype",
                                                                        "version": "0.63.1",
                                                                        "metadatum_id": 2,
                                                                        "created_at": "2023-07-31T14:38:41.848Z",
                                                                        "updated_at": "2023-07-31T14:38:41.848Z"
                                                                }
                                                        ]
                                                }
                                        ],
                                        "vuln_number": 2
                                }
                        ]
        
        8. GET          /sboms/{sbomId}/archive
        Change archive (boolean) parameter of SBOM from false to true so it no longer displays in accordion. [Used in DeleteButton.js]
                Responses: 
                204 -   successful, no content. Boolean changed.

        9. POST         /users/{userId}/sboms
        Add a new sbom to a user's sbom list.
                Input:
                        requires json file submission
                                "sbom": {}
                        permits all other fields

        10. PUT          /sboms/{sbomId}
        Edit a sbom's name and description (user-given fields). [Used in EditButton.js]
                Input:
                        requires json format
                                "sbom":{}
                        permits name and description
                                "sbom":{
                                        "name": "string",
                                        "description": "string
                                }
        
VULNERABILITIES - Everything about vulnerabilities

        1. GET          /vulnerabilities
        Finds all vulnerabilities of a user.
                Responses:
                200 -   successful, returns json
                        [
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

        2. GET         /vulnerabilities/{vulnerabilityId}
        Finds all the information of a specific vulnerability.
                Responses:
                200 -   returns json
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
                404 -   invalid {vulnerabilityId}

        3. GET         /vulnerabilities/{vulnerabilityId}/ratings
        Finds the rating of a specific vulnerability.
                200 -   successful, returns json
                        "ratings": [
                                        {
                                                "id": 0,
                                                "score": "string,
                                                "severity": "string",
                                                "vulnerability_id": 0,
                                                "created_at": "2023-07-19T18:29:46.384Z",
                                                "updated_at": "2023-07-19T18:29:46.384Z"
                                        }
                                ]
                404 -   invalid {vulnerabilityId}

        4. GET         /vulnerabilities/{vulnerabilityId}/sources
        Finds the sources of a specific vulnerability.
                Responses: 
                200 -   successful, returns json
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
                404 -   invalid {vulnerabilityId}

DEPENDENCIES - Everything about dependencies

        1. GET         /sboms/{sbomId}/dependencies
        Finds all dependencies of specific sbom.

        2. GET         /dependencies/{dependencyId}/tree
        Finds all direct children of specific dependency.

        3. GET         /sboms/{sbomId}/dependencies_tree
        Finds a dependency tree for a specific SBOM.

USERS - Everything about users

        1. GET         /users
        Finds all users.

        2. POST        /users
        Creates a new user.

        3. GET         /users/{userId}
        Finds a specific user.

        4. GET          /users/{userId}/sboms
        Finds all sboms associated with a user with id of {userId}.

SCRIPTS - All about sbom creation scripts

        1. GET         /scripts/linux
        Finds and downloads a Linux script for downloading and creating an SBOM.

        2. GET         /scripts/windows
        Finds and downloads a Windows script for downloading and creating an SBOM.

        3. GET         /scripts/mac
        Finds and downloads a Mac script for downloading and creating an SBOM.

AUTHORIZATION - All about user authentication 

        1. POST         /saml/consume
        Creates a new session (cookies) for the current user.
        
        2. GET          /current_user 
        Declares current user to be the user who's user id corresponds with the session id. [Used in App.js]
                Responses:

        3. GET             /destroy
        Deletes the session (cookie) for current user when they log out. [Used in MySideNav.js]
