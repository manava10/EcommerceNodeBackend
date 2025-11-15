const express = require('express');
const router = express.Router();

const adminMiddleware = require("../middleware/role.middleware");
const adminController = require("../controllers/admin.Controllers")
router.use(adminMiddleware.adminRole);
router.get("/admin",adminMiddleware.adminRole,adminController.adminFunction);
//So, yeah all well.
module.exports = router;