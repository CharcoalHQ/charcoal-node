// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Charcoal from 'charcoal';

const client = new Charcoal({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource namespaces', () => {
  // Mock server tests are disabled
  test.skip('search: only required params', async () => {
    const responsePromise = client.namespaces.search('namespace', {
      high_level_goal: 'high_level_goal',
      search_query: 'search_query',
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
  test.skip('search: required and optional params', async () => {
    const response = await client.namespaces.search('namespace', {
      high_level_goal: 'high_level_goal',
      search_query: 'search_query',
      filters: { $and: [] },
      max_results: 0,
      stream: true,
    });
  });
});
