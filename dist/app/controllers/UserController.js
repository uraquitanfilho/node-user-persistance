"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});/* eslint-disable use-isnan */
/* eslint-disable radix */
var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _params = require('../../config/params'); var _params2 = _interopRequireDefault(_params);

class UserController {
  async index(req, res) {
    const { page } = req.query;
    const maxPage = _params2.default;
    const offset = (page - 1) * maxPage;

    const all = await _User2.default.findAll();
    const data = all.slice(offset).slice(0, maxPage);

    const totalPage =
      all.length % maxPage === 0
        ? all.length / maxPage
        : parseInt(all.length / maxPage) + 1;
    return res.status(200).json({ page, totalPage, data });
  }

  async show(req, res) {
    const { id } = req.params;

    const item = await _User2.default.findOne(id);

    if (item.length > 0) {
      const { email } = item[0];
      return res.status(200).json({ id, email });
    }
    return res.status(400).json({ message: 'No data available', data: [] });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email('E-mail must be a valid email')
        .required('E-mail is required'),
      givenName: Yup.string().required('Given Name is required'),
      familyName: Yup.string().required('Family Name is required'),
    });

    await schema.validate(req.body).catch(err => {
      return res.status(400).json({ message: err.errors });
    });

    const result = await _User2.default.add(req.body);

    return res.status(result.status).json(result);
  }

  async update(req, res) {
    let { id } = req.params;
    id = id.replace(/\D/g, ''); // remove string.
    if (id.trim() === '') {
      return res.status(400).json({ message: 'Invalid ID. Allow only number' });
    }

    const schema = Yup.object().shape({
      email: Yup.string().email('E-mail must be a valid email'),
      givenName: Yup.string(),
      familyName: Yup.string(),
    });

    await schema.validate(req.body).catch(err => {
      return res.status(400).json({ message: err.errors });
    });

    const result = await _User2.default.update(id, req.body);
    return res.status(result.status).json(result);
  }

  async delete(req, res) {
    const { id } = req.params;

    const d = await _User2.default.delete(id);

    return res.status(200).json({ message: 'Data Deleted', data: d });
  }
}

exports. default = new UserController();
