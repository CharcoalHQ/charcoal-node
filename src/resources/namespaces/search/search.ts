// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as NamespacesAPI from '../namespaces';
import * as DocumentsAPI from './documents';
import { DocumentDeleteParams, DocumentRetrieveParams, DocumentUpsertParams, Documents } from './documents';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Search extends APIResource {
  documents: DocumentsAPI.Documents = new DocumentsAPI.Documents(this._client);

  /**
   * Creates a new search session or continues an existing one.
   *
   * ### Streaming
   *
   * Set `stream: true` to receive results as server-sent events. The stream emits
   * three event types:
   *
   * - **`status`** — Progress updates during search. Payload:
   *   `{ "message": "string" }`
   * - **`session_result`** — The final search result. Payload matches the
   *   non-streaming response schema.
   * - **`error`** — Sent if the search fails. Payload: `{ "code": "string" }`
   *
   * The stream closes after either a `session_result` or `error` event.
   */
  create(namespace: string, body: SearchCreateParams, options?: RequestOptions): APIPromise<SearchResponse> {
    return this._client.post(path`/v1/namespaces/${namespace}/search`, { body, ...options });
  }

  /**
   * Lists all namespaces for the authenticated organization.
   */
  list(options?: RequestOptions): APIPromise<SearchListResponse> {
    return this._client.get('/v1/namespaces', options);
  }
}

export interface SearchResponse {
  results: Array<SearchResult>;

  session_id: string;

  status: 'completed' | 'clarification_needed' | 'failed';

  /**
   * Synthesized summary of all findings.
   */
  synthesis: string;

  /**
   * Present when status is `clarification_needed`.
   */
  clarification_needed?: SearchResponse.ClarificationNeeded;

  /**
   * Number of documents scanned during the search.
   */
  documents_scanned?: number;

  /**
   * Number of queries executed during the search.
   */
  queries_executed?: number;
}

export namespace SearchResponse {
  /**
   * Present when status is `clarification_needed`.
   */
  export interface ClarificationNeeded {
    /**
     * Suggested answer options.
     */
    options?: Array<string>;

    /**
     * The clarification question.
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

  /**
   * Document attributes. Present when `include_attributes` is `true`.
   */
  attributes?: { [key: string]: unknown };
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
            | SearchNewSessionRequest.ContainsAny
            | SearchNewSessionRequest.Glob
            | SearchNewSessionRequest.CaseInsensitiveGlob;
        };

    /**
     * Whether to include document attributes in search results.
     */
    include_attributes?: boolean;

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

    export interface Glob {
      /**
       * Case-sensitive glob pattern match.
       */
      $glob?: string;
    }

    export interface CaseInsensitiveGlob {
      /**
       * Case-insensitive glob pattern match.
       */
      $iglob?: string;
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
     * Whether to include document attributes in search results.
     */
    include_attributes?: boolean;

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
    type DocumentRetrieveParams as DocumentRetrieveParams,
    type DocumentDeleteParams as DocumentDeleteParams,
    type DocumentUpsertParams as DocumentUpsertParams,
  };
}
