import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../../../src/app.module';
import { validationPipe } from '../../../src/common/validation/validation.pipe';

beforeEach(async function () {
  try {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const app = moduleFixture.createNestApplication();
    global.__APP = app;

    app.useGlobalPipes(validationPipe);

    await app.init();
  } catch (error) {
    // eslint-disable-next-line
    console.log(error);
  }
});

afterEach(async () => {
  await global.__APP.close();
});
