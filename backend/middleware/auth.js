const admin = require("../utils/firebase");

const verifyToken = async (req, res, next) => {
  const idToken = req.cookies?.session;

  if (!idToken) {
    return res.status(401).json({ error: "Unauthorized: No token" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = verifyToken;
