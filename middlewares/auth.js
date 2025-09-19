// middlewares/auth.js

function requireAuthToken(req, res, next) {
  const providedToken = req.headers['x-ingest-token'];
  const validToken = process.env.INGEST_TOKEN;

  if (!providedToken || providedToken !== validToken) {
    return res.status(403).json({ error: 'Forbidden: Invalid or missing ingest token' });
  }

  next();
}

module.exports = { requireAuthToken };