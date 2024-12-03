import { describe, expect, it } from 'vitest';
import { handler } from '../api';

type URLSearchParamsInput = Record<
  string,
  string | number | boolean | null | undefined | string[]
>;

interface RequestOptions extends RequestInit {
  queryParams?: URLSearchParamsInput;
}

function createRequest(
  path: `/${string}`,
  { method = 'GET', headers = {}, queryParams = {}, body }: RequestOptions = {}
): Request {
  const fullUrl = new URL(path, 'http://whatever');

  for (const [key, value] of Object.entries(queryParams)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        fullUrl.searchParams.append(key, String(item));
      }
    } else {
      fullUrl.searchParams.append(key, String(value));
    }
  }

  return new Request(fullUrl, {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body ? JSON.stringify(body) : undefined,
  });
}

describe('Hello E2E', () => {
  describe('GET /api/hello', () => {
    it('should return 200 with message "Hello !"', async () => {
      const result = await handler({ request: createRequest('/api/hello') });

      expect(result.status).toEqual(200);
      expect(await result.json()).toEqual({
        message: 'Hello !',
      });
    });
  });
});
