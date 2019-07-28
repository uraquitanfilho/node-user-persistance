import request from 'supertest';
import app from '../../src/app';

describe('User', () => {
  /**
   * INSERT
   */
  it('shoud be able to register a new user with id = 1', async () => {
    const response = await request(app)
      .post('/holidayextras/v1/user')
      .send({
        email: 'uraquitan@syx.com.br',
        givenName: 'Uraquitan',
        familyName: 'Filho',
      });

    expect(response.body).toHaveProperty('data.id');
  });

  it('register a new user with id = 2', async () => {
    const response = await request(app)
      .post('/holidayextras/v1/user')
      .send({
        email: 'abutroviski@gmail.com',
        givenName: 'Abu',
        familyName: 'Matova',
      });

    expect(response.body).toHaveProperty('data.id');
  });

  it('Validate data before save new User', async () => {
    const response = await request(app)
      .post('/holidayextras/v1/user')
      .send({
        email: 'uraquitan@syx.com.br',
        givenName: 'Uraquitan',
        familyName2: 'Matova',
      });
    expect(response.text).toContain('Family Name is required');
  });

  it('duplicate email', async () => {
    const response = await request(app)
      .post('/holidayextras/v1/user')
      .send({
        email: 'uraquitan@syx.com.br',
        givenName: 'Uraquitan',
        familyName: 'Matova',
      });
    expect(response.status).toBe(400);
  });
  /**
   * UPDATE
   */
  it('user id does not exist', async () => {
    const response = await request(app)
      .put('/holidayextras/v1/user/3')
      .send({
        email: 'test@test.com',
      });
    // console.log(response);
    expect(response.status).toBe(400);
  });
  it('Try update with same email to another user', async () => {
    const response = await request(app)
      .put(`/holidayextras/v1/user/2`)
      .send({
        email: 'uraquitan@syx.com.br',
      });
    expect(response.status).toBe(400);
  });

  it('check if only number is allowed', async () => {
    const id = 'aa';

    const response = await request(app)
      .put(`/holidayextras/v1/user/${id}`)
      .send({
        familyName: 'test',
      });
    if (id !== '1') {
      expect(response.status).toBe(400);
    }
  });

  it('Validate before update', async () => {
    const response = await request(app)
      .put(`/holidayextras/v1/user/1`)
      .send({
        familyName: 'test',
        email: 'illegalMail',
      });
    expect(response.status).toBe(400);
  });

  it('shoud be able to update a user', async () => {
    const id = '1';

    const response = await request(app)
      .put(`/holidayextras/v1/user/${id}`)
      .send({
        familyName: 'test',
      });

    expect(response.body).toHaveProperty('data.id');
  });
  /**
   * SHOW
   */
  it('Show specific User with id=1', async () => {
    const response = await request(app).get(`/holidayextras/v1/user/1`);
    expect(response.status).toBe(200);
  });

  it('show message if id not on the array', async () => {
    const response = await request(app).get(`/holidayextras/v1/user/3`);
    expect(response.status).toBe(400);
  });

  /**
   * INDEX
   */
  it('List All Users', async () => {
    const response = await request(app).get(`/holidayextras/v1/users/?page=1`);
    expect(response.status).toBe(200);
  });

  /**
   * DELETE
   */
  it('Delete User', async () => {
    const response = await request(app).delete(`/holidayextras/v1/user/1`);
    expect(response.status).toBe(200);
  });
});
