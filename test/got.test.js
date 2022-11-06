const customRequest = require('../src');

const url = 'http://0.0.0.0:3000';

describe('Got test', () => {
  describe('Http2 validation test', () => {
    test('Throw exception for use "http2" felid with "request" agent', async () => {
      try {
        await customRequest.get({ url }, true, 'request');
      } catch (e) {
        expect(e.message).toBe('Agent not found');
      }
    });
  });

  describe('Test default valuse for "GOT" agent"', () => {
    test('Get reqest', async () => {
      const response = await customRequest.get({ url, resolveBodyOnly: false });
      expect(response.statusCode).toBe(200);
    });
    test('POST reqest', async () => {
      const response = await customRequest.post({ url, resolveBodyOnly: false }, false);
      expect(response.statusCode).toBe(200);
    });
    test('PUT reqest', async () => {
      const response = await customRequest.put({ url, resolveBodyOnly: false });
      expect(response.statusCode).toBe(200);
    });
    test('PATCH reqest', async () => {
      const response = await customRequest.patch({ url, resolveBodyOnly: false });
      expect(response.statusCode).toBe(200);
    });
    test('DELETE reqest', async () => {
      const response = await customRequest.delete({ url, resolveBodyOnly: false });
      expect(response.statusCode).toBe(200);
    });
  });

  describe('Set body and form', () => {
    test('test body with put method', async () => {
      const body = {
        url: `${url}/body`,
        json: true,
        resolveBodyOnly: false,
        headers: {
          client_id: 'c0c5f2fd-1e98-4804-9da6-cd0bd344e02d',
          user_id: 'c0c5f2fd-1e98-4804-9da6-cd0bd344e02d',
        },
        body: {
          msisdn: '9122121312',
        },
      };
      const response = await customRequest.put(body);
      expect(response.statusCode).toBe(200);
    });
  });

  describe('Auth test felid (Basic and Barear)', () => {
    test('Basic authentication type 1 it should to be pass with status code 200', async () => {
      const body = {
        url: `${url}/auth/basic`,
        json: true,
        auth: {
          username: 'ali', // type 1
          password: '123456', // type 1
        },
        body: {
          missdn: '9122121312',
        },
      };
      const response = await customRequest.post(body);
      expect(response.message).toBe('OK');
    });

    test('Basic authentication type 2 it should be pass with status code 401', async () => {
      try {
        const body = {
          url: `${url}/auth/basic`,
          json: true,
          auth: {
            user: 'alii', // type 2
            pass: '123456', // type 2
          },
          body: {
            missdn: '9122121312',
          },
        };
        const response = await customRequest.post(body);
        console.log(response);
      } catch (e) {
        expect(e.response.statusCode).toEqual(401);
      }
    });

    test('Barear token', async () => {
      const body = {
        url: `${url}/auth/bearer`,
        json: true,
        auth: {
          bearer: 'dbc67c0a-1562-4338-969b-7d312ba84115',
        },
        body: {
          user: 'Ali',
        },
      };
      const response = await customRequest.post(body);
      expect(response.message).toBe('OK');
    });
  });

  describe('Timeout test', () => {
    test('Timeout error handeling', async () => {
      try {
        const body = {
          url: `${url}/timeout`,
          json: true,
          timeout: 1000 * 3,
          headers: {
            client_id: '62842f59-8ec4-4dfd-8c5d-b4f61f6a6da6',
            user_id: '62842f59-8ec4-4dfd-8c5d-b4f61f6a6da6',
          },
          body: {
            missdn: '9122121312',
          },
        };
        await customRequest.post(body);
      } catch (e) {
        expect(['ETIMEDOUT', 'ECONNRESET', 'ESOCKETTIMEDOUT'].includes(e.error.code)).toBeTruthy();
      }
    });
  });
});
