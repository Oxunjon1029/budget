const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require('./accounts.mjs');
const mongoUrl = (`${process.env.MONGODB_URL}${DB_NAME}`);

describe('app', () => {


  beforeAll(async () => {
    await mongoose.disconnect();
    await mongoose.connect(mongoUrl);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('GET/accounts', () => {
    it('should return all accounts', async () => {
      const response = await supertest(app).get('/accounts');
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual("Getting all the accounts successfully");
      expect(response.header['content-type']).toBe('application/json; charset=utf-8');
    })
  })

  describe('POST/accounts/add', () => {
    describe('POST?/when all request body is valid', () => {
      it('given title and maybe description', async (req) => {
        const response = await supertest(app)
          .post('/accounts/add')
          .send({ title: 'Som', description: "This is som account" });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ _id: req.body._id, title: 'Som', description: "This is som account" });
        expect(response.header['content-type']).toBe('application/json; charset=utf-8');
      })
    });


    describe('POST/delete', () => {
      it('deleting the account by id', async () => {
        const response = await supertest(app).post('/accounts/delete');

        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("Deleted successfully");
        expect(response.header['content-type']).toBe('application/json; charset=utf-8');
      })

    });

    describe('POST/edit', () => {
      it('updating the account by id', async () => {
        const response = await supertest(app).post('/accounts/edit');

        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("Updated successfully");
        expect(response.header['content-type']).toBe('application/json; charset=utf-8');
      })
    })

  });


})

