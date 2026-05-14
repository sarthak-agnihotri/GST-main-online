const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '30d',
    });
};


const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please add all fields' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Please provide a valid email address' });
        }

        // Validate password strength
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        // Check if user exists
        const userExists = await User.findOne({ email: email.toLowerCase().trim() });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user
        // Super Admin Logic: If email is test@lpu.in, make them admin
        const role = email.toLowerCase().trim() === 'test@lpu.in' ? 'admin' : 'user';

        const user = await User.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password, // Will be hashed by pre-save middleware
            role,
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        // Check for user email (case-insensitive)
        const user = await User.findOne({ email: email.toLowerCase().trim() });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            businessName: user.businessName,
            businessType: user.businessType,
            industry: user.industry,
            businessAddress: user.businessAddress,
            phone: user.phone,
            alternateEmail: user.alternateEmail,
            panNumber: user.panNumber,
            registrationDate: user.registrationDate,
            gstin: user.gstin,
            gstRegistrationDate: user.gstRegistrationDate,
            stateOfRegistration: user.stateOfRegistration,
            businessConstitution: user.businessConstitution,
            hsnCodes: user.hsnCodes,
            filingFrequency: user.filingFrequency,
            preferences: user.preferences,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (req.body.name) {
            user.name = req.body.name.trim();
        }

        if (req.body.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(req.body.email)) {
                return res.status(400).json({ message: 'Please provide a valid email address' });
            }
            // Check if email is already taken by another user
            const emailExists = await User.findOne({
                email: req.body.email.toLowerCase().trim(),
                _id: { $ne: req.user.id }
            });
            if (emailExists) {
                return res.status(400).json({ message: 'Email already in use' });
            }
            user.email = req.body.email.toLowerCase().trim();
        }

        if (req.body.password) {
            if (req.body.password.length < 6) {
                return res.status(400).json({ message: 'Password must be at least 6 characters long' });
            }
            user.password = req.body.password; // Will be hashed by pre-save middleware
        }

        // Update business information
        if (req.body.businessName !== undefined) user.businessName = req.body.businessName;
        if (req.body.businessType) user.businessType = req.body.businessType;
        if (req.body.industry) user.industry = req.body.industry;
        if (req.body.businessAddress) user.businessAddress = req.body.businessAddress;
        if (req.body.phone) user.phone = req.body.phone;
        if (req.body.alternateEmail) user.alternateEmail = req.body.alternateEmail;
        if (req.body.panNumber) user.panNumber = req.body.panNumber;
        if (req.body.registrationDate) user.registrationDate = req.body.registrationDate;

        // Update GST details
        if (req.body.gstin) {
            // Validate GSTIN format (15 characters)
            if (req.body.gstin.length !== 15) {
                return res.status(400).json({ message: 'GSTIN must be 15 characters long' });
            }
            user.gstin = req.body.gstin.toUpperCase();
        }
        if (req.body.gstRegistrationDate) user.gstRegistrationDate = req.body.gstRegistrationDate;
        if (req.body.stateOfRegistration) user.stateOfRegistration = req.body.stateOfRegistration;
        if (req.body.businessConstitution) user.businessConstitution = req.body.businessConstitution;
        if (req.body.hsnCodes) user.hsnCodes = req.body.hsnCodes;
        if (req.body.filingFrequency) user.filingFrequency = req.body.filingFrequency;

        // Update preferences
        if (req.body.preferences) {
            user.preferences = { ...user.preferences, ...req.body.preferences };
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            businessName: updatedUser.businessName,
            businessType: updatedUser.businessType,
            industry: updatedUser.industry,
            businessAddress: updatedUser.businessAddress,
            phone: updatedUser.phone,
            alternateEmail: updatedUser.alternateEmail,
            panNumber: updatedUser.panNumber,
            registrationDate: updatedUser.registrationDate,
            gstin: updatedUser.gstin,
            gstRegistrationDate: updatedUser.gstRegistrationDate,
            stateOfRegistration: updatedUser.stateOfRegistration,
            businessConstitution: updatedUser.businessConstitution,
            hsnCodes: updatedUser.hsnCodes,
            filingFrequency: updatedUser.filingFrequency,
            preferences: updatedUser.preferences,
            token: generateToken(updatedUser._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const promoteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.role = 'admin';
        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const enableAdmin = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.role = 'admin';
        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            token: generateToken(updatedUser._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    register,
    login,
    getMe,
    updateDetails,
    promoteUser,
    enableAdmin,
};
