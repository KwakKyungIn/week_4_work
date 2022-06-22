import { Router } from "express";
import posts from "./posts";
import auth from "./auth";
import cors from "cors";


const cors = require('cors');
const router = Router();

router.use("/posts", posts);
router.use("/auth", auth);

postRouter.use(cors({
    origin: "http://localhost:4000",
  }));

  app.use(cors(corsOptions))

export default router;
