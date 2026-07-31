import { Router, type IRouter } from "express";
import { AdminLoginBody, AdminLoginResponse } from "@workspace/api-zod";
import { signAdminToken } from "../lib/adminAuth";

const router: IRouter = Router();

router.post("/auth/login", async (req, res): Promise<void> => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Missing password" });
    return;
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    req.log.error("ADMIN_PASSWORD secret is not set");
    res.status(500).json({ error: "Server misconfiguration" });
    return;
  }

  if (parsed.data.password !== adminPassword) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }

  const token = signAdminToken();
  res.json(AdminLoginResponse.parse({ token }));
});

export default router;
