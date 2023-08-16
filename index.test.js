const request = require('supertest');
const {app, server} = require('./index.js'); 
describe('Routes Testing', () => {
    it('Root Route', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('<h1>Welcome to the new Home Page!</h1>');
    });

    it('About Route', async () => {
        const response = await request(app).get('/about');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('<h1>This is the new About Us Page.</h1>');
    });

    it('Contact Route', async () => {
        const response = await request(app).get('/contact');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('<h1>This is the new Contact Us Page.</h1>');
    });
});

afterAll(done => {
    server.close(done);
});