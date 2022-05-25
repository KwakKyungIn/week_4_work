import { Router } from "express";

const router = Router();

let nextId = 1; 

let users = [ ];


router.post("/login", (req, res) => {
    const index = users.findIndex(user => user.email === req.body.email);
    if (index === -1) { 
      return res.json({
        error: "User not exist",
      });
    }
    res.json(users.filter(user => user.email === req.body.email)[0]);
  });

  router.post("/register", (req, res) => {
    
  
    users.push({
        id: nextId++, 
        email: req.body.email, 
        password : req.body.password,
      });
      res.json(users.filter(user => user.email === req.body.email)[0]);

  });





export default router;
