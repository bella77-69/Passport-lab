import express from "express";
import passport from "passport";
import {
  forwardAuthenticated
} from "../middleware/checkAuth";

const router = express.Router();

//*NOTE - github strategy routes
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/login" }),
  function (req, res) {
    // This function will only be called on successful authentication
    res.redirect("/dashboard");
  }
);

router.get("/login", forwardAuthenticated, (req, res) => {
  res.render("login", { messages: req.flash("error") });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

//create user route
router.get('/register', (req, res) => {  
  res.render('register');
}
);

router.post('/register', (req, res) => {
  console.log(req.body);
  res.send('User created');
});
  


export default router;
