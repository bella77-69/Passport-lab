import { NextFunction, Request, Response } from "express";
/*
FIXED
*/
export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
};

/*
FIXED
*/
export const forwardAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/dashboard");
};

//admin role
export const adminRole = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated() && req.user.role === "admin") {
    return next();
  }
};

//create user
export const createUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
};