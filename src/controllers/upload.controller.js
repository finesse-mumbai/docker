const { uploadFile } = require("../services/cloudinary.service");
const prisma = require("../prismaClient");

const upload = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file provided" });

    const result = await uploadFile(req.file.buffer);

    const fileRecord = await prisma.File.create({
      data: { url: result.secure_url, publicId: result.public_id },
    });

    res.json(fileRecord);
  } catch (err) {
    next(err);
  }
};

module.exports = { upload };
