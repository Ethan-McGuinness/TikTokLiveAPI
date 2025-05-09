const request = require('supertest');
const express = require('express');
const { router, incrementCount, resetAndGetCount } = require('../Services/chatCounterService');

const app = express();
app.use(router);

describe('Chat Message Count Service', () => {
    beforeEach(() => {
        // Ensure count is reset before each test
        while (resetAndGetCount().count !== 0) {}
    });

    afterAll(() => {
        jest.useRealTimers(); // Clean up in case fake timers were used
    });

    it('should increment the chat message count', () => {
        incrementCount();
        const result = resetAndGetCount();
        expect(result.count).toBe(1);
    });

    it('should manually reset the chat message count', () => {
        incrementCount();
        resetAndGetCount(); // this resets
        const result = resetAndGetCount();
        expect(result.count).toBe(0);
    });

    it('should return the current chat message count via API', async () => {
        incrementCount();
        const response = await request(app).get('/count');
        expect(response.statusCode).toBe(200);
        expect(response.body.count).toBe(1); // count is returned then reset
    });
});
