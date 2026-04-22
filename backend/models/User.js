// User model: handles account schema, password hashing, and JWT token generation methods.
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    refreshToken: { type: String },
  },
  { timestamps: true },
)

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  return next()
})

userSchema.methods.isPasswordCorrect = async function isPasswordCorrect(enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.generateAccessToken = function generateAccessToken() {
  return jwt.sign(
    { _id: this._id, email: this.email, username: this.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' },
  )
}

userSchema.methods.generateRefreshToken = function generateRefreshToken() {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '10d' },
  )
}

export default mongoose.model('User', userSchema)
