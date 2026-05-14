const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Get the User model
        const User = require('./models/User');

        // Find the first user
        const user = await User.findOne();

        if (user) {
            console.log('\n=== USER DATA IN DATABASE ===\n');
            console.log('Name:', user.name);
            console.log('Email:', user.email);
            console.log('Role:', user.role);
            console.log('\n--- Business Information ---');
            console.log('Business Name:', user.businessName || 'Not set');
            console.log('Business Type:', user.businessType || 'Not set');
            console.log('Industry:', user.industry || 'Not set');
            console.log('PAN Number:', user.panNumber || 'Not set');
            console.log('Phone:', user.phone || 'Not set');
            console.log('Business Address:', user.businessAddress || 'Not set');
            console.log('\n--- GST Details ---');
            console.log('GSTIN:', user.gstin || 'Not set');
            console.log('GST Registration Date:', user.gstRegistrationDate || 'Not set');
            console.log('State of Registration:', user.stateOfRegistration || 'Not set');
            console.log('HSN Codes:', user.hsnCodes || 'Not set');
            console.log('\n--- Preferences ---');
            console.log('Preferences:', user.preferences || 'Not set');
        } else {
            console.log('No user found in database');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

connectDB();
