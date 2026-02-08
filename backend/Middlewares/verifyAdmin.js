import jwt from "jsonwebtoken";

const verifyAdmin = (req, res, next) => {
  console.log("AUTH HEADER =>", req.headers.authorization);

  const authHeader = req.headers.authorization;

  // 1️⃣ Check header exists
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Authorization header missing",
    });
  }

  // 2️⃣ Extract token (remove Bearer)
  const token = authHeader.split(" ")[1];

  // 3️⃣ Safety check
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token missing",
    });
  }

  try {
    // 4️⃣ Verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export default verifyAdmin;
