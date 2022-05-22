import express from "express";
import { Router } from "express";
import Student from "../models/student";
const authRouter = Router();
const app = express();
const port = 3000;

const { sequelize } = require("../models");

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/api", authRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

authRouter.use("/api", authRouter);

authRouter.post("/", (req, res) => {

    const { name, number } = req.body;
    
    Student.create({
        name: name,
        number : number,
    });

    return res.Student.fialdAll({});
    
});

  
