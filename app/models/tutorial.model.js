module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define(
    "tutorial",
    {
      admissionnumber: {
        type: Sequelize.STRING,
      },
      rollnumber: {
        type: Sequelize.STRING,
      },
      classname: {
        type: Sequelize.STRING,
      },
      section: {
        type: Sequelize.STRING,
      },
      firstname: {
        type: Sequelize.STRING,
      },
      lastname: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING,
      },
      dateofbirth: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.STRING,
      },
      mobilenumber: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      admissiondate: {
        type: Sequelize.STRING,
      },
      bloodgroup: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false, // Disable the createdAt and updatedAt fields
    }
  );

  return Tutorial;
};
