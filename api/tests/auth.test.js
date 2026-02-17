const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('../routes/authRoutes');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

// Mock Mongoose models to avoid real DB calls during unit tests
// However, integration tests are better with real/in-memory DB.
// For simplicity here, we test the route structure.
// NOTE: Ideally, we should use 'mongodb-memory-server' for isolation.

describe('Auth API', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should return 500 (or error) for missing password', async () => {
        const uniqueEmail = `test_${Date.now()}@example.com`;
        try {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    email: uniqueEmail
                });
            if (res.statusCode !== 500) {
                console.log('Response status:', res.statusCode);
                console.log('Response body:', res.body);
            }
            expect(res.statusCode).toEqual(500);
        } catch (error) {
            console.error('Test error:', error);
            throw error;
        }
    });
});
