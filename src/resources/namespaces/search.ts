// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SearchAPI from './search';
import { APIPromise } from '../../core/api-promise';
import { Stream } from '../../core/streaming';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Agentic search over document corpora.
 */
export class Search extends APIResource {
  /**
   * Searches the documents in a namespace.
   *
   * Set `multiturn: true` to enable multi-turn mode, which returns a `session_id`
   * and may return `clarification_needed` status when the system needs more
   * information.
   *
   * Set `stream: true` to receive results as server-sent events; see
   * `SearchStreamEvent` for the event shape. The stream closes after either a
   * `session_result` or `error` event.
   */
  create(
    namespace: string,
    body: SearchCreateParamsNonStreaming,
    options?: RequestOptions,
  ): APIPromise<SearchResponse>;
  create(
    namespace: string,
    body: SearchCreateParamsStreaming,
    options?: RequestOptions,
  ): APIPromise<Stream<SearchStreamEvent>>;
  create(
    namespace: string,
    body: SearchCreateParamsBase,
    options?: RequestOptions,
  ): APIPromise<Stream<SearchStreamEvent> | SearchResponse>;
  create(
    namespace: string,
    body: SearchCreateParams,
    options?: RequestOptions,
  ): APIPromise<SearchResponse> | APIPromise<Stream<SearchStreamEvent>> {
    return this._client.post(path`/v1/namespaces/${namespace}/search`, {
      body,
      ...options,
      stream: body.stream ?? false,
    }) as APIPromise<SearchResponse> | APIPromise<Stream<SearchStreamEvent>>;
  }

  /**
   * Continues a multi-turn search session. Use this to respond to clarification
   * questions or provide follow-up messages.
   *
   * Supports the same `stream` parameter and event types as the search endpoint; see
   * `SearchStreamEvent`.
   */
  continue(
    sessionID: string,
    params: SearchContinueParamsNonStreaming,
    options?: RequestOptions,
  ): APIPromise<SearchResponse>;
  continue(
    sessionID: string,
    params: SearchContinueParamsStreaming,
    options?: RequestOptions,
  ): APIPromise<Stream<SearchStreamEvent>>;
  continue(
    sessionID: string,
    params: SearchContinueParamsBase,
    options?: RequestOptions,
  ): APIPromise<Stream<SearchStreamEvent> | SearchResponse>;
  continue(
    sessionID: string,
    params: SearchContinueParams,
    options?: RequestOptions,
  ): APIPromise<SearchResponse> | APIPromise<Stream<SearchStreamEvent>> {
    const { namespace, ...body } = params;
    return this._client.post(path`/v1/namespaces/${namespace}/search/${sessionID}`, {
      body,
      ...options,
      stream: params.stream ?? false,
    }) as APIPromise<SearchResponse> | APIPromise<Stream<SearchStreamEvent>>;
  }
}

export interface SearchContinuationRequest {
  /**
   * Follow-up message or answer to a clarification question.
   */
  message: string;

  /**
   * Whether to include document attributes in search results.
   */
  include_attributes?: boolean;

  /**
   * Whether to stream the response as server-sent events.
   */
  stream?: boolean;
}

export interface SearchRequest {
  /**
   * Additional context that helps the search system understand your intent. For
   * example, relevant terminology, constraints, or prior knowledge.
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
    | SearchRequest.AndCondition
    | SearchRequest.OrCondition
    | {
        [key: string]:
          | string
          | number
          | boolean
          | SearchRequest.Equals
          | SearchRequest.NotEquals
          | SearchRequest.GreaterThan
          | SearchRequest.GreaterThanOrEqual
          | SearchRequest.LessThan
          | SearchRequest.LessThanOrEqual
          | SearchRequest.In
          | SearchRequest.NotIn
          | SearchRequest.Contains
          | SearchRequest.ContainsAny
          | SearchRequest.Glob
          | SearchRequest.CaseInsensitiveGlob;
      };

  /**
   * Whether to include document attributes in search results.
   */
  include_attributes?: boolean;

  /**
   * Enable multi-turn mode. When `true`, the response includes a `session_id` and
   * may return `clarification_needed` status. When `false` (default), the search
   * always completes in a single request.
   */
  multiturn?: boolean;

  /**
   * Whether to stream the response as server-sent events.
   */
  stream?: boolean;
}

export namespace SearchRequest {
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

export interface SearchResponse {
  results: Array<SearchResult>;

