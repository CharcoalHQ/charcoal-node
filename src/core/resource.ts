// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Charcoal } from '../client';

export abstract class APIResource {
  protected _client: Charcoal;

  constructor(client: Charcoal) {
    this._client = client;
  }
}
