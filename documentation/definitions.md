DEFFINITIONS

SBOM(Software Bill of Management): a document that contains all parts used in a software program and documents where those parts came from and the parts those parts rely on and so on and so forth.

SBOM Format: The method in which the information in the SBOM is laid out. We use a CycloneDX format, which is more focused on tracking the dependencies within our project.

Dependencies: A software often calls upon code wri
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