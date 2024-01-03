import express from 'express';
import {userRegistration, loginUser, createData, getUserData, deleteData,editData} from "../controllers/user.js"
const router = express.Router();

router
.route("/register")
.post(userRegistration)

router
.route("/login")
.post(loginUser)


router
.route("/data-add")
.post(createData)

router
    .route("/data/:id") // Update the route to include the id parameter
    .get(getUserData);

    router
    .route("/delete/:id")
    .delete(deleteData);

    router
    .route("/edit/:id")
    .put(editData);

export default router
