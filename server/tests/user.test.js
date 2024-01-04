const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const supertest = require('supertest');
const express = require("express");
const loginRouter = require("../routes/userRoutes");
const UserModel = require(`../database/user.model`);

const app = express();
let mongod;

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
  
    app.use(express.json());
    app.use('/', loginRouter);
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

describe('Login functionality', () => {
    it('should handle successful login', async () => {
        const response = await supertest(app)
            .post('/v1/api/users/login')
            .send({ username: 'Admin', role: 'Admin' });

        expect(response.status).toBe(200);
    });

    it('should reject invalid login credentials', async () => {
        const response = await supertest(app)
            .post('/v1/api/users/login')
            .send({ username: 'InvalidUsername', role: 'InvalidRole' });
      
        expect(response.status).toBe(401);
        expect(response.body).toMatchObject({
             message: 'Invalid login credentials'
        });
    });
});