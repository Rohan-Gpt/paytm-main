export function normalizeData(req, res, next) {
  if (req.method === "GET") {
    req.normalizedData = req.query;
  } else {
    req.normalizedData = req.body;
  }
  next();
}
