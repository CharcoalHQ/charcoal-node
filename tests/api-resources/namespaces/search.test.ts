// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Charcoal from '@charcoalhq/sdk';

const client = new Charcoal({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource search', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.namespaces.search.create('namespace', {
      context: 'context',
      objective: 'objective',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.namespaces.search.create('namespace', {
      context: 'context',
      objective: 'objective',
      filters: { $and: [{}] },
      include_attributes: true,
      multiturn: true,
      stream: true,
    });
  });

  // Mock server tests are disabled
  test.skip('continue: only required params', async () => {
    const responsePromise = client.namespaces.search.continue('session_id', {
      namespace: 'namespace',
      message: 'message',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('continue: required and optional params', async () => {
    const response = await client.namespaces.search.continue('session_id', {
      namespace: 'namespace',
      message: 'message',
      include_attributes: true,
      stream: true,
    });
  });
});
