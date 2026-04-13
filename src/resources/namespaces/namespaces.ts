// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as DocumentsAPI from './documents';
import {
  DeleteDocumentsResponse,
  Document,
  DocumentDeleteParams,
  DocumentRetrieveParams,
  DocumentUpsertParams,
  Documents,
  UpsertDocumentsResponse,
} from './documents';
import * as SearchAPI from './search';
import { Search, SearchContinueParams, SearchCreateParams, SearchResponse, SearchResult } from './search';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Manage namespaces.
 */
export class Namespaces extends APIResource {
  documents: DocumentsAPI.Documents = new DocumentsAPI.Documents(this._client);
  search: SearchAPI.Search = new SearchAPI.Search(this._client);

  /**
   * Lists all namespaces for the authenticated organization.
   */
  list(options?: RequestOptions): APIPromise<NamespaceListResponse> {
    return this._client.get('/v1/namespaces', options);
  }
}

export interface Namespace {
  /**
   * Unique namespace identifier (e.g. `ns_CjXuYOtW`).
   */
  id: string;

  /**
   * ISO 8601 timestamp.
   */
  created_at: string;

  /**
   * Namespace name. This is the value used in API path parameters.
   */
  name: string;

  /**
   * ISO 8601 timestamp.
   */
  updated_at: string;

  /**
   * Maps attribute names to their configuration.
   */
  attributes_schema?: { [key: string]: Namespace.AttributesSchema };
}

export namespace Namespace {
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
     * Whether this attribute can be filtered on.
     */
    is_filterable?: boolean;

    /**
     * Whether this attribute can be searched against.
     */
    is_searchable?: boolean;
  }
}

export interface NamespaceListResponse {
  results: Array<Namespace>;
}

Namespaces.Documents = Documents;
Namespaces.Search = Search;

export declare namespace Namespaces {
  export { type Namespace as Namespace, type NamespaceListResponse as NamespaceListResponse };

  export {
    Documents as Documents,
    type DeleteDocumentsResponse as DeleteDocumentsResponse,
    type Document as Document,
    type UpsertDocumentsResponse as UpsertDocumentsResponse,
    type DocumentRetrieveParams as DocumentRetrieveParams,
    type DocumentDeleteParams as DocumentDeleteParams,
    type DocumentUpsertParams as DocumentUpsertParams,
  };

  export {
    Search as Search,
    type SearchResponse as SearchResponse,
    type SearchResult as SearchResult,
    type SearchCreateParams as SearchCreateParams,
    type SearchContinueParams as SearchContinueParams,
  };
}
