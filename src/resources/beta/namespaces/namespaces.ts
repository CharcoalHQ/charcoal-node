// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as DocumentsAPI from './documents';
import {
  Document,
  DocumentDeleteParams,
  DocumentDeleteResponse,
  DocumentListResponse,
  DocumentUpsertParams,
  DocumentUpsertResponse,
  Documents,
} from './documents';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

export class Namespaces extends APIResource {
  documents: DocumentsAPI.Documents = new DocumentsAPI.Documents(this._client);

  /**
   * Lists all namespaces for the authenticated company.
   */
  list(options?: RequestOptions): APIPromise<NamespaceListResponse> {
    return this._client.get('/v1beta/namespaces', options);
  }
}

export interface NamespaceListResponse {
  results: Array<NamespaceListResponse.Result>;
}

export namespace NamespaceListResponse {
  export interface Result {
    id: string;

    company_id: string;

    /**
     * ISO 8601 timestamp.
     */
    created_at: string;

    /**
     * ISO 8601 timestamp.
     */
    updated_at: string;

    /**
     * Maps attribute names to their configuration.
     */
    attributes_schema?: { [key: string]: Result.AttributesSchema };
  }

  export namespace Result {
    export interface AttributesSchema {
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
}

Namespaces.Documents = Documents;

export declare namespace Namespaces {
  export { type NamespaceListResponse as NamespaceListResponse };

  export {
    Documents as Documents,
    type Document as Document,
    type DocumentListResponse as DocumentListResponse,
    type DocumentDeleteResponse as DocumentDeleteResponse,
    type DocumentUpsertResponse as DocumentUpsertResponse,
    type DocumentDeleteParams as DocumentDeleteParams,
    type DocumentUpsertParams as DocumentUpsertParams,
  };
}
