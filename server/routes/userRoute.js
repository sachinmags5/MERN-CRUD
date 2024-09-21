import express from "express";
import {create,getAllUsers, getUserById, updateUser,deleteUser} from "../controller/userController.js";

const route = express.Router();

route.post("/user",create);
route.get("/allUsers",getAllUsers);
route.get("/getUserById/:id",getUserById);
route.put("/updateUser/:id",updateUser);
route.delete("/deleteUser/:id",deleteUser);

export default route;