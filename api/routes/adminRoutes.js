const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, checkRole } = require('../middleware/auth');

// Apply middleware to all admin routes
router.use(verifyToken);
router.use(checkRole(['Admin']));

// User routes
router.post('/users', adminController.createUser);
router.get('/users', adminController.getUsers);

// Subject routes
router.post('/subjects', adminController.createSubject);
router.get('/subjects', adminController.getSubjects);

// Grade routes
router.post('/grades', adminController.createGrade);
router.get('/grades', adminController.getGrades);
router.post('/grades/assign-teacher', adminController.assignTeacherToGrade);
router.post('/grades/assign-student', adminController.assignStudentToGrade);

module.exports = router;
