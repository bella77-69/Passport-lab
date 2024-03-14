import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  getUserByEmailIdAndPassword,
  getUserById,
} from "../../controllers/userController";
import { PassportStrategy } from "../../interfaces/index";

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    
  },
  async (email, password, done) => {
    try {
      const  user: Express.User | null = await getUserByEmailIdAndPassword(email, password);
      if ( user ) {
        done(null, user);
      } else {
        done(null, false, { message: "Invalid email or password" });
      }
    } catch (error: any) {
      done(null, false, { message: error.message });
    }
  }
);

passport.serializeUser(function (user: Express.User, done: (err: any, id?: number) => void) {
  done(null, user.id);
});

passport.deserializeUser(function (id: number, done: (err: any, user?: Express.User | false | null) => void) {
  try {
    const user = getUserById(id);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error: any) {
    done(error, false);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: "local",
  strategy: localStrategy,
};

export default passportLocalStrategy;
