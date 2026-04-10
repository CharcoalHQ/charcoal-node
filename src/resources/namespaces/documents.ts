// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';

export class Documents extends APIResource {}

export interface DeleteDocumentsResponse {
  documents_deleted: number;
}

/**
 * A document is a record with a required `id` and arbitrary attributes. Attribute
 * types must conform to the namespace's `attributes_schema`. If no schema is
 * provided during upsert, one is inferred from the document structure.
 */
export interface Document {
  /**
   * Document ID. UUID or string up to 64 characters.
   */
  id: string;

  [k: string]: unknown;
}

export interface UpsertDocumentsResponse {
  documents_upserted: number;
}

export declare namespace Documents {
  export {
    type DeleteDocumentsResponse as DeleteDocumentsResponse,
    type Document as Document,
    type UpsertDocumentsResponse as UpsertDocumentsResponse,
  };
}
