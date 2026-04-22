// User controller: owns register/login/logout/refresh/profile/delete flows for cookie-based sessions.
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
}

const generateAccessAndRefreshToken = async (userId) => {
  const user = await User.findById(userId)
  const accessToken = user.generateAccessToken()
  const refreshToken = user.generateRefreshToken()

  user.refreshToken = refreshToken
  await user.save({ validateBeforeSave: false })

  return { accessToken, refreshToken }
}

export const registerUser = async (req, res) => {
  try {
    const { username, name, email, password } = req.body
    const normalizedEmail = email?.trim()?.toLowerCase()
    const normalizedUsername = (username || name || '').trim()

    if (!normalizedUsername || !normalizedEmail || !password?.trim()) {
      return res.status(400).json({ error: 'Username, email, and password are required.' })
    }

    const existingUser = await User.findOne({ email: normalizedEmail })
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists.' })
    }

    const user = await User.create({
      username: normalizedUsername,
      email: normalizedEmail,
      password,
    })

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    return res
      .status(201)
      .cookie('accessToken', accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 })
      .cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 10 * 24 * 60 * 60 * 1000 })
      .json({
        message: 'Account created successfully.',
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      })
  } catch (error) {
    return res.status(500).json({ error: error?.message || 'Failed to create account.' })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const normalizedEmail = email?.trim()?.toLowerCase()

    if (!normalizedEmail || !password?.trim()) {
      return res.status(400).json({ error: 'Email and password are required.' })
    }

    const user = await User.findOne({ email: normalizedEmail })
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' })
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password.' })
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    return res
      .status(200)
      .cookie('accessToken', accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 })
      .cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 10 * 24 * 60 * 60 * 1000 })
      .json({
        message: 'Login successful.',
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      })
  } catch (error) {
    return res.status(500).json({ error: error?.message || 'Failed to login.' })
  }
}

export const logoutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user?._id, { $set: { refreshToken: undefined } }, { new: true })

    return res
      .status(200)
      .clearCookie('accessToken', cookieOptions)
      .clearCookie('refreshToken', cookieOptions)
      .json({ message: 'Logged out successfully.' })
  } catch (error) {
    return res.status(500).json({ error: error?.message || 'Failed to logout.' })
  }
}

export const refreshAccessToken = async (req, res) => {
  try {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken

    if (!incomingRefreshToken) {
      return res.status(401).json({ error: 'Unauthorized request.' })
    }

    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    const user = await User.findById(decodedToken?._id)

    if (!user || user.refreshToken !== incomingRefreshToken) {
      return res.status(401).json({ error: 'Invalid refresh token.' })
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    return res
      .status(200)
      .cookie('accessToken', accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 })
      .cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 10 * 24 * 60 * 60 * 1000 })
      .json({ message: 'Access token refreshed.' })
  } catch (error) {
    return res.status(401).json({ error: error?.message || 'Invalid refresh token.' })
  }
}

export const getUserProfile = async (req, res) => {
  return res.status(200).json({ user: req.user })
}

export const deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user?._id)

    return res
      .status(200)
      .clearCookie('accessToken', cookieOptions)
      .clearCookie('refreshToken', cookieOptions)
      .json({ message: 'Account deleted successfully.' })
  } catch (error) {
    return res.status(500).json({ error: error?.message || 'Failed to delete account.' })
  }
}
