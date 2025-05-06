const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");

const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");

const applySecurityMiddlewares = (app) => {
  // Rate Limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message:
      "Too many requests from this IP, please try again after 15 minutes.",
  });

  app.use(cors());
  app.use(helmet());
  app.use(hpp());

  app.use(mongoSanitize());
  app.use(limiter);
};

module.exports = applySecurityMiddlewares;
