const request = require('supertest');
const express = require('express');
const authRouter = require('./auth');

const app = express();
app.use(express.json());
app.use('/auth', authRouter);

describe('Auth Routes', () => {
  it('should return 200 for POST /auth/login', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({});
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Login successful');
  });

  it('should return 200 for POST /auth/signup', async () => {
    const res = await request(app)
      .post('/auth/signup')
      .send({});
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Signup successful');
  });
});
