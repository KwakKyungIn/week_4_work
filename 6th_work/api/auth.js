import { Router } from "express";
import Auth from '../models/auth';

const router = Router();

//로그인
router.post("/login", async(req, res) => {
  const { email, password } = req.body;
    const authDatas = await Auth.findAll({
      attributes: ['id'], 
      where:{
        email : email,
        password : password,
      }
     });
    res.json({
      data: authDatas}
      )
  });

  //회원가입
router.post("/register", async(req, res) => {
    const { email, password } = req.body;
    await Auth.create({
      email : email,
      password : password,
    })

    const authDatas = await Auth.findAll({ 
      attributes: ['id'],
      where:{
        email : email,
        password : password,
      }
     });

    res.json({
      data: authDatas}
      )


  });





export default router;
