// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as DocumentsAPI from './documents';
import { DeleteDocumentsResponse, Document, Documents, UpsertDocumentsResponse } from './documents';
import * as SearchAPI from './search/search';
import {
  Search,
  SearchCreateParams,
  SearchListResponse,
  SearchResponse,
  SearchResult,
} from './search/search';

export class Namespaces extends APIResource {
  documents: DocumentsAPI.Documents = new DocumentsAPI.Documents(this._client);
  search: SearchAPI.Search = new SearchAPI.Search(this._client);
}

export interface Namespace {
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
  attributes_schema?: { [key: string]: NamespaceAttributeConfig };
}

export interface NamespaceAttributeConfig {
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

Namespaces.Documents = Documents;
Namespaces.Search = Search;

export declare namespace Namespaces {
  export { type Namespace as Namespace, type NamespaceAttributeConfig as NamespaceAttributeConfig };

  export {
    Documents as Documents,
    type DeleteDocumentsResponse as DeleteDocumentsResponse,
    type Document as Document,
    type UpsertDocumentsResponse as UpsertDocumentsResponse,
  };

  export {
    Search as Search,
    type SearchResponse as SearchResponse,
    type SearchResult as SearchResult,
    type SearchListResponse as SearchListResponse,
    type SearchCreateParams as SearchCreateParams,
  };
}
