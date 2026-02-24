// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as NamespacesAPI from './namespaces';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Namespaces extends APIResource {
  /**
   * Creates a new search session or continues an existing one. Supports streaming
   * via server-sent events when `stream` is set to `true`.
   */
  search(
    namespace: string,
    body: NamespaceSearchParams,
    options?: RequestOptions,
  ): APIPromise<NamespaceSearchResponse> {
    return this._client.post(path`/v1/namespaces/${namespace}/search`, { body, ...options });
  }
}

/**
 * Recursive filter object. One of: `{ $and: [Filter, ...] }` (all must match),
 * `{ $or: [Filter, ...] }` (any must match), or `{ field_name: FieldCondition }`
 * (field-level condition).
 */
export type Filter =
  | Filter.AndCondition
  | Filter.OrCondition
  | {
      [key: string]:
        | string
        | number
        | boolean
        | Filter.Equals
        | Filter.NotEquals
        | Filter.GreaterThan
        | Filter.GreaterThanOrEqual
        | Filter.LessThan
        | Filter.LessThanOrEqual
        | Filter.In
        | Filter.NotIn
        | Filter.Contains
        | Filter.ContainsAny;
    };

export namespace Filter {
  export interface AndCondition {
    $and: Array<NamespacesAPI.Filter>;
  }

  export interface OrCondition {
    $or: Array<NamespacesAPI.Filter>;
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

export interface NamespaceSearchResponse {
  results: Array<NamespaceSearchResponse.Result>;

  session_id: string;

  status: 'pending' | 'running' | 'clarification_needed' | 'completed' | 'failed' | 'expired';

  /**
   * Synthesized summary of all findings.
   */
  synthesis: string;

  clarification_needed?: NamespaceSearchResponse.ClarificationNeeded;
}

export namespace NamespaceSearchResponse {
  export interface Result {
    /**
     * Source document ID.
     */
    id: string;

    excerpts: Array<string>;

    finding: string;
  }

  export interface ClarificationNeeded {
    options?: Array<string>;

    /**
     * Clarification question, present when status is `clarification_needed`.
     */
    question?: string;
  }
}

export type NamespaceSearchParams =
  | NamespaceSearchParams.SearchNewSessionRequest
  | NamespaceSearchParams.SearchContinuationRequest;

export declare namespace NamespaceSearchParams {
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
    filters?: Filter;

    /**
     * Upper bound on the number of results to return.
     */
    max_results?: number;

    /**
     * Whether to stream the response as server-sent events.
     */
    stream?: boolean;
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

export declare namespace Namespaces {
  export {
    type Filter as Filter,
    type NamespaceSearchResponse as NamespaceSearchResponse,
    type NamespaceSearchParams as NamespaceSearchParams,
  };
}
