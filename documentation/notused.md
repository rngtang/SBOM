Version 0.999 -------------- 7/31/23 -----------------

-- API ROUTES that are NOT used --
Here are the API routes that are still open but not actively used in our application, along with what they can be used for:


SBOMs - Everything about sboms
        1. GET          /sboms
        Finds all sboms of current user, regardless of if they are archived.
                Responses:
                200 -   successful, returns json with list of all sboms
        
        2. GET          /sboms/{sbomId}/metadata
        Finds the metadata of sbom with id of {sbomId}.
                Responses: 
                200 -   successful, returns json of metadata
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

        3. GET          /sboms/{sbomId}/sbom_components
        Finds all sbom_components of sbom with id of {sbomId}.
                Responses:
                200 -   successful, returns json of sbom_components for just that one SBOM
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

SBOM COMPONENTS - Everything about sbom components

        1. GET          /sbom_components
        Finds all sbom components 

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
        
METADATA - Everything about metadata

        1. GET         /metadata/{metadatumId}/tools
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

        2. GET         /metadata/{metadatumId}
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

    