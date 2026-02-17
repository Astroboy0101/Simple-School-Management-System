const Mark = require('../models/Mark');
const Grade = require('../models/Grade');
const User = require('../models/User'); // For verification if needed

exports.addMark = async (req, res) => {
    try {
        const { studentId, subjectId, gradeId, marks } = req.body;
        const teacherId = req.user._id;

        // Verify teacher is assigned to this grade (Optional but good practice)
        const grade = await Grade.findById(gradeId);
        if (!grade) {
            return res.status(404).json({ message: 'Grade not found' });
        }
        // If strict verification is needed:
        // if (!grade.teachers.map(t => t.toString()).includes(teacherId)) {
        //     return res.status(403).json({ message: 'You are not assigned to this grade' });
        // }

        const newMark = new Mark({
            student: studentId,
            subject: subjectId,
            grade: gradeId,
            marks,
            teacher: teacherId
        });

        await newMark.save();
        res.status(201).json({ message: 'Mark assigned successfully', mark: newMark });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAssignedGrades = async (req, res) => {
    try {
        const teacherId = req.user._id;
        const grades = await Grade.find({ teachers: teacherId }).populate('students', 'name email').populate('teachers', 'name');
        res.json(grades);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getMarksByGrade = async (req, res) => {
    try {
        const { gradeId } = req.params;
        const marks = await Mark.find({ grade: gradeId }).populate('student', 'name').populate('subject', 'name');
        res.json(marks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
