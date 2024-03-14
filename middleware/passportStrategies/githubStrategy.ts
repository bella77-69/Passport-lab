import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Request } from 'express';

import { getUserByGithubId, createUser } from '../../controllers/userController';


const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID || "",
        clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        callbackURL: "http://localhost:8000/auth/github/callback",
        passReqToCallback: true,
    },
    
    async (req: Request, accessToken: string, refreshToken: string, profile: any, done: (err?: Error | null, profile?: any) => void) => {
        try {
            const user = await getUserByGithubId(profile.id);
            if (user) {
                return done(null, user);
            }
            const newUser = await createUser(
                profile.displayName, 
                profile.id,
            );
            return done(null, newUser);
        } catch (error: any) {
            return done(error, null);
        }
    }
);


const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
