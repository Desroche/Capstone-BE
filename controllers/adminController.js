const dbUser = require('../models/users');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const changeUserPasswordByAdmin = async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    try {
        const { userEmail, newPassword } = req.body;

        
        if (!userEmail || !newPassword) {
            return res.status(400).json({ message: 'User email and new password are required' });
        }

        
        const user = await dbUser.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password: ', error);
        res.status(500).json({ message: 'Error changing password' });
    }
};

module.exports = { 
    changeUserPasswordByAdmin,
};

