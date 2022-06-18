import request from 'supertest';
import { server } from '../src/app';

describe('First scenario', () => {

  let ids: any = [];

  beforeAll(done => {
    done();
  });

  afterAll(done => {
    server.close();
    done();
  });

  it('it should return empty file', async () => {
      const res = await request(server)
          .get('/users');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('it should return add new user', async () => {
    const res = await request(server)
        .post('/users')
        .send({username: 'Vasja', age: 10, hobbies:['run']});
    ids.push(res.body.id);
    expect(res.body.username).toBe('Vasja');
  });

  it('it should return add second user', async () => {
    const res = await request(server)
        .post('/users')
        .send({username: 'Katja', age: 18, hobbies:['read']});
    ids.push(res.body.id);
    expect(res.body.age).toBe(18);
  });

  it('it should return delete second user', async () => {
    const res = await request(server)
        .delete(`/users/${ids[1]}`);
    ids.pop();
    expect(res.statusCode).toBe(204);
  });

  it('it should return all user', async () => {
    const res = await request(server)
        .get('/users');
    expect(res.body.length).toBe(1);
  });
});

describe('Second scenario', () => {

  let ids: any = [];

  beforeAll(done => {
    done();
  });

  afterAll(done => {
    server.close();
    done();
  });

  it('it should return add new user', async () => {
    const res = await request(server)
        .post('/users')
        .send({username: 'Vasja', age: 10, hobbies:['run']});
    ids.push(res.body.id);
    expect(res.body.age).toBe(10);
  });

  it('it should changed user 1', async () => {
    const res = await request(server)
        .put(`/users/${ids[0]}`)
        .send({username: 'Katja', age: 18, hobbies:['read']});
    expect(res.body.username).toBe('Katja');
  });

  it('it should return user for id', async () => {
    const res = await request(server)
        .get(`/users/${ids[0]}`);
    expect(res.body.hobbies).toEqual(['read']);
  });

  it('it should get all user', async () => {
    const res = await request(server)
        .get('/users');
    expect(res.body[1]).toEqual({username: 'Katja', age: 18, hobbies:['read'], id: ids[0]});
  });
});

describe('Third scenario', () => {

  let ids: any = [];

  beforeAll(done => {
    done();
  });

  afterAll(done => {
    server.close();
    done();
  })

  it('it should return add new user', async () => {
    const res = await request(server)
        .post('/users')
        .send({username: 'Fedya', age: 30, hobbies:['run', 'read']});
    ids.push(res.body.id);
    expect(res.body.hobbies.length).toBe(2);
  });

  it('it should return error not correct id', async () => {
    const res = await request(server)
        .get(`/users/${ids[0]}1`);
    expect(res.body.message).toBe(`Your id (${ids[0]}1) not valid`);
  });

  it('it should return error page not found', async () => {
    const res = await request(server)
        .get('/users/asfsaf/asfa');
    expect(res.body.message).toBe(`Page not found`);
  });

  it('it should return error not elem', async () => {
    let idNotCorrect = ids[0].slice(2, ids[0].length);
    idNotCorrect = '12' + idNotCorrect;
    const res = await request(server)
        .get(`/users/${idNotCorrect}`);
    expect(res.body.message).toBe(`Your id (${idNotCorrect}) not found`);
  });

  it('it should return not correct request', async () => {
    const res = await request(server)
        .put(`/users/${ids[0]}`)
        .send({username: 'Katja', hobbies:['read']});
    expect(res.body.message).toBe(`Your request has not all required field`);
  });
});
