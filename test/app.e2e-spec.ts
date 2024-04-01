import * as request from 'supertest';

describe('AppController (e2e)', () => {
  describe('orders', () => {
    it('/ (POST) 201', async () => {
      const body = {
        hotel_id: 'reddison',
        room_id: 'lux',
        email: 'guest@mail.ru',
        from: '2024-01-02T00:00:00Z',
        to: '2024-01-04T00:00:00Z',
      };

      const response = {
        hotel_id: 'reddison',
        room_id: 'lux',
        user_email: 'guest@mail.ru',
        from: '2024-01-02T00:00:00.000Z',
        to: '2024-01-04T00:00:00.000Z',
      };

      const res = await request(global.__APP.getHttpServer())
        .post('/orders')
        .send(body)
        .expect(201);

      expect(res.body).toEqual(response);
    });

    it('/ (POST) 400 (bad hotel_id)', async () => {
      const body = {
        hotel_id: 'reddisson',
        room_id: 'lux',
        email: 'guest@mail.ru',
        from: '2024-01-02T00:00:00Z',
        to: '2024-01-04T00:00:00Z',
      };

      request(global.__APP.getHttpServer())
        .post('/orders')
        .send(body)
        .expect(400);
    });

    it('/ (POST) 400 (bad room_id)', async () => {
      const body = {
        hotel_id: 'reddison',
        room_id: 'mux',
        email: 'guest@mail.ru',
        from: '2024-01-02T00:00:00Z',
        to: '2024-01-04T00:00:00Z',
      };

      request(global.__APP.getHttpServer())
        .post('/orders')
        .send(body)
        .expect(400);
    });

    it('/ (POST) 400 (bad email)', async () => {
      const body = {
        hotel_id: 'reddison',
        room_id: 'lux',
        email: 'guest',
        from: '2024-01-02T00:00:00Z',
        to: '2024-01-04T00:00:00Z',
      };

      request(global.__APP.getHttpServer())
        .post('/orders')
        .send(body)
        .expect(400);
    });

    it('/ (POST) 400 (bad from)', async () => {
      const body = {
        hotel_id: 'reddison',
        room_id: 'lux',
        email: 'guest@mail.ru',
        from: '2024',
        to: '2024-01-04T00:00:00Z',
      };

      request(global.__APP.getHttpServer())
        .post('/orders')
        .send(body)
        .expect(400);
    });

    it('/ (POST) 400 (bad to)', async () => {
      const body = {
        hotel_id: 'reddison',
        room_id: 'lux',
        email: 'guest@mail.ru',
        from: '2024-01-04T00:00:00Z',
        to: '2024',
      };

      request(global.__APP.getHttpServer())
        .post('/orders')
        .send(body)
        .expect(400);
    });

    it('/ (POST) 409 (unavailable dates)', async () => {
      const body = {
        hotel_id: 'reddison',
        room_id: 'lux',
        email: 'guest@mail.ru',
        from: '2025-01-02T00:00:00Z',
        to: '2025-01-04T00:00:00Z',
      };

      request(global.__APP.getHttpServer())
        .post('/orders')
        .send(body)
        .expect(409);
    });
  });
});
