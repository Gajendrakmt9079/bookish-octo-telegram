import { Router } from "express";
import {
  registerUser,
  loginUser,
  logOutuser,
  refreshAccessToken,
  getUserProfile,
  changeCurrentpassword,
  updateprofiledetaiols,
  updateuserAvatar,
  updateusercoverImage,
  getUserChannelprofile,
  userWatchHistory,
} from "../controllers/User.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logOutuser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentpassword);
router.route("/profile").get(verifyJWT, getUserProfile);
router.route("/updateuser").patch(verifyJWT, updateprofiledetaiols);
router
  .route("/updateavatar")
  .patch(verifyJWT, upload.single("avatar"), updateuserAvatar);
router
  .route("/updatecover")
  .patch(verifyJWT, upload.single("coverImage"), updateusercoverImage);

router.route("/channel/:username").get(verifyJWT, getUserChannelprofile);

router.route("/history").get(verifyJWT, userWatchHistory);

export default router;
