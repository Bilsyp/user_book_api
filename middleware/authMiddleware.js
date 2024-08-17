const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1] || req.cookies.token;
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

export { authenticateToken };