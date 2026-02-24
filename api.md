# Beta

## Namespaces

Types:

- <code><a href="./src/resources/beta/namespaces/namespaces.ts">NamespaceListResponse</a></code>

Methods:

- <code title="get /v1beta/namespaces">client.beta.namespaces.<a href="./src/resources/beta/namespaces/namespaces.ts">list</a>() -> NamespaceListResponse</code>

### Documents

Types:

- <code><a href="./src/resources/beta/namespaces/documents.ts">Document</a></code>
- <code><a href="./src/resources/beta/namespaces/documents.ts">DocumentListResponse</a></code>
- <code><a href="./src/resources/beta/namespaces/documents.ts">DocumentDeleteResponse</a></code>
- <code><a href="./src/resources/beta/namespaces/documents.ts">DocumentUpsertResponse</a></code>

Methods:

- <code title="get /v1beta/namespaces/{namespace}/documents">client.beta.namespaces.documents.<a href="./src/resources/beta/namespaces/documents.ts">list</a>(namespace) -> DocumentListResponse</code>
- <code title="delete /v1beta/namespaces/{namespace}/documents">client.beta.namespaces.documents.<a href="./src/resources/beta/namespaces/documents.ts">delete</a>(namespace, { ...params }) -> DocumentDeleteResponse</code>
- <code title="post /v1beta/namespaces/{namespace}/documents">client.beta.namespaces.documents.<a href="./src/resources/beta/namespaces/documents.ts">upsert</a>(namespace, { ...params }) -> DocumentUpsertResponse</code>

# Namespaces

Types:

- <code><a href="./src/resources/namespaces.ts">Filter</a></code>
- <code><a href="./src/resources/namespaces.ts">NamespaceSearchResponse</a></code>

Methods:

- <code title="post /v1/namespaces/{namespace}/search">client.namespaces.<a href="./src/resources/namespaces.ts">search</a>(namespace, { ...params }) -> NamespaceSearchResponse</code>
