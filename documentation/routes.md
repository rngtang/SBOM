Version 0.999 -------------- 7/31/23 -----------------

-- API ROUTES --
Here is a comprehensive list of the API routes that are either actively used in our application or useful for understanding our application. Each route describes what it is used for and which file(s) it is used in:


SBOMs - Everything about sboms

        1. GET          /sboms/{sbomID}
        ** IMPLICIT ROUTE
                Responses:
                200 -   successful, returns a json file for sbom.
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
                404 -   invalid {sbomID}.

        2. GET          /users/{userID}/sboms
        ** IMPLICIT ROUTE - Finds all sboms of user as specified by {userID}, both archived and non-archived sboms.
                Responses:
                200 -   successful, returns json with list of all sboms.
        
        3. GET          /sboms/{sbomID}/metadata
        ** IMPLICIT ROUTE - Finds the metadata of sbom with id of {sbomID}.
                Responses: 
                200 -   successful, returns json of metadata.
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

        4. GET          /sboms/{sbomID}/sbom_components
        ** IMPLICIT ROUTE - Finds all sbom components of sbom with id of {sbomID}.
                Responses:
                200 -   successful, returns json of sbom components for just that one sbom.
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
                                ]

        5. GET         /sboms/{sbomID}/dependencies
        ** IMPLICIT ROUTE - Finds all dependencies of one specific sbom.
                Responses: 
                200 -   successful, returns json with all dependencies for that sbom.
                        "dependencies": [
                                        {
                                                "id": 1,
                                                "ref": "2",
                                                "dependsOn": [
                                                        "3",
                                                        "4"
                                                ],
                                                "sbom_id": 1,
                                                "sbom_component_id": null,
                                                "created_at": "2023-07-31T14:27:23.830Z",
                                                "updated_at": "2023-07-31T14:27:23.830Z"
                                        },
                                        {
                                                "id": 2,
                                                "ref": "3",
                                                "dependsOn": [
                                                        "4"
                                                ],
                                                "sbom_id": 1,
                                                "sbom_component_id": null,
                                                "created_at": "2023-07-31T14:27:23.842Z",
                                                "updated_at": "2023-07-31T14:27:23.842Z"
                                        },
                                        {
                                                "id": 3,
                                                "ref": "4",
                                                "dependsOn": [],
                                                "sbom_id": 1,
                                                "sbom_component_id": null,
                                                "created_at": "2023-07-31T14:27:23.857Z",
                                                "updated_at": "2023-07-31T14:27:23.857Z"
                                        }
                                ]

        6. GET          /sboms/{sbomID}/vulnerabilities
        Finds all vulnerabilities of sbom with id of {sbomID}. [Used in Vulnerabilities.js]
                Responses:
                200 -   successful, returns json with all vulnerabilities for that sbom.
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
                404 -   invalid {sbomID}

        7. GET          /users/{userID}/sbom_names
        Get just the names of a user's uploaded, non-archived, sboms. Used to check against having two of the same names. [Used in ViewSBOMs.js]
                Responses: 
                200 -   successful, returns array of just names. 
                        [
                                "dummy2"
                        ]
        
        8. GET          /users/{userID}/sbom_top
        Gets every parameter except sbom_components, dependencies, and vulnerabilities for all sboms of a user. Used for faster accordion loading. [Used in GetSBOMs.js]
                Responses:
                200 -   successful, returns json of just certain parts of all sboms.
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
        
        9. GET          /sboms/{sbomID}/archive
        Change archive (boolean) parameter of sbom from false to true so it no longer displays in accordion. [Used in DeleteButton.js]
                Responses: 
                204 -   successful, no content. Boolean changed.

        10. POST         /users/{userID}/sboms
        Add a new sbom to a user's sbom list. [Used in ViewSBOMs.js, UpdateButton.js]
                Input:
                        requires json file submission
                                "sbom": {}
                        permits all other fields

        11. PUT          /sboms/{sbomID}
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
        ** IMPLICIT ROUTE - Finds all vulnerabilities of a user. Vulnerabilities do not have to be not tied to {sbomID}.
                Responses:
                200 -   successful, returns json of all vulnerabilities.
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

DEPENDENCIES - Everything about the dependency tree visualization

        1. GET         /sboms/{sbomID}/dependencies_tree
        Finds a dependency tree that is built for a specific sbom. [Used in SbomTree.js]
                Responses: 
                200 -   successful, returns json.
                        {
                                "name": "2",
                                "children": [
                                        {
                                                "name": "3",
                                                "children": [
                                                        {
                                                                "name": "4",
                                                                "children": []
                                                        }
                                                ]
                                        },
                                        {
                                                "name": "4",
                                                "children": []
                                        }
                                ]
                        }

SCRIPTS - All about sbom creation scripts

        1. GET         /scripts/linux
        Finds the Linux script to download and use for creating an SBOM. [Used in DownloadLinuxScript.js]
                Responses: 
                200 -   successful, returns bash script.

        2. GET         /scripts/windows
        Finds the Windows script to download and use for creating an SBOM. [Used in DownloadWindowsScript.js]
                Responses: 
                200 -   successful, returns powershell script.

        3. GET         /scripts/mac
        Finds the MacOS script to download and use for creating an SBOM. [Used in DownloadMacScript.js]
                Responses:
                200 -   successful, returns mac script.

        4. GET          /scripts/docker
        Finds the Dockerfile to download and use for creating an SBOM. [Used in DownloadDockerfile.js]
                Responses:
                200 -   successful, returns Dockerfile. 

AUTHORIZATION - All about user authentication 

        1. POST         /saml/consume
        Creates a new session (cookies) for the current user. [Used upon log in]
        
        2. GET          /current_user 
        Declares user for rest of the session as the one who's id corresponds with the session id. [Used in App.js]

        3. GET             /destroy
        Deletes the session (cookie) for current user when they log out. [Used in MySideNav.js]
