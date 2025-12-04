import { Router } from "express";
import { AuthRequest, verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.get("/", verifyToken, (req: AuthRequest, res)=>{
    res.json({
        message: "Todo correcto guape",
        user: req.user
    })
})

export default router;