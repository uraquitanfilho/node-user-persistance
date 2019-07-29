"use strict";Object.defineProperty(exports, "__esModule", {value: true});/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable radix */
class User {
  constructor() {
    if (!global.users) {
      global.users = [];
      global.id = 0;
    } // persistance array of users
  }

  findAll() {
    return global.users;
  }

  async findOne(id) {
    const item = await global.users.filter(elem => {
      return parseInt(elem.id) === parseInt(id);
    });

    return item;
  }

  async add(item) {
    if (await this.checkDuplicateEmail(item.email, 0)) {
      return { status: 400, message: 'duplicate e-mail not allowed', data: {} };
    }

    global.id += 1;
    item.id = global.id;
    const timestamp = new Date().toString();
    item.createAt = timestamp;
    item.updatedAt = timestamp;
    global.users.push(item);
    return {
      status: 200,
      message: 'User successfuly added',
      data: global.users[0],
    };
  }

  async update(id, item) {
    if (await this.checkDuplicateEmail(item.email, id)) {
      return { status: 400, message: 'duplicate e-mail not allowed', data: {} };
    }
    let indexItem = 0;
    let isUpdated = false;
    await global.users.map((elem, index) => {
      if (parseInt(elem.id) === parseInt(id)) {
        global.users[index] = {
          ...global.users[index],
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
      return {
        status: 200,
        message: 'data updated',
        data: global.users[indexItem],
      };
    }
    return {
      status: 400,
      message: 'No value updated',
      data: {},
    };
  }

  async delete(id) {
    global.users = await global.users.filter(
      elem => parseInt(elem.id) !== parseInt(id)
    );
    return global.users;
  }

  async checkDuplicateEmail(email, id) {
    if (email === undefined) return false;

    const tot = await global.users.filter(elem => {
      return elem.email === email;
    });
    if (tot.length > 0 && parseInt(tot[0].id) !== parseInt(id)) {
      return true;
    }

    return false;
  }
}

exports. default = User;
