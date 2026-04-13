# Namespaces

Types:

- <code><a href="./src/resources/namespaces/namespaces.ts">Namespace</a></code>
- <code><a href="./src/resources/namespaces/namespaces.ts">NamespaceListResponse</a></code>

Methods:

- <code title="get /v1/namespaces">client.namespaces.<a href="./src/resources/namespaces/namespaces.ts">list</a>() -> NamespaceListResponse</code>

## Documents

Types:

- <code><a href="./src/resources/namespaces/documents.ts">DeleteDocumentsResponse</a></code>
- <code><a href="./src/resources/namespaces/documents.ts">Document</a></code>
- <code><a href="./src/resources/namespaces/documents.ts">UpsertDocumentsResponse</a></code>

Methods:

- <code title="get /v1/namespaces/{namespace}/documents/{documentId}">client.namespaces.documents.<a href="./src/resources/namespaces/documents.ts">retrieve</a>(documentID, { ...params }) -> Document</code>
- <code title="post /v1/namespaces/{namespace}/documents/delete">client.namespaces.documents.<a href="./src/resources/namespaces/documents.ts">delete</a>(namespace, { ...params }) -> DeleteDocumentsResponse</code>
- <code title="post /v1/namespaces/{namespace}/documents">client.namespaces.documents.<a href="./src/resources/namespaces/documents.ts">upsert</a>(namespace, { ...params }) -> UpsertDocumentsResponse</code>

## Search

Types:

- <code><a href="./src/resources/namespaces/search.ts">SearchResponse</a></code>
- <code><a href="./src/resources/namespaces/search.ts">SearchResult</a></code>

Methods:

- <code title="post /v1/namespaces/{namespace}/search">client.namespaces.search.<a href="./src/resources/namespaces/search.ts">create</a>(namespace, { ...params }) -> SearchResponse</code>
- <code title="post /v1/namespaces/{namespace}/search/{session_id}">client.namespaces.search.<a href="./src/resources/namespaces/search.ts">continue</a>(sessionID, { ...params }) -> SearchResponse</code>

# APIKeys

Types:

- <code><a href="./src/resources/api-keys.ts">APIKeyCreateResponse</a></code>
- <code><a href="./src/resources/api-keys.ts">APIKeyListResponse</a></code>
- <code><a href="./src/resources/api-keys.ts">APIKeyDeleteResponse</a></code>

Methods:

- <code title="post /v1/api_keys">client.apiKeys.<a href="./src/resources/api-keys.ts">create</a>({ ...params }) -> APIKeyCreateResponse</code>
- <code title="get /v1/api_keys">client.apiKeys.<a href="./src/resources/api-keys.ts">list</a>() -> APIKeyListResponse</code>
- <code title="delete /v1/api_keys/{id}">client.apiKeys.<a href="./src/resources/api-keys.ts">delete</a>(id) -> APIKeyDeleteResponse</code>
