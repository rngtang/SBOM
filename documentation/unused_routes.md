Version 0.999 -------------- 7/31/23 -----------------

-- API ROUTES that are NOT used --
Here are the API routes that are still open but not currently useful for our application, along with what they can be used for:


SBOM COMPONENTS - More specifics for SBOM components

        1. GET          /sbom_components/{sbom_componentId}
        Finds a specific sbom component.
                Responses:
                200 -   successful, returns json with just one sbom_component
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
                404 -   invalid {sbom_componentId}


METADATA - More specifics about metadata

        1. GET         /metadata/{metadatumId}
        Finds a specific metadatum.
                Responses:
                200 -   successful, returns json
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

        2. GET         /metadata/{metadatumId}/tools
        Finds the tools used to create the sbom.
                Responses:
                200 -   successful, returns json with just metadata for all sboms with a user
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
                404 -   invalid {metadatumId}


VULNERABILITIES - Everything about vulnerabilities

        1. GET         /vulnerabilities/{vulnerabilityId}
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

        2. GET         /vulnerabilities/{vulnerabilityId}/ratings
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

        3. GET         /vulnerabilities/{vulnerabilityId}/sources
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

SBOM COMPONENTS - Everything about sbom components

        1. GET          /sbom_components/{sbom_componentID}
        Finds one specific sbom component. A singular sbom component does not have to be tied to {sbomID}.
                Responses: 
                200 -   successful, returns json.

DEPENDENCIES - Everything about dependencies and the dependency tree visualization 

        1. GET         /dependencies/{dependencyID}/tree
        Finds all direct children of specific dependency.
                Responses:
                200 -   successful, returns json.

USERS - Everything about users

        1. GET         /users
        Finds all users.

        2. POST        /users
        Creates a new user.

        3. GET         /users/{userId}
        Finds a specific user.