const app = require('../server/app');
const request = require('supertest');

describe('API test', () => {
    test('It should response with 200 status code from GET /ping', async () => {
        const response = await request(app).get('/ping').send();
        expect(response.statusCode).toBe(200);
    });

    test("test api post", async () => {
        const response = await request(app).post("/test").send({});
        expect(response.statusCode).toBe(200);
    });
    
    test('It should response with 201 status code from /doctorAPI/doctorRegister', async () => {
        const response = await request(app)
            .post('/doctorAPI/doctorRegister/')
            .send({
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: 'password123',
                specialization: 'Cardiologist',
                experience: '5 years'
            });

        // Verifica que la respuesta tenga un código de estado 201
        expect(response.status).toBe(201);
    });
})