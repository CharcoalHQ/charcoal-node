// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as DocumentsAPI from '../documents';
import * as NamespacesAPI from '../namespaces';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Manage documents within namespaces.
 */
export class Documents extends APIResource {
  /**
   * Retrieves a single document by ID from a namespace.
   */
  retrieve(
    documentID: string,
    params: DocumentRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<DocumentsAPI.Document> {
    const { namespace } = params;
    return this._client.get(path`/v1/namespaces/${namespace}/documents/${documentID}`, options);
  }

  /**
   * Deletes documents from a namespace by their IDs.
   */
  delete(
    namespace: string,
    body: DocumentDeleteParams,
    options?: RequestOptions,
  ): APIPromise<DocumentsAPI.DeleteDocumentsResponse> {
    return this._client.post(path`/v1/namespaces/${namespace}/documents/delete`, { body, ...options });
  }

  /**
   * Upserts documents to a namespace. Creates the namespace if it doesn't exist.
   * Accepts up to 10,000 documents per request with a 256 MB body limit.
   */
  upsert(
    namespace: string,
    body: DocumentUpsertParams,
    options?: RequestOptions,
  ): APIPromise<DocumentsAPI.UpsertDocumentsResponse> {
    return this._client.post(path`/v1/namespaces/${namespace}/documents`, { body, ...options });
  }
}

export interface DocumentRetrieveParams {
  /**
   * Namespace identifier. Alphanumeric characters, hyphens, underscores, and dots.
   * Max 128 characters.
   */
  namespace: string;
}

export interface DocumentDeleteParams {
  document_ids: Array<string>;
}

export interface DocumentUpsertParams {
  documents: Array<DocumentsAPI.Document>;

  /**
   * Explicit schema for the documents. If omitted, schema is inferred from the
   * document structure and merged with any existing namespace schema.
   */
  schema?: { [key: string]: NamespacesAPI.NamespaceAttributeConfig };
}

export declare namespace Documents {
  export {
    type DocumentRetrieveParams as DocumentRetrieveParams,
    type DocumentDeleteParams as DocumentDeleteParams,
    type DocumentUpsertParams as DocumentUpsertParams,
  };
}
