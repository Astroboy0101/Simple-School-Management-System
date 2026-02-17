const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { verifyToken, checkRole } = require('../middleware/auth');

router.use(verifyToken);
router.use(checkRole(['Student', 'Admin']));

router.get('/my-marks', studentController.getMyMarks);

module.exports = router;
