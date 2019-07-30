/* eslint-disable use-isnan */
/* eslint-disable radix */
import * as Yup from 'yup';
import User from '../models/User';
import MAXPAGE from '../../config/params';

class UserController {
  async index(req, res) {
    const { page } = req.query;
    const maxPage = MAXPAGE;
    const offset = (page - 1) * maxPage;

    const all = await User.findAll();
    const data = all.slice(offset).slice(0, maxPage);

    const totalPage =
      all.length % maxPage === 0
        ? all.length / maxPage
        : parseInt(all.length / maxPage) + 1;
    return res.status(200).json({ page, totalPage, data });
  }

  async show(req, res) {
    const { id } = req.params;

    const item = await User.findOne(id);

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

    const result = await User.add(req.body);

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

    const result = await User.update(id, req.body);
    return res.status(result.status).json(result);
  }

  async delete(req, res) {
    const { id } = req.params;

    const d = await User.delete(id);

    return res.status(200).json({ message: 'Data Deleted', data: d });
  }
}

export default new UserController();
