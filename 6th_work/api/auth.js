import { Router } from "express";
import Auth from '../models/auth';

const router = Router();

//로그인
router.post("/login", async(req, res) => {
  const { email, password } = req.body;
  if(await Post.findOne({where :{email : email}}))
  {
    if(await Post.findOne({where :{email : email}}))
    {
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
    }
    else{
      res.json({
        data: "Wrong Password",
      }); 
    }
    
  }
  else
  {
    res.json({
      data: "User is not exist",
    });  
  }
    
  });

  //회원가입
router.post("/register", async(req, res) => {
    const { email, password } = req.body;
  
    if(await Auth.findOne({where :{email : email}}))
    {
      res.json({
        data: "User already exist",
      }); 
    }
    else
    {
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
    }
    
  });

export default router;
