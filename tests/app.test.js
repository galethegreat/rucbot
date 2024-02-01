const request = require('supertest');
const { app } = require('../src/server');
const { pool } = 

describe('Test the root path', () => {
    afterAll(() => {
        server.close(done); // Close the server after all tests
        pool.end();
    });


    test('Root Path Test', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(200);
  });
});