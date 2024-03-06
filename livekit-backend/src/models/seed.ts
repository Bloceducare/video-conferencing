import User from './user';
import { logger, env } from '../config';

const { SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASSWORD, NODE_ENV } = env;

const data = [];

for (let i = 0; i < 3; i++) {
  data.push({
    email: `user${i + 1}@gmail.com`,
    password: 'password',
    role: {
      super: false,
      admin: false,
      user: i < 2 ? false : true,
    },
  });
}

const users = [...data];

const admins = [
  {
    email: 'ayodeji@web3bridge.com',
    password: 'password@123',
    role: {
      super: false,
      admin: true,
      user: false,
      student: false,
    },
    signupType: {
      email: true,
    },
  },
];

const superAdmin = {
  email: SUPER_ADMIN_EMAIL,
  password: SUPER_ADMIN_PASSWORD,
  role: {
    super: true,
    admin: true,
    user: false,
    student: false,
  },
  signupType: {
    email: true,
  },
};

export const seedUsers = async () => {
  try {
    await User.deleteMany({});

    await User.insertMany(users);

    logger('seedUsers', 'Users seeded successfully :)');
  } catch (err) {
    console.log(err);
    logger('seedUsers', 'Error seeding users :(');
  }
};

export const seedAdmins = async () => {
  try {
    const allAdmins = [...admins, superAdmin];
    
    for await (const admin of allAdmins) {

      const existingAdmin = await User.findOne({ email: admin.email });

      if (NODE_ENV !== 'production') {
        if (!existingAdmin) {
          logger('seedAdmins', `Creating admin: ${admin.email}`);
          await User.create(admin);
        } else {
           await User.deleteOne({ email: admin.email });
           logger('seedAdmins', `Admin: ${admin.email} deleted`);
           await User.create(admin);
        }
      } else {
        if (!existingAdmin) {
          logger('seedAdmins', `Creating admin: ${admin.email}`);
          await User.create(admin);
        }
      }
    };
    logger('seedAdmins', 'Admins seeded successfully :)');
  } catch (err) {
    console.log(err);
    logger('seedAdmins', 'Error seeding admins :(');
  }
};