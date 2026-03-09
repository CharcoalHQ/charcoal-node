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
   * Lists all documents in a namespace.
   */
  list(namespace: string, options?: RequestOptions): APIPromise<DocumentListResponse> {
    return this._client.get(path`/v1/namespaces/${namespace}/documents`, options);
  }

  /**
   * Deletes documents from a namespace.
   */
  delete(
    namespace: string,
    body: DocumentDeleteParams,
    options?: RequestOptions,
  ): APIPromise<DocumentsAPI.DeleteDocumentsResponse> {
    return this._client.delete(path`/v1/namespaces/${namespace}/documents`, { body, ...options });
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

export interface DocumentListResponse {
  results: Array<DocumentsAPI.Document>;
}

export interface DocumentDeleteParams {
  document_ids: Array<string>;
}

export interface DocumentUpsertParams {
  documents: Array<DocumentsAPI.Document>;

  /**
   * Optional explicit schema for the documents. If omitted, schema is inferred.
   */
  schema?: { [key: string]: NamespacesAPI.NamespaceAttributeConfig };
}

export declare namespace Documents {
  export {
    type DocumentListResponse as DocumentListResponse,
    type DocumentDeleteParams as DocumentDeleteParams,
    type DocumentUpsertParams as DocumentUpsertParams,
  };
}
