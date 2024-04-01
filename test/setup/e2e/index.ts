declare global {
  type TApp = import('@nestjs/common').INestApplication;

  // eslint-disable-next-line
  var __APP: TApp;
}

export = global;