  /**
   * Unique identifier for this search session.
   */
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

/**
 * One event yielded from a streaming search response. Discriminate on the `type`
 * field to handle each event variant.
 */
export type SearchStreamEvent =
  | SearchStreamEvent.SearchStatusEvent
  | SearchStreamEvent.SearchSessionResultEvent
  | SearchStreamEvent.SearchErrorEvent;

export namespace SearchStreamEvent {
  /**
   * Progress update emitted while a search is running.
   */
  export interface SearchStatusEvent {
    /**
     * Human-readable progress message.
     */
    message: string;

    type: 'status';
  }

  /**
   * Final search result. Carries the same fields as `SearchResponse` plus a `type`
   * discriminator.
   */
  export interface SearchSessionResultEvent extends SearchAPI.SearchResponse {
    type: 'session_result';
  }

  /**
   * Emitted when a streaming search fails.
   */
  export interface SearchErrorEvent {
    /**
     * Stable error code describing the failure.
     */
    code: string;

    type: 'error';
  }
}

export type SearchCreateParams = SearchCreateParamsNonStreaming | SearchCreateParamsStreaming;

export interface SearchCreateParamsBase {
  /**
   * Additional context that helps the search system understand your intent. For
   * example, relevant terminology, constraints, or prior knowledge.
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
    | SearchCreateParams.AndCondition
    | SearchCreateParams.OrCondition
    | {
        [key: string]:
          | string
          | number
          | boolean
          | SearchCreateParams.Equals
          | SearchCreateParams.NotEquals
          | SearchCreateParams.GreaterThan
          | SearchCreateParams.GreaterThanOrEqual
          | SearchCreateParams.LessThan
          | SearchCreateParams.LessThanOrEqual
          | SearchCreateParams.In
          | SearchCreateParams.NotIn
          | SearchCreateParams.Contains
          | SearchCreateParams.ContainsAny
          | SearchCreateParams.Glob
          | SearchCreateParams.CaseInsensitiveGlob;
      };

  /**
   * Whether to include document attributes in search results.
   */
  include_attributes?: boolean;

  /**
   * Enable multi-turn mode. When `true`, the response includes a `session_id` and
   * may return `clarification_needed` status. When `false` (default), the search
   * always completes in a single request.
   */
  multiturn?: boolean;

  /**
   * Whether to stream the response as server-sent events.
   */
  stream?: boolean;
}

export namespace SearchCreateParams {
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

  export type SearchCreateParamsNonStreaming = SearchAPI.SearchCreateParamsNonStreaming;
  export type SearchCreateParamsStreaming = SearchAPI.SearchCreateParamsStreaming;
}

export interface SearchCreateParamsNonStreaming extends SearchCreateParamsBase {
  /**
   * Whether to stream the response as server-sent events.
   */
  stream?: false;
}

export interface SearchCreateParamsStreaming extends SearchCreateParamsBase {
  /**
   * Whether to stream the response as server-sent events.
   */
  stream: true;
}

export type SearchContinueParams = SearchContinueParamsNonStreaming | SearchContinueParamsStreaming;

export interface SearchContinueParamsBase {
  /**
   * Path param: Namespace identifier. Alphanumeric characters, hyphens, underscores,
   * and dots. Max 128 characters.
   */
  namespace: string;

  /**
   * Body param: Follow-up message or answer to a clarification question.
   */
  message: string;

  /**
   * Body param: Whether to include document attributes in search results.
   */
  include_attributes?: boolean;

  /**
   * Body param: Whether to stream the response as server-sent events.
   */
  stream?: boolean;
}

export namespace SearchContinueParams {
  export type SearchContinueParamsNonStreaming = SearchAPI.SearchContinueParamsNonStreaming;
  export type SearchContinueParamsStreaming = SearchAPI.SearchContinueParamsStreaming;
}

export interface SearchContinueParamsNonStreaming extends SearchContinueParamsBase {
  /**
   * Body param: Whether to stream the response as server-sent events.
   */
  stream?: false;
}

export interface SearchContinueParamsStreaming extends SearchContinueParamsBase {
  /**
   * Body param: Whether to stream the response as server-sent events.
   */
  stream: true;
}

export declare namespace Search {
  export {
    type SearchContinuationRequest as SearchContinuationRequest,
    type SearchRequest as SearchRequest,
    type SearchResponse as SearchResponse,
    type SearchResult as SearchResult,
    type SearchStreamEvent as SearchStreamEvent,
    type SearchCreateParams as SearchCreateParams,
    type SearchCreateParamsNonStreaming as SearchCreateParamsNonStreaming,
    type SearchCreateParamsStreaming as SearchCreateParamsStreaming,
    type SearchContinueParams as SearchContinueParams,
    type SearchContinueParamsNonStreaming as SearchContinueParamsNonStreaming,
    type SearchContinueParamsStreaming as SearchContinueParamsStreaming,
  };
}
