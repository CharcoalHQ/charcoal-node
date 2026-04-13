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
   * Searches the documents in a namespace.
   *
   * Set `multiturn: true` to enable multi-turn mode, which returns a `session_id`
   * and may return `clarification_needed` status when the system needs more
   * information.
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
   * Continues a multi-turn search session. Use this to respond to clarification
   * questions or provide follow-up messages.
   *
   * ### Streaming
   *
   * Supports the same `stream` parameter and SSE event types as the search endpoint.
   */
  continue(
    sessionID: string,
    params: SearchContinueParams,
    options?: RequestOptions,
  ): APIPromise<SearchResponse> {
    const { namespace, ...body } = params;
    return this._client.post(path`/v1/namespaces/${namespace}/search/${sessionID}`, { body, ...options });
  }
}

export interface SearchResponse {
  results: Array<SearchResult>;

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

  /**
   * Session identifier. Present when `multiturn` is `true`.
   */
  session_id?: string;
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

export interface SearchCreateParams {
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
}

export interface SearchContinueParams {
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

export declare namespace Search {
  export {
    type SearchResponse as SearchResponse,
    type SearchResult as SearchResult,
    type SearchCreateParams as SearchCreateParams,
    type SearchContinueParams as SearchContinueParams,
  };
}
