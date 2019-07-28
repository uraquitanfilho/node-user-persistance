"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');
var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
require('express-group-routes');

const routes = new (0, _express.Router)();

routes.group('/holidayextras/v1', router => {
  router.get('/users', _UserController2.default.index);
  router.get('/user/:id', _UserController2.default.show);

  router.post('/user', _UserController2.default.store);
  router.put('/user/:id', _UserController2.default.update);
  router.delete('/user/:id', _UserController2.default.delete);
});
exports. default = routes;
