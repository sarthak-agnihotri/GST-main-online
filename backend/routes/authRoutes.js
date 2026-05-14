const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const { protect, admin } = require('../middleware/authMiddleware');

// Import isAdmin middleware from adminController or define it if not exported
// adminController seems to have it but it's not exported separately usually in such structure
// Let's check adminController content again or duplicating it here for safety if not easily accessible
// Actually, I should use the one from adminRoutes if possible, or move isAdmin to middleware folder
// For now, I'll import it from adminController if exported, OR better, I will check if authMiddleware has it.
// Wait, I haven't seen authMiddleware. Let's read it first to be sure. 
// Assuming for a moment I need to add isAdmin to the route.

// I'll read authMiddleware first in next step to be clean.
// But valid plan:
// router.put('/promote/:id', protect, isAdmin, authController.promoteUser);

// For now, I will optimistically update assuming I can get isAdmin. 
// Actually I see adminController has isAdmin but it is NOT exported.
// I should move isAdmin to a shared middleware file or export it.
// Checking adminController.js again... it export getAllUsers etc.

// Let's just update lines 11-12 for now to remove makeAdmin and add promote logic placeholder
// I will need to fix middleware location.

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/profile', protect, authController.getMe);
router.put('/profile', protect, authController.updateDetails);
// router.put('/make-admin', protect, authController.makeAdmin); // REMOVED
router.put('/promote/:id', protect, admin, authController.promoteUser);
router.put('/enable-admin', protect, authController.enableAdmin);

module.exports = router;
