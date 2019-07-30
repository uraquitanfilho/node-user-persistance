"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _app = require('./app'); var _app2 = _interopRequireDefault(_app);

_app2.default.listen(process.env.APP_PORT);

global.users = [];
global.id = 0;
console.log('RUNNING ON', `${process.env.APP_URL}:${process.env.APP_PORT}`);
