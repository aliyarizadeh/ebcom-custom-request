const customRequest = require('../src');

const req = customRequest.defaults({
  agent: 'GOT', proxy: undefined, time: true, timeout: 1000 * 3,
});

const url = 'http://0.0.0.0:3000';

describe('Request Test', () => {
  // describe('CRUD test', () => {
  //   test('GET mehtod test', async () => {
  //     const { response } = await customRequest.get({ url, json: true });
  //     expect(response).toBe('Response get method is OK');
  //   });

  //   test('POST mehtod test', async () => {
  //     const { response } = await customRequest.post({ url, json: true });
  //     expect(response).toBe('Response post is OK');
  //   });

  //   test('PUT mehtod test', async () => {
  //     const { response } = await customRequest.put({ url, json: true });
  //     expect(response).toBe('Response put is OK');
  //   });

  //   test('PATCH mehtod test', async () => {
  //     const { response } = await customRequest.patch({ url, json: true });
  //     expect(response).toBe('Response patch is OK');
  //   });

  //   test('DELETE mehtod test', async () => {
  //     const { response } = await customRequest.delete({ url, json: true });
  //     expect(response).toBe('Response delete is OK');
  //   });
  // });

  // describe('Auth test', () => {
  //   test('Basic auth', async () => {
  //     const { message } = await customRequest.post({
  //       url: `${url}/auth/basic`,
  //       json: true,
  //       auth: {
  //         user: 'ali',
  //         pass: '123456',
  //       },
  //     });
  //     expect(message).toBe('OK');
  //   });

  //   test('Bearer auth', async () => {
  //     const { message } = await customRequest.post({
  //       url: `${url}/auth/bearer`,
  //       json: true,
  //       auth: {
  //         bearer: 'dbc67c0a-1562-4338-969b-7d312ba84115',
  //       },
  //     });
  //     expect(message).toBe('OK');
  //   });
  // });

  describe('Timeout test', () => {
    test('Timeout error handeling', async () => {
      try {
        const body = {
          url: `${url}/timeout`,
          json: true,
          headers: {
            client_id: '62842f59-8ec4-4dfd-8c5d-b4f61f6a6da6',
            user_id: '62842f59-8ec4-4dfd-8c5d-b4f61f6a6da6',
          },
          body: {
            missdn: '9122121312',
          },
        };
        await req.post(body); // Use default params for timeout
      } catch (e) {
        expect(['ETIMEDOUT', 'ECONNRESET', 'ESOCKETTIMEDOUT'].includes(e.error.code)).toBeTruthy();
      }
    });
  });
});
