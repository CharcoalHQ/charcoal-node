// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as NamespacesAPI from './namespaces/namespaces';
import { NamespaceListResponse, Namespaces } from './namespaces/namespaces';

export class Beta extends APIResource {
  namespaces: NamespacesAPI.Namespaces = new NamespacesAPI.Namespaces(this._client);
}

Beta.Namespaces = Namespaces;

export declare namespace Beta {
  export { Namespaces as Namespaces, type NamespaceListResponse as NamespaceListResponse };
}
