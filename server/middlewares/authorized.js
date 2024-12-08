import jwt from "jsonwebtoken";

const Authorized = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while processing your request.",
    });
  }
};

export default Authorized;
