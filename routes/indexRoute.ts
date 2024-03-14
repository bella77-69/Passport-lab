import session from "express-session";
import express, { Request, Response } from "express";
const router = express.Router();
import { ensureAuthenticated, adminRole } from "../middleware/checkAuth";

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

//admin route
router.get("/admin", ensureAuthenticated, adminRole, async (req: Request, res: Response) => {
  try {
    // Creating empty list to store the session info
    const listSessions: { id: string; user: number; }[] = [];

    // Access session store from the request
    const store: Express.SessionStore | undefined = req.sessionStore;

    // fetch sessions from the store
    const sessions = await new Promise<void>((resolve, reject) => {
      store.all!((err: any, sessions: session.SessionData[] | { [id: string]: session.SessionData } | null | undefined) => {
        if (err) {
          reject(err);
          // if sessions are available loop through them
        } else if (typeof sessions === 'object' && sessions !== null) {
          // looping
          const sessionKeys = Object.keys(sessions as { [id: string]: session.SessionData });
          // get user info from session
          sessionKeys.forEach((sessionId) => {
            
            const session = (sessions as { [id: string]: session.SessionData })[sessionId];
            const { passport } = session;
      
            if (passport && passport.user) {
              // add session info to the list
              listSessions.push({ id: sessionId, user: passport.user });
            }
          });
          resolve();
        } else {
          reject(new Error("Session data is not in expected format"));
        }
      });
    });

    // render admin page with user info and sessions list
    res.render("admin", {
      user: req.user,
      sessions: listSessions,
    });
  } catch (err) {
    // error handling
    req.flash('error message', 'An error occurred when loading the sessions');
    res.redirect("/admin");
  }
});

// revoke session route
router.get("/admin/revoke/:sessionId", ensureAuthenticated, adminRole, (req: Request, res: Response) => {
  const sessionId: string = req.params.sessionId;

  // Destroy the session with the provided session ID
  req.sessionStore.destroy(sessionId, (err) => {
      if (err) {
        //error handling
          console.error("Error revoking session:", err);
          res.status(500).send("Error revoking session");
      } else {
          res.redirect("/admin"); 
      }
  });
});


export default router;