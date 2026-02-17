const User = require('../models/User');
const Subject = require('../models/Subject');
const Grade = require('../models/Grade');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');

// User Management
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, roleName } = req.body;

        const emailExist = await User.findOne({ email });
        if (emailExist) return res.status(400).json({ message: 'Email already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const role = await Role.findOne({ name: roleName });
        if (!role) return res.status(400).json({ message: 'Invalid Role' });

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: role._id
        });

        await user.save();
        res.status(201).json({ message: 'User created successfully', user: { id: user._id, name: user.name, email: user.email, role: role.name } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        // diverse filtering can be added here
        const users = await User.find().populate('role', 'name');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Subject Management
exports.createSubject = async (req, res) => {
    try {
        const { name, description } = req.body;
        const subject = new Subject({ name, description });
        await subject.save();
        res.status(201).json(subject);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.json(subjects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Grade Management
exports.createGrade = async (req, res) => {
    try {
        const { name } = req.body;
        const grade = new Grade({ name });
        await grade.save();
        res.status(201).json(grade);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getGrades = async (req, res) => {
    try {
        const grades = await Grade.find().populate('teachers', 'name').populate('students', 'name');
        res.json(grades);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.assignTeacherToGrade = async (req, res) => {
    try {
        const { gradeId, teacherId } = req.body;
        const grade = await Grade.findById(gradeId);
        if (!grade) return res.status(404).json({ message: 'Grade not found' });

        // Check if teacher exists and has proper role?
        // Assuming teacherId is valid for now.
        if (!grade.teachers.some(t => t.toString() === teacherId)) {
            grade.teachers.push(teacherId);
            await grade.save();
        }
        res.json(grade);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.assignStudentToGrade = async (req, res) => {
    try {
        const { gradeId, studentId } = req.body;
        const grade = await Grade.findById(gradeId);
        if (!grade) return res.status(404).json({ message: 'Grade not found' });

        if (!grade.students.some(s => s.toString() === studentId)) {
            grade.students.push(studentId);
            await grade.save();
        }
        res.json(grade);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
