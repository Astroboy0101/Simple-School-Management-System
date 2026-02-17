const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Role = require('./models/Role');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

dotenv.config();

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose.connect(process.env.MONGO_URI, clientOptions)
    .then(() => {
        console.log('MongoDB Connected');
        seedDB();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

const seedDB = async () => {
    try {
        // Clear existing data (optional, be careful)
        // await Role.deleteMany({});
        // await User.deleteMany({});

        // Create Roles
        const roles = ['Admin', 'Teacher', 'Student'];
        const roleDocs = [];

        for (const roleName of roles) {
            let role = await Role.findOne({ name: roleName });
            if (!role) {
                role = new Role({ name: roleName });
                await role.save();
                console.log(`Role ${roleName} created`);
            }
            roleDocs.push(role);
        }

        // Create Admin User
        const adminRole = await Role.findOne({ name: 'Admin' });
        const adminEmail = 'admin@school.com';
        let adminUser = await User.findOne({ email: adminEmail });

        if (!adminUser) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123', salt);

            adminUser = new User({
                name: 'System Admin',
                email: adminEmail,
                password: hashedPassword,
                role: adminRole._id
            });
            await adminUser.save();
            console.log('Admin user created: admin@school.com / admin123');
        } else {
            console.log('Admin user already exists');
        }

        console.log('Seeding completed');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
