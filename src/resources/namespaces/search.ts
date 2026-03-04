// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Agentic search over document corpora.
 */
export class Search extends APIResource {
  /**
   * Creates a new search session or continues an existing one. Supports streaming
   * via server-sent events when `stream` is set to `true`.
   */
  create(namespace: string, body: SearchCreateParams, options?: RequestOptions): APIPromise<SearchResponse> {
    return this._client.post(path`/v1/namespaces/${namespace}/search`, { body, ...options });
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

export type SearchCreateParams =
  | SearchCreateParams.SearchNewSessionRequest
  | SearchCreateParams.SearchContinuationRequest;

export declare namespace SearchCreateParams {
  export interface SearchNewSessionRequest {
    /**
     * The overarching goal for the search session.
     */
    high_level_goal: string;

    /**
     * The initial search query.
     */
    search_query: string;

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
     * Upper bound on the number of results to return.
     */
    max_results?: number;

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

export declare namespace Search {
  export {
    type SearchResponse as SearchResponse,
    type SearchResult as SearchResult,
    type SearchCreateParams as SearchCreateParams,
  };
}
