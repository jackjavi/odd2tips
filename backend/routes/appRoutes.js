const appRoutes = require("../controllers/appController");
const { Router } = require("express");
const router = Router();

router.get("/status", appRoutes.getStatus);

module.exports = router;
