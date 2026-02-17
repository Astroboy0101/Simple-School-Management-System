const Mark = require('../models/Mark');

exports.getMyMarks = async (req, res) => {
    try {
        const studentId = req.user._id;
        const marks = await Mark.find({ student: studentId }).populate('subject', 'name description').populate('teacher', 'name');
        res.json(marks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
