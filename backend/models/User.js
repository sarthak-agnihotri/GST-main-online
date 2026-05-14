const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        // Business Information
        businessName: {
            type: String,
        },
        businessType: {
            type: String,
            enum: ['Proprietorship', 'Partnership', 'LLP', 'Private Limited', 'Public Limited', 'Other'],
        },
        industry: {
            type: String,
        },
        businessAddress: {
            street: String,
            city: String,
            state: String,
            pinCode: String,
        },
        phone: {
            type: String,
        },
        alternateEmail: {
            type: String,
        },
        panNumber: {
            type: String,
        },
        registrationDate: {
            type: Date,
        },
        // GST Details
        gstin: {
            type: String,
        },
        gstRegistrationDate: {
            type: Date,
        },
        stateOfRegistration: {
            type: String,
        },
        businessConstitution: {
            type: String,
        },
        hsnCodes: [{
            type: String,
        }],
        filingFrequency: {
            type: String,
            enum: ['Monthly', 'Quarterly'],
        },
        // Preferences
        preferences: {
            theme: {
                type: String,
                enum: ['light', 'dark', 'system'],
                default: 'system',
            },
            language: {
                type: String,
                default: 'en',
            },
            dateFormat: {
                type: String,
                default: 'DD/MM/YYYY',
            },
            currency: {
                type: String,
                default: 'INR',
            },
            emailNotifications: {
                type: Boolean,
                default: true,
            },
        },
    },
    {
        timestamps: true,
    }
);

// Encrypt password using bcrypt
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    // Check if password is already hashed (starts with $2a$ or $2b$)
    if (this.password.startsWith('$2a$') || this.password.startsWith('$2b$')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);
