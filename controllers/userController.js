const dbUser = require('../models/users');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

//Beginning of userProfile API Endpoints.
const getUserProfile = async (req, res) => {
    try {       
        const userId = req.user.userId; 
        const user = await dbUser.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile: ', error);
        res.status(500).json({ message: 'Error fetching user profile' });
    }
};


const editUserProfileEmail = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userId = req.user.userId;
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is invalid' });
        }      

        const user = await dbUser.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.email = email;
        await user.save();

        res.json({ message: 'Email updated successfully' });
    } catch (error) {
        console.error('Error updating user email: ', error);
        res.status(500).json({ message: 'Error updating user email' });
    }
};


const editUserProfileName = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userId = req.user.userId;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        const user = await dbUser.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name; 
        await user.save(); 

        res.json({ message: 'Name updated successfully' });
    } catch (error) {
        console.error('Error updating user name: ', error);
        res.status(500).json({ message: 'Error updating user name' });
    }
};


const changeUserPassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const userId = req.user.userId;
        const { oldPassword, newPassword } = req.body; 

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: 'Old and new passwords are required' });
        }

        const user = await dbUser.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Old password is incorrect' });
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


const deleteUserAccount = async (req, res) => {
    try {
        const userId = req.user.userId;

        const result = await dbUser.findByIdAndDelete(userId);

        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Account successfully deleted' });
    } catch (error) {
        console.error('Error deleting user account: ', error);
        res.status(500).json({ message: 'Error deleting user account' });
    }
};


// Beginning of Dietary Restriction API End points.
const addDietaryRestriction = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { dietaryRestrictions } = req.body;

        const user = await dbUser.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        
        dietaryRestrictions.forEach(restriction => {
            if (!user.dietaryRestrictions.includes(restriction)) {
                user.dietaryRestrictions.push(restriction);
            }
        });

        await user.save();

        res.json({ message: 'Dietary restrictions updated successfully', dietaryRestrictions: user.dietaryRestrictions });
    } catch (error) {
        console.error('Error updating dietary restrictions: ', error);
        res.status(500).json({ message: 'Error updating dietary restrictions' });
    }
};


const removeDietaryRestriction = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { dietaryRestrictions } = req.body;

        const user = await dbUser.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.dietaryRestrictions = user.dietaryRestrictions.filter(r => !dietaryRestrictions.includes(r));
        await user.save();

        res.json({ message: 'Dietary restrictions removed successfully', dietaryRestrictions: user.dietaryRestrictions });
    } catch (error) {
        console.error('Error removing dietary restriction: ', error);
        res.status(500).json({ message: 'Error removing dietary restriction' });
    }
};


const clearDietaryRestriction = async (req, res) => {
    try {
        const userId = req.user.userId;

        const user = await dbUser.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.dietaryRestrictions = [];
        await user.save();

        res.json({ 
            message: 'All dietary restrictions cleared successfully',
            dietaryRestrictions: user.dietaryRestrictions
        });
    } catch (error) {
        console.error('Error clearing dietary restrictions: ', error);
        res.status(500).json({ message: 'Error clearing dietary restrictions' });
    }
};


module.exports = {
    getUserProfile,
    editUserProfileEmail,
    editUserProfileName,
    changeUserPassword,
    deleteUserAccount,
    addDietaryRestriction,
    removeDietaryRestriction,
    clearDietaryRestriction,
};
