const prisma = require("../prismaClient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../services/email.service");

const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const exists = await prisma.User.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ message: "Email exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.User.create({ data: { email, password: hashed, name } });

    res.json({ user });
  } catch (err) {
    next(err);
  }
};



const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.User.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
// fixing my key issue

const getUser = async (req, res, next) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = await prisma.User.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true, 
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (err) {
    next(err);
  }
};


module.exports = { register, login, getUser };
