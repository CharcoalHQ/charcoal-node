# Namespaces

Types:

- <code><a href="./src/resources/namespaces/namespaces.ts">Namespace</a></code>
- <code><a href="./src/resources/namespaces/namespaces.ts">NamespaceAttributeConfig</a></code>

## Documents

Types:

- <code><a href="./src/resources/namespaces/documents.ts">DeleteDocumentsResponse</a></code>
- <code><a href="./src/resources/namespaces/documents.ts">Document</a></code>
- <code><a href="./src/resources/namespaces/documents.ts">UpsertDocumentsResponse</a></code>

## Search

Types:

- <code><a href="./src/resources/namespaces/search/search.ts">SearchResponse</a></code>
- <code><a href="./src/resources/namespaces/search/search.ts">SearchResult</a></code>
- <code><a href="./src/resources/namespaces/search/search.ts">SearchListResponse</a></code>

Methods:

- <code title="post /v1/namespaces/{namespace}/search">client.namespaces.search.<a href="./src/resources/namespaces/search/search.ts">create</a>(namespace, { ...params }) -> SearchResponse</code>
- <code title="get /v1/namespaces">client.namespaces.search.<a href="./src/resources/namespaces/search/search.ts">list</a>() -> SearchListResponse</code>

### Documents

Types:

- <code><a href="./src/resources/namespaces/search/documents.ts">DocumentListResponse</a></code>

Methods:

- <code title="get /v1/namespaces/{namespace}/documents">client.namespaces.search.documents.<a href="./src/resources/namespaces/search/documents.ts">list</a>(namespace) -> DocumentListResponse</code>
- <code title="delete /v1/namespaces/{namespace}/documents">client.namespaces.search.documents.<a href="./src/resources/namespaces/search/documents.ts">delete</a>(namespace, { ...params }) -> DeleteDocumentsResponse</code>
- <code title="post /v1/namespaces/{namespace}/documents">client.namespaces.search.documents.<a href="./src/resources/namespaces/search/documents.ts">upsert</a>(namespace, { ...params }) -> UpsertDocumentsResponse</code>
