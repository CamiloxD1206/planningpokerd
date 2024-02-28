import Router from "express";
import { saveTask } from "../controllers/task.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router()

router.post('/task', authRequired, saveTask)

export default router;