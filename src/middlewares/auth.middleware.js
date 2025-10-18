import { User } from "../models/user.model.js";
import { ApiError } from "../utils/Apierror.js";
import { asynchandler } from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asynchandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");

    if (!token) {
      throw new ApiError(401, "unauthozation failed");
    }

    const decodetoken = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decodetoken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "INvailid user !");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "invaild token");
  }
});
