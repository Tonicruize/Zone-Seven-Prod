import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import videosRouter from "./videos";
import galleryRouter from "./gallery";
import storageRouter from "./storage";
import contactRouter from "./contact";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(videosRouter);
router.use(galleryRouter);
router.use(storageRouter);
router.use(contactRouter);

export default router;
