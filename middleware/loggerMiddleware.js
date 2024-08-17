const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} at ${new Date()}`);
  next();
};

export { logger };
