const supertest = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const ClothModel = require("../database/acepokerclothes.model");
const clothRouter = require("../routes/acePokerRoutes");
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
    app.use('/', clothRouter);
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
        if (url !== '/v1/api/ace-poker/clothes') {
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

describe('Cloth Controller Tests', () => {
    let authToken;
  
    beforeAll(async () => {
        authToken = await loginAndGetToken();
    });
  
    it('should get all clothes', async () => {
        const findMock = jest.spyOn(ClothModel, 'find').mockResolvedValueOnce([]);

        const response = await supertest(app).get('/v1/api/ace-poker/clothes');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);

        findMock.mockRestore();
    });

    it('should handle error when getting clothes', async () => {
        const findMock = jest.fn().mockRejectedValueOnce(new Error('Some error message'));
        jest.spyOn(ClothModel, 'find').mockImplementationOnce(findMock);
    
        const response = await supertest(app)
            .get('/v1/api/ace-poker/clothes')
            .set('Authorization', `${authToken}`);
    
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ success: false, message: 'An error occurred during getting the Ace Poker Clothes!' });
    
        jest.restoreAllMocks();
    });
  
    it('should upload a new cloth', async () => {
        const clothData = {
            name: 'Sample Cloth',
            brand: 'Sample Brand',
            price: 50,
            audience: 'Men',
            image: 'sample-image-url',
        };
  
        const saveMock = jest.fn().mockResolvedValueOnce(clothData);
        jest.spyOn(ClothModel.prototype, 'save').mockImplementationOnce(saveMock);
    
        const response = await supertest(app)
            .post('/v1/api/ace-poker/upload')
            .set('Authorization', `${authToken}`)
            .send(clothData);
    
        expect(response.status).toBe(200);
        expect(response.body).toEqual(clothData);
    
        saveMock.mockRestore();
    });

    it('shouldn`t upload a new cloth', async () => {
        const clothData = {};
    
        const saveMock = jest.fn().mockRejectedValueOnce(new Error('Some error message'));
        jest.spyOn(ClothModel.prototype, 'save').mockImplementationOnce(saveMock);
    
        const response = await supertest(app)
            .post('/v1/api/ace-poker/upload')
            .set('Authorization', `${authToken}`)
            .send(clothData);
    
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ success: false, message: `An error occurred during upload the new Ace Poker Cloth!` });
    
        jest.restoreAllMocks();
    });
  
    it('should patch an existing cloth', async () => {
        const clothId = generateValidObjectId();
        const clothData = {
            name: 'Sample Cloth',
            brand: 'Sample Brand',
            price: 50,
            audience: 'Men',
            image: 'sample-image-url',
        };
  
        const findOneAndUpdateMock = jest.spyOn(ClothModel, 'findOneAndUpdate').mockResolvedValueOnce({});
  
        const response = await supertest(app)
            .patch(`/v1/api/ace-poker/${clothId}/update`)
            .set('Authorization', `${authToken}`)
            .send({clothData});
    
        expect(response.status).toBe(200);
        expect(response.body).toEqual({});
    
        findOneAndUpdateMock.mockRestore();
    });

    it('shouldn`t patch an existing cloth', async () => {
        const clothId = generateValidObjectId();
        const clothData = {};
    
        const saveMock = jest.fn().mockRejectedValueOnce(new Error('Some error message'));
        jest.spyOn(ClothModel.prototype, 'save').mockImplementationOnce(saveMock);
    
        const response = await supertest(app)
            .patch(`/v1/api/ace-poker/${clothId}/update`)
            .set('Authorization', `${authToken}`)
            .send(clothData);
    
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ success: false, message: `An error occurred during patching the desired Ace Poker Cloth!` });
    
        jest.restoreAllMocks();
    });
  
    it('should delete an existing cloth', async () => {
        const clothId = generateValidObjectId();
      
        const findByIdMock = jest.spyOn(ClothModel, 'findById').mockResolvedValueOnce({});
        const deleteOneMock = jest.spyOn(ClothModel, 'deleteOne').mockResolvedValueOnce({ deletedCount: 1 });
      
        try {
            const response = await supertest(app)
                .delete(`/v1/api/ace-poker/${clothId}/delete`)
                .set('Authorization', `${authToken}`);
      
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ deletedCount: 1 });
        } catch (error) {
            console.error('Error during the test:', error);
        } finally {
            findByIdMock.mockRestore();
            deleteOneMock.mockRestore();
        }
    });

    it('it should handle error when deleting a cloth', async () => {
        const clothId = generateValidObjectId();
        const clothData = {};
    
        const saveMock = jest.fn().mockRejectedValueOnce(new Error('Some error message'));
        jest.spyOn(ClothModel.prototype, 'save').mockImplementationOnce(saveMock);
    
        const response = await supertest(app)
            .delete(`/v1/api/ace-poker/${clothId}/delete`)
            .set('Authorization', `${authToken}`)
            .send(clothData);
    
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ success: false, message: `An error occurred during delete the desired Ace Poker Cloth!` });
    
        jest.restoreAllMocks();
    });
});