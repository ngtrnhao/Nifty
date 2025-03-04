import express from 'express';
import authController from '../controller/auth.controller.js';
import { authenticateToken, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/verify-email/:token', authController.verifyEmail);
router.post('/send-verification', authController.sendVerificationEmail);
router.post('/find-account', authController.findAccount);
router.post('/reset-password/:userId', authController.resetPassword);
// router.post('/google-login', authController.googleLogin);

router.delete('/delete-account', authenticateToken, authController.deleteAccount);
router.post('/restore-account/:userId', authenticateToken, isAdmin, authController.restoreAccount);
router.delete('/permanently-delete/:userId', authenticateToken, isAdmin, authController.permanentlyDeleteAccount);

export default router;