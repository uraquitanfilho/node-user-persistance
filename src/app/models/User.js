/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable radix */
class User {
  constructor(data, max) {
    this.users = data; // persistance array of users
    this.max = max; // persistance id
  }

  findAll() {
    return this.users;
  }

  async findOne(id) {
    const item = await this.users.filter(elem => {
      return parseInt(elem.id) === parseInt(id);
    });

    return item;
  }

  async add(item) {
    if (await this.checkDuplicateEmail(item.email, 0)) {
      return { status: 400, message: 'duplicate e-mail not allowed', data: {} };
    }

    item.id = this.max;
    const timestamp = new Date().toString();
    item.createAt = timestamp;
    item.updatedAt = timestamp;
    this.users.push(item);
    return {
      status: 200,
      message: 'User successfuly added',
      data: this.users[0],
    };
  }

  async update(id, item) {
    if (await this.checkDuplicateEmail(item.email, id)) {
      return { status: 400, message: 'duplicate e-mail not allowed', data: {} };
    }
    let indexItem = 0;
    let isUpdated = false;
    await this.users.map((elem, index) => {
      if (parseInt(elem.id) === parseInt(id)) {
        this.users[index] = {
          ...this.users[index],
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
        data: this.users[indexItem],
      };
    }
    return {
      status: 400,
      message: 'No value updated',
      data: {},
    };
  }

  async delete(id) {
    this.users = await this.users.filter(
      elem => parseInt(elem.id) !== parseInt(id)
    );
    return this.users;
  }

  async checkDuplicateEmail(email, id) {
    if (email === undefined) return false;

    const tot = await this.users.filter(elem => {
      return elem.email === email;
    });
    if (tot.length > 0 && parseInt(tot[0].id) !== parseInt(id)) {
      return true;
    }

    return false;
  }
}

export default User;
