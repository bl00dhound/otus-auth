const config = {
  logLevel: process.env.LOG_LEVEL,
  port: Number(process.env.PORT || 8001),
  bcryptRounds: Number(process.env.ROUNDS || 10),
  secret: process.env.SECRET,
};

export default config;
