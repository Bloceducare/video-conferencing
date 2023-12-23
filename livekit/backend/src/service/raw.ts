const data = [];

for (let i = 0; i < 3; i++) {
  data.push({
    email: `user${i + 1}@gmail.com`,
    password: 'password',
    nickname: `user${i + 1}`,
    role: {
      super: false,
      admin: false,
      user: i < 2 ? false : true,
    },
  });
}

export const users = [...data];
