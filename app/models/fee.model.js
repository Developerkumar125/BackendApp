module.exports = (sequelize, Sequelize) => {
  const FeeCollection = sequelize.define("fees", {
    student_id: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.STRING,
    },
    amount: {
      type: Sequelize.STRING,
    },

  },
{
      timestamps: false, // Disable the createdAt and updatedAt fields
    }

);

  return FeeCollection;
};
