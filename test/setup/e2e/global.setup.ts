function defineProcessContext() {
  process.env['PORT'] = '8080';
  process.env['HOST'] = 'localhost';
}

module.exports = async function globalSetup() {
  defineProcessContext();
};
