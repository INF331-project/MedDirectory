import app from '../server/app.js';
import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('API test', () => {

    test('It should response with 200 status code from GET /ping', async () => {
        const response = await request(app).get('/ping').send();
        expect(response.statusCode).toBe(200);
    });

    test("test api post", async () => {
        const response = await request(app).post("/test").send({});
        expect(response.statusCode).toBe(200);
    });
    
    // test('It should response with 201 status code from /doctorAPI/doctorRegister', async () => {
    //     const response = await request(app)
    //         .post('/doctorAPI/doctorRegister/')
    //         .send({
    //             name: 'John Doe',
    //             email: 'johndoe@example.com',
    //             password: 'password123',
    //             specialization: 'Cardiologist',
    //             experience: '5 years'
    //         });

    //     // Verifica que la respuesta tenga un código de estado 201
    //     expect(response.status).toBe(201);
    // });

    test('It should response with 200 status code from /doctorAPI/getDoctorbyName', async () => {
        const name = "John Doe"
        const response = await request(app)
            .get('/doctorAPI/getDoctorbyName/' + name)
            .send();

        // Verifica que la respuesta tenga un código de estado 200
        expect(response.status).toBe(200);
    });

    test("It should response with 200 status code from /doctorAPI/getAllDoctors", async () => {
        const response = await request(app)
            .get("/doctorAPI/getAllDoctors")
            .send();

        expect(response.status).toBe(200);
    });

    test("It should response with 200 status code from /doctorAPI/UpdateDoctorbyId", async () => {
        const response = await request(app)
            .put("/doctorAPI/UpdateDoctorbyId/651ceefa78da9f80b0651e5d")
            .send({
                name: "John Doe",
                email: "jhon.doe2@a.com",
                specialization: "Traumatologist",
            });
        expect(response.status).toBe(200);
    });
})