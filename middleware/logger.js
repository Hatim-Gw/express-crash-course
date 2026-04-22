//dates
const now = new Date();
const formattedDate = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
}).format(now);

// meddleware, always use next to move to the next middleware
const logger = (req, res, next) => {
  console.log(
    `${req.protocol}||(req.protocol) ||://${req.get("host")} ||(req.get"host") ||${req.originalUrl}, date: ${formattedDate}`,
  );
  next();
};

module.exports = logger;
