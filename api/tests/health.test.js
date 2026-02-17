const request = require('supertest');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('School Management System API is running...');
});

describe('Health Check', () => {
    it('should return 200 OK', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('School Management System API is running');
    });
});
