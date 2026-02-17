const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { verifyToken, checkRole } = require('../middleware/auth');

router.use(verifyToken);
router.use(checkRole(['Teacher', 'Admin'])); // Admins can also act as teachers if needed

router.post('/marks', teacherController.addMark);
router.get('/grades', teacherController.getAssignedGrades); // Grades assigned to this teacher
router.get('/marks/:gradeId', teacherController.getMarksByGrade);

module.exports = router;
