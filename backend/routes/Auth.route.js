import express from 'express';
import { getUser,login, logout } from '../controllers/Auth.controller.js';
const AuthRoute=express.Router();

AuthRoute.post('/google-login',login)
AuthRoute.get('/get-user',getUser)
AuthRoute.post('/logout',logout)
export default AuthRoute;