import {userModel} from "../models/userModel";

const getUserByEmailIdAndPassword = (email: string, password: string) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};

function isUserValid(user: any, password: string) {
  return user.password === password;
}

const getUserById = (id:any) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

//get by email
const getUserByEmail = (email: string) => {
  let user = userModel.findByEmail(email);
  if (user) {
    return user;
  }
  return null;
};

//new github user
const createUser = (name: string, githubId: number) => {
  let user = userModel.createUser(name, githubId);
  if (user) {
    return user;
  }
  return null;
}

//get by github id
const getUserByGithubId = (gitId: number) => {
  try {
      const user = userModel.findByGithubId(gitId);
      return user || null;
  } catch (error) {
      return null; 
  }
};

export {
  getUserByEmailIdAndPassword,
  getUserById,
  getUserByEmail,
  createUser,
  getUserByGithubId,
};
