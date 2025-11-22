const clientBuyRecords = {};

const ONE_MINUTE_IN_MS = 60 * 1000;

function cornRateLimiter(req, res, next) {
  const clientIp = req.ip;
  const now = Date.now();

  const lastBuyTime = clientBuyRecords[clientIp];

  if (lastBuyTime) {
    const timeElapsed = now - lastBuyTime;
    const timeRemainingSeconds = Math.ceil(
      (ONE_MINUTE_IN_MS - timeElapsed) / 1000
    );

    if (timeElapsed < ONE_MINUTE_IN_MS) {
      console.log(
        `[RATE LIMIT] IP: ${clientIp} - Compra bloqueada. Tiempo restante: ${timeRemainingSeconds}s`
      );

      res.setHeader("Retry-After", timeRemainingSeconds);

      return res.status(429).json({
        error: "Too Many Requests",
        message: `Too Many Requests 🌽`,
      });
    }
  }

  clientBuyRecords[clientIp] = now;

  next();
}

module.exports = cornRateLimiter;
