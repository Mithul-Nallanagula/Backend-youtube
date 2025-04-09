import express from "express";
import { login , signup , getuserController } from "../controller/authcontroller.js";

const authrouter = express.Router();

authrouter.post("/signup" , signup )
authrouter.post("/login" , login)
authrouter.get("/getuser" , getuserController)

export default authrouter
