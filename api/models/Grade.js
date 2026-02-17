const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    teachers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Grade', gradeSchema);
