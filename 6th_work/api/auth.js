import { Router } from "express";
import Auth from '../models/auth';
import { sign } from 'jsonwebtoken';
const router = Router();

//로그인
router.post("/login", async(req, res) => {
  const { email, password } = req.body;
  if(await Auth.findOne({where :{email : email}}))
  {
    if(await Auth.findOne({where :{password : password}}))
    {
      const token = sign({
        email: req.body.email,
        password: req.body.password,
      }, 
      process.env.JWT_SECRET, 
      {
        expiresIn: '10m',
        issuer: 'JWT_study',
      });
      return res.json({
        code: 200,
        message: '토큰이 발급되었습니다',
        token,
      });


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

    if(!email && !password) 
    {
      return res.json("정상적인 요청이 아닙니다.")
    }
    if(await Auth.findOne({where :{email : email}}))
    {
      res.json({
        data: "User already exist",
      }); 
    }
    else
    {
      const hash = await bcrypt.hash(password, 12);
      await Auth.create({
        email : email,
        password : hash,
      })

      const authDatas = await Auth.findAll({ 
        attributes: ['id'],
        where:{
          email : email,
        }
       });
  
      res.json({
        data: authDatas}
        )
    }
    
  });

export default router;
