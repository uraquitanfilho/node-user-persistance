/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable radix */
import cache from '../../cache/Cache';

class User {
  constructor() {
    if (!cache.get('users')) {
      cache.set('id', 0);
      cache.set('users', '[]');
    }
  }

  findAll() {
    return JSON.parse(cache.get('users'));
  }

  async findOne(id) {
    const item = await JSON.parse(cache.get('users')).filter(elem => {
      return parseInt(elem.id) === parseInt(id);
    });

    return item;
  }

  async add(item) {
    if (await this.checkDuplicateEmail(item.email, 0)) {
      return { status: 400, message: 'duplicate e-mail not allowed', data: {} };
    }
    let id = cache.get('id');

    id += 1;
    item.id = id;
    cache.set('id', id);
    const timestamp = new Date().toString();
    item.createAt = timestamp;
    item.updatedAt = timestamp;
    const users = JSON.parse(cache.get('users'));
    users.push(item);
    cache.set('users', JSON.stringify(users));
    return {
      status: 200,
      message: 'User successfuly added',
      data: item,
    };
  }

  async update(id, item) {
    if (await this.checkDuplicateEmail(item.email, id)) {
      return { status: 400, message: 'duplicate e-mail not allowed', data: {} };
    }
    let indexItem = 0;
    let isUpdated = false;
    const users = JSON.parse(cache.get('users'));
    await users.map((elem, index) => {
      if (parseInt(elem.id) === parseInt(id)) {
        users[index] = {
          ...users[index],
          updatedAt: new Date().toString(),
          email: item.email ? item.email : elem.email,
          familyName: item.familyName ? item.familyName : elem.familyName,
          givenName: item.givenName ? item.givenName : elem.givenName,
        };
        indexItem = index;
        isUpdated = true;
      }
    });

    if (isUpdated) {
      cache.set('users', users);
      return {
        status: 200,
        message: 'data updated',
        data: users[indexItem],
      };
    }
    return {
      status: 400,
      message: 'No value updated',
      data: {},
    };
  }

  async delete(id) {
    let users = JSON.parse(cache.get('users'));
    users = await users.filter(elem => parseInt(elem.id) !== parseInt(id));
    cache.set('users', JSON.stringify(users));
    return users;
  }

  async checkDuplicateEmail(email, id) {
    if (email === undefined) return false;
    const users = JSON.parse(cache.get('users'));
    const tot = await users.filter(elem => {
      return elem.email === email;
    });
    if (tot.length > 0 && parseInt(tot[0].id) !== parseInt(id)) {
      return true;
    }

    return false;
  }
}

export default new User();
