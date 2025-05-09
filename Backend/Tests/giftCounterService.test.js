const request = require('supertest');
const express = require('express');
const { router, incrementCount3, resetAndGetCount3 } = require('../Services/giftCounterService');

const app = express();
app.use(router);

describe('Gift Message Count Service', () => {
    beforeEach(() => {
        // Reset gift count to zero before each test
        while (resetAndGetCount3().count !== 0) {}
    });

    afterAll(() => {
        jest.useRealTimers(); // Ensure no fake timers linger
    });

    it('should increment the gift message count', () => {
        incrementCount3();
        const result = resetAndGetCount3();
        expect(result.count).toBe(1);
    });

    it('should manually reset the gift message count', () => {
        incrementCount3();
        resetAndGetCount3(); // First reset
        const result = resetAndGetCount3(); // Should now be 0
        expect(result.count).toBe(0);
    });

    it('should return the current gift message count via API', async () => {
        incrementCount3();
        const response = await request(app).get('/count');
        expect(response.statusCode).toBe(200);
        expect(response.body.count).toBe(1); // Count should be returned then reset
    });
});
