module.exports = (err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    error: err.message || "Internal server error",
    name: err.name || "Error",
  });
};
