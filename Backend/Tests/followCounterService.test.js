const request = require('supertest');
const express = require('express');
const { router, incrementCount2, resetAndGetCount2 } = require('../Services/followerCounterService');

const app = express();
app.use(router);

describe('Follower Message Count Service', () => {
    beforeEach(() => {
        // Ensure the follower count is reset before each test
        while (resetAndGetCount2().count !== 0) {}
    });

    afterAll(() => {
        jest.useRealTimers(); // Just in case
    });

    it('should increment the follower message count', () => {
        incrementCount2();
        const result = resetAndGetCount2();
        expect(result.count).toBe(1);
    });

    it('should manually reset the follower message count', () => {
        incrementCount2();
        resetAndGetCount2(); // First call resets
        const result = resetAndGetCount2(); // Should now be 0
        expect(result.count).toBe(0);
    });

    it('should return the current follower message count via API', async () => {
        incrementCount2();
        const response = await request(app).get('/count');
        expect(response.statusCode).toBe(200);
        expect(response.body.count).toBe(1); // count is returned then reset
    });
});
