import User from './user';
import { logger } from '../config';
import { users } from '../service';

export const seedUsers = async () => {
  try {
    await User.deleteMany({});

    await User.insertMany(users);

    logger('seedUsers', 'Users seeded successfully :)');
  } catch (err) {
    console.log(err); // leave this for debugging
    logger('seedUsers', 'Error seeding users :(');
  }
};
