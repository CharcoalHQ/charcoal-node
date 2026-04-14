// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Manage API keys for programmatic access.
 */
export class APIKeys extends APIResource {
  /**
   * Creates a new API key for the authenticated organization. The response includes
   * the full `raw_key` — this is the only time it is returned, so store it securely.
   */
  create(body: APIKeyCreateParams, options?: RequestOptions): APIPromise<CreateAPIKeyResponse> {
    return this._client.post('/v1/api_keys', { body, ...options });
  }

  /**
   * Lists all API keys for the authenticated organization. Note that full key values
   * are never returned — only the prefix and suffix for display.
   */
  list(options?: RequestOptions): APIPromise<APIKeyListResponse> {
    return this._client.get('/v1/api_keys', options);
  }

  /**
   * Deletes an API key. Any applications using this key will lose access
   * immediately.
   */
  delete(id: string, options?: RequestOptions): APIPromise<APIKeyDeleteResponse> {
    return this._client.delete(path`/v1/api_keys/${id}`, options);
  }
}

export interface APIKey {
  /**
   * Unique API key identifier (e.g. `akey_CjXuYOtW`).
   */
  id: string;

  /**
   * ISO 8601 timestamp.
   */
  created_at: string;

  /**
   * Name or identifier of the user who created the key.
   */
  created_by: string;

  /**
   * The prefix portion of the key (e.g. `sk-prod`).
   */
  key_prefix: string;

  /**
   * The last few characters of the key, for display.
   */
  key_suffix: string;

  /**
   * ISO 8601 timestamp of the last request authenticated with this key, or `null` if
   * never used.
   */
  last_used_at: string | null;

  /**
   * Human-readable key name.
   */
  name: string;
}

/**
 * Response from creating an API key. The `raw_key` field is only returned on
 * creation and cannot be retrieved again — store it securely.
 */
export interface CreateAPIKeyResponse {
  api_key: APIKey;

  /**
   * The full API key. Only returned at creation time.
   */
  raw_key: string;
}

export interface APIKeyListResponse {
  api_keys: Array<APIKey>;
}

export interface APIKeyDeleteResponse {
  success: boolean;
}

export interface APIKeyCreateParams {
  /**
   * Human-readable name for the key.
   */
  name: string;
}

export declare namespace APIKeys {
  export {
    type APIKey as APIKey,
    type CreateAPIKeyResponse as CreateAPIKeyResponse,
    type APIKeyListResponse as APIKeyListResponse,
    type APIKeyDeleteResponse as APIKeyDeleteResponse,
    type APIKeyCreateParams as APIKeyCreateParams,
  };
}
