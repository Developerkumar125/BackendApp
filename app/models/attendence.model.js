module.exports = (sequelize, Sequelize) => {
  const Attendence = sequelize.define("attendance", {
    student_id: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },
    rollnumber: {
      type: Sequelize.STRING,
    },
  });

  return Attendence;
};
