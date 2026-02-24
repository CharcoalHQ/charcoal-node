// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Documents extends APIResource {
  /**
   * Lists all documents in a namespace.
   */
  list(namespace: string, options?: RequestOptions): APIPromise<DocumentListResponse> {
    return this._client.get(path`/v1beta/namespaces/${namespace}/documents`, options);
  }

  /**
   * Deletes documents from a namespace.
   */
  delete(
    namespace: string,
    body: DocumentDeleteParams,
    options?: RequestOptions,
  ): APIPromise<DocumentDeleteResponse> {
    return this._client.delete(path`/v1beta/namespaces/${namespace}/documents`, { body, ...options });
  }

  /**
   * Upserts documents to a namespace. Creates the namespace if it doesn't exist.
   * Accepts up to 10,000 documents per request with a 256 MB body limit.
   */
  upsert(
    namespace: string,
    body: DocumentUpsertParams,
    options?: RequestOptions,
  ): APIPromise<DocumentUpsertResponse> {
    return this._client.post(path`/v1beta/namespaces/${namespace}/documents`, { body, ...options });
  }
}

export interface Document {
  /**
   * Document ID. UUID or string up to 64 characters.
   */
  id: string;

  [k: string]: unknown;
}

export interface DocumentListResponse {
  results: Array<Document>;
}

export interface DocumentDeleteResponse {
  documents_deleted: number;
}

export interface DocumentUpsertResponse {
  documents_upserted: number;
}

export interface DocumentDeleteParams {
  document_ids: Array<string>;
}

export interface DocumentUpsertParams {
  documents: Array<Document>;

  /**
   * Optional explicit schema for the documents. If omitted, schema is inferred.
   */
  schema?: { [key: string]: DocumentUpsertParams.Schema };
}

export namespace DocumentUpsertParams {
  export interface Schema {
    type:
      | 'string'
      | 'int'
      | 'uint'
      | 'float'
      | 'uuid'
      | 'datetime'
      | 'bool'
      | '[]string'
      | '[]int'
      | '[]uint'
      | '[]float'
      | '[]uuid'
      | '[]datetime'
      | '[]bool';

    /**
     * Whether this attribute is filterable.
     */
    filterable?: boolean;

    /**
     * Whether this attribute is indexed for full-text search (BM25).
     */
    full_text_search?: boolean;
  }
}

export declare namespace Documents {
  export {
    type Document as Document,
    type DocumentListResponse as DocumentListResponse,
    type DocumentDeleteResponse as DocumentDeleteResponse,
    type DocumentUpsertResponse as DocumentUpsertResponse,
    type DocumentDeleteParams as DocumentDeleteParams,
    type DocumentUpsertParams as DocumentUpsertParams,
  };
}
