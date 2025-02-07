// const bcrypt = require('bcrypt');
const saltRounds = 10;
import * as bcrypt from 'bcrypt';

export const hashPassword = async (plainPassword: string) => {
  try {
    return await bcrypt.hash(plainPassword, saltRounds);
  } catch (err) {
    console.log(err);
  }
};

export const comparePassword = async (
  plainPassword: string,
  hashPassword: string,
) => {
  try {
    return await bcrypt.comparePassword(plainPassword, hashPassword);
  } catch (err) {
    console.log(err);
  }
};
