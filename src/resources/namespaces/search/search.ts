// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as NamespacesAPI from '../namespaces';
import * as DocumentsAPI from './documents';
import { DocumentDeleteParams, DocumentListResponse, DocumentUpsertParams, Documents } from './documents';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Search extends APIResource {
  documents: DocumentsAPI.Documents = new DocumentsAPI.Documents(this._client);

  /**
   * Creates a new search session or continues an existing one. Supports streaming
   * via server-sent events when `stream` is set to `true`.
   */
  create(namespace: string, body: SearchCreateParams, options?: RequestOptions): APIPromise<SearchResponse> {
    return this._client.post(path`/v1/namespaces/${namespace}/search`, { body, ...options });
  }

  /**
   * Lists all namespaces for the authenticated company.
   */
  list(options?: RequestOptions): APIPromise<SearchListResponse> {
    return this._client.get('/v1/namespaces', options);
  }
}

export interface SearchResponse {
  results: Array<SearchResult>;

  session_id: string;

  status: 'pending' | 'running' | 'clarification_needed' | 'completed' | 'failed' | 'expired';

  /**
   * Synthesized summary of all findings.
   */
  synthesis: string;

  clarification_needed?: SearchResponse.ClarificationNeeded;
}

export namespace SearchResponse {
  export interface ClarificationNeeded {
    options?: Array<string>;

    /**
     * Clarification question, present when status is `clarification_needed`.
     */
    question?: string;
  }
}

export interface SearchResult {
  /**
   * Source document ID.
   */
  id: string;

  excerpts: Array<string>;

  finding: string;
}

export interface SearchListResponse {
  results: Array<NamespacesAPI.Namespace>;
}

export type SearchCreateParams =
  | SearchCreateParams.SearchNewSessionRequest
  | SearchCreateParams.SearchContinuationRequest;

export declare namespace SearchCreateParams {
  export interface SearchNewSessionRequest {
    /**
     * Detailed natural language search request.
     */
    context: string;

    /**
     * One sentence describing what you are looking for.
     */
    objective: string;

    /**
     * Recursive filter object. One of: `{ $and: [Filter, ...] }` (all must match),
     * `{ $or: [Filter, ...] }` (any must match), or `{ field_name: FieldCondition }`
     * (field-level condition).
     */
    filters?:
      | SearchNewSessionRequest.AndCondition
      | SearchNewSessionRequest.OrCondition
      | {
          [key: string]:
            | string
            | number
            | boolean
            | SearchNewSessionRequest.Equals
            | SearchNewSessionRequest.NotEquals
            | SearchNewSessionRequest.GreaterThan
            | SearchNewSessionRequest.GreaterThanOrEqual
            | SearchNewSessionRequest.LessThan
            | SearchNewSessionRequest.LessThanOrEqual
            | SearchNewSessionRequest.In
            | SearchNewSessionRequest.NotIn
            | SearchNewSessionRequest.Contains
            | SearchNewSessionRequest.ContainsAny;
        };

    /**
     * Whether to stream the response as server-sent events.
     */
    stream?: boolean;
  }

  export namespace SearchNewSessionRequest {
    export interface AndCondition {
      $and: Array<unknown>;
    }

    export interface OrCondition {
      $or: Array<unknown>;
    }

    export interface Equals {
      $eq?: string | number | boolean | null;
    }

    export interface NotEquals {
      $neq?: string | number | boolean | null;
    }

    export interface GreaterThan {
      $gt?: number;
    }

    export interface GreaterThanOrEqual {
      $gte?: number;
    }

    export interface LessThan {
      $lt?: number;
    }

    export interface LessThanOrEqual {
      $lte?: number;
    }

    export interface In {
      $in?: Array<string | number | boolean | null>;
    }

    export interface NotIn {
      $not_in?: Array<string | number | boolean | null>;
    }

    export interface Contains {
      $contains?: string | number | boolean | null;
    }

    export interface ContainsAny {
      $contains_any?: Array<string | number | boolean | null>;
    }
  }

  export interface SearchContinuationRequest {
    /**
     * Follow-up message or answer to a clarification question.
     */
    message: string;

    /**
     * The ID of the session to continue.
     */
    session_id: string;

    /**
     * Whether to stream the response as server-sent events.
     */
    stream?: boolean;
  }
}

Search.Documents = Documents;

export declare namespace Search {
  export {
    type SearchResponse as SearchResponse,
    type SearchResult as SearchResult,
    type SearchListResponse as SearchListResponse,
    type SearchCreateParams as SearchCreateParams,
  };

  export {
    Documents as Documents,
    type DocumentListResponse as DocumentListResponse,
    type DocumentDeleteParams as DocumentDeleteParams,
    type DocumentUpsertParams as DocumentUpsertParams,
  };
}
