import express from 'express';
import Hello from "./hello.js"
import Lab5 from "./lab5.js";
import mongoose from "mongoose";
// mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
import session from "express-session";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
mongoose.connect(CONNECTION_STRING).then(() => console.log("Connected to MongoDB"));    
import UserRoutes from './users/routes.js';
import cors from "cors";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from './modules/routes.js';
import AssignmentRoutes from './assignments/routes.js';
// import "dotenv/config.js";
import "dotenv/config.js";
const app = express();
app.use(cors(
    {
        credentials: true,
        origin: process.env.FRONTEND_URL
    }
));

// app.use(cors({
//     credentials: true,
//     origin: process.env.FRONTEND_URL
// }
// ));
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        secure: true,
        sameSite: "none"
    }
}

app.use(session(sessionOptions));
app.use(express.json());
UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
Lab5(app);
Hello(app)
app.listen(process.env.PORT || 4000);