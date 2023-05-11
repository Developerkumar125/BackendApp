module.exports = {
  HOST: "mahmud.db.elephantsql.com",
  USER: "frbcvqxp",
  PASSWORD: "wJjMdVv04gEEzJFxPgKysyEXDtg7dAal",
  DB: "frbcvqxp",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    // Specify underscored option to match the column names in the code
    underscored: true,
  },
};
