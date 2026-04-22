// User auth routes: maps public and protected auth/profile endpoints to controllers.
import { Router } from 'express'
import {
  deleteAccount,
  getUserProfile,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from '../controllers/user.controller.js'
import { verifyJWT } from '../middlewares/authmiddleware.js'

const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/refresh-token').post(refreshAccessToken)

router.route('/logout').post(verifyJWT, logoutUser)
router.route('/me').get(verifyJWT, getUserProfile)
router.route('/delete-account').delete(verifyJWT, deleteAccount)

export default router
