const supertest = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { MongoMemoryServer } = require("mongodb-memory-server");
const NewsModel = require("../database/news.model");
const newsRouter = require("../routes/newsRoutes");
const loginRouter = require("../routes/userRoutes");

const app = express();
let mongod;

function generateValidObjectId() {
    return mongoose.Types.ObjectId().toString();
}

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
  
    app.use(express.json());
    app.use('/', newsRouter);
    app.use('/', loginRouter);
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

const loginAndGetToken = async (url) => {
    try {
        if (url !== '/v1/api/news/newest') {
            const response = await supertest(app)
            .post('/v1/api/users/login')
            .send({
                username: 'NotAdmin',
                role: 'Admin',
            });
    
            if (response.status !== 200) {
            throw new Error('Failed to obtain authentication token');
            }
    
            return response.body.token;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error during login:', error.message);
        throw error;
    }
};

describe('News Controller Tests', () => {
    let authToken;
  
    beforeAll(async () => {
        authToken = await loginAndGetToken();
    });
  
    it('should get all news', async () => {
        const findMock = jest.spyOn(NewsModel, 'find').mockResolvedValueOnce([]);
    
        const response = await supertest(app).get('/v1/api/news/newest');
    
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    
        findMock.mockRestore();
    });

    it('should handle error when getting clothes', async () => {
        const findMock = jest.fn().mockRejectedValueOnce(new Error('Some error message'));
        jest.spyOn(NewsModel, 'find').mockImplementationOnce(findMock);
    
        const response = await supertest(app)
            .get('/v1/api/news/newest');
    
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ success: false, message: 'An error occurred during getting the latest news!' });
    
        jest.restoreAllMocks();
    });
  
    it('should upload a new new', async () => {
        const newData = {
            title: 'Sample new title',
            message: 'Sample message'
        };
  
        const saveMock = jest.fn().mockResolvedValueOnce(newData);
        jest.spyOn(NewsModel.prototype, 'save').mockImplementationOnce(saveMock);
    
        const response = await supertest(app)
            .post('/v1/api/news/upload')
            .set('Authorization', `${authToken}`)
            .send(newData);
    
        expect(response.status).toBe(200);
        expect(response.body).toEqual(newData);
    
        saveMock.mockRestore();
    });

    it('shouldn`t upload a new new', async () => {
        const newData = {};
    
        const saveMock = jest.fn().mockRejectedValueOnce(new Error('Some error message'));
        jest.spyOn(NewsModel.prototype, 'save').mockImplementationOnce(saveMock);
    
        const response = await supertest(app)
            .post('/v1/api/news/upload')
            .set('Authorization', `${authToken}`)
            .send(newData);
    
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ success: false, message: `An error occurred during upload the new 'new'!` });
    
        jest.restoreAllMocks();
    });
  
    it('should patch an existing new', async () => {
        const newId = generateValidObjectId();
        const newData = {
            title: newId,
            message: 'Sample message'
        };
  
        const findOneAndUpdateMock = jest.spyOn(NewsModel, 'findOneAndUpdate').mockResolvedValueOnce({});
  
        const response = await supertest(app)
            .patch(`/v1/api/news/${newId}/update`)
            .set('Authorization', `${authToken}`)
            .send({newData});
    
        expect(response.status).toBe(200);
        expect(response.body).toEqual({});
    
        findOneAndUpdateMock.mockRestore();
    });

    it('shouldn`t patch an existing new', async () => {
        const newId = generateValidObjectId();
        const clothData = {};
    
        const saveMock = jest.fn().mockRejectedValueOnce(new Error('Some error message'));
        jest.spyOn(NewsModel.prototype, 'save').mockImplementationOnce(saveMock);
    
        const response = await supertest(app)
            .patch(`/v1/api/news/${newId}/update`)
            .set('Authorization', `${authToken}`)
            .send(clothData);
    
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ success: false, message: `An error occurred during patching the desired 'new'!` });
    
        jest.restoreAllMocks();
    });
  
    it('should delete an existing new', async () => {
        const newId = generateValidObjectId();
        const mockNews = {
            _id: newId,
            deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 }),
        };
    
        const findByIdMock = jest.spyOn(NewsModel, 'findById').mockResolvedValueOnce(mockNews);
    
        try {
            const response = await supertest(app)
                .delete(`/v1/api/news/${newId}/delete`)
                .set('Authorization', `${authToken}`);
    
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ deletedCount: 1 });
            expect(findByIdMock).toHaveBeenCalledWith(newId);
            expect(mockNews.deleteOne).toHaveBeenCalled();
        } catch (error) {
            console.error('Error during the test:', error);
        } finally {
            findByIdMock.mockRestore();
        }
    });

    it('it should handle error when deleting a new', async () => {
        const newId = generateValidObjectId();
        const clothData = {};
    
        const saveMock = jest.fn().mockRejectedValueOnce(new Error('Some error message'));
        jest.spyOn(NewsModel.prototype, 'save').mockImplementationOnce(saveMock);
    
        const response = await supertest(app)
            .delete(`/v1/api/news/${newId}/delete`)
            .set('Authorization', `${authToken}`)
            .send(clothData);
    
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ success: false, message: `An error occurred during delete the desired 'new'!` });
    
        jest.restoreAllMocks();
    });
});