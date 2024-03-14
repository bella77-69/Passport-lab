const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    githubId: 123456,
    role: 'admin'
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    githubId: 987654,
    role: 'user'
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    githubId: 852639,
    role: 'user'
  },
];

const userModel = {

  /* FIXED */
  findOne: (email: string) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  /* FIXED*/
  findById: (id: number) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },

  //find by email
  findByEmail: (email: string) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },

  //create user
  createUser: (name: string, githubId : number ) => {
    const newUser = {
      id: database.length + 1,
      name: name,
      email: "",
      password: "",
      githubId: githubId,
      role: 'user '
    };
    return newUser;
  },

  //fing by github id
  findByGithubId: (gitId: number) => {
    const user = database.find((user) => user.githubId === gitId);
    if (user) {
        return user;
    }
    throw new Error(`Couldn't find user with GitHub ID: ${gitId}`);
},
};

export { database, userModel };
