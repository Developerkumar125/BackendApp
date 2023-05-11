const db = require("../models");
const Tutorial = db.tutorials;
const Attendence = db.attendance;
const FeeCollect = db.fees;

const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // // Validate request
  // if (!req.body.email) {
  //   res.status(400).send({
  //     message: "Content can not be empty!",
  //   });
  //   return;
  // }

  // Create a Tutorial
  const tutorial = {
    admissionnumber: req.body.admissionnumber,
    rollnumber: req.body.rollnumber,
    // published: req.body.published ? req.body.published : false
    class: req.body.class,
    section: req.body.section,
    fristname: req.body.fristname,
    lastname: req.body.lastname,
    gender: req.body.gender,
    dateofbirth: req.body.dateofbirth,
    category: req.body.category,
    mobilenumber: req.body.mobilenumber,
    email: req.body.email,
    admissiondate: req.body.admissiondate,
    bloodgroup: req.body.bloodgroup,
  };

  // Save Tutorial in the database
  Tutorial.create(tutorial)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Student.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const classname = req.query.classname;
  const admissionnumber = req.query.admissionnumber;
  const rollnumber = req.query.rollnumber;

  var condition = {};
  if (rollnumber) {
    condition.rollnumber = { [Op.iLike]: `%${rollnumber}%` };
  }
  if (classname) {
    condition.classname = { [Op.iLike]: `%${classname}%` };
  }

  if (admissionnumber) {
    condition.admissionnumber = { [Op.iLike]: `%${admissionnumber}%` };
  }

  Tutorial.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Student.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Student with id=" + id,
      });
    });
};

// Update a Student by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Student was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Student with id=${id}. Maybe Student was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Student with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Student was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Student with id=${id}. Maybe Student was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Student with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Student were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Student.",
      });
    });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Students Attendence

exports.attendence = (req, res) => {
  //validate Request
  // if (!req.body.date) {
  //   res.status(400).send({
  //     message: "date cannot empty",
  //   });
  //   return;
  // }

  const turorial = {
    student_id: req.body.student_id,
    date: req.body.date,
    status: req.body.status,
    rollnumber: req.body.rollnumber,
  };
  Attendence.create(turorial)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something went wrong",
      });
    });
};

exports.attendenceGetAll = (req, res) => {
  const date = req.query.date;
  var condition = {};

  if (date) {
    condition.date = { [Op.iLike]: `%${date}%` };
  }
  Attendence.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some thing went wrong in db.",
      });
    });
};
exports.attendenceGetOne = (req, res) => {
  const id = req.params.id;

  Attendence.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Student attendences with id=" + id,
      });
    });
};

// Update a Student by the id in the request
exports.attendenceupdate = (req, res) => {
  const id = req.params.id;

  Attendence.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Student attendences was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Student with id=${id}. Maybe Student was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Student with id=" + id,
      });
    });
};

// Rollnumber list
exports.findAllRollNumbers = (req, res) => {
  Tutorial.findAll({ attributes: ["rollnumber"] })

    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Student rollnumbers list",
      });
    });
};

// Classnames list
exports.findAllClassNames = (req, res) => {
  Tutorial.findAll({ attributes: ["classname"] })

    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Student ClassName list",
      });
    });
};

// Section list
exports.findAllSectionNames = (req, res) => {
  Tutorial.findAll({ attributes: ["section"] })

    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Student ClassName list",
      });
    });
};

exports.feeCollectionCreate = (req, res) => {
  // Validate request
  // if (!req.body.amount) {
  //   res.status(400).send({
  //     message: "Content can not be empty!",
  //   });
  //   return;
  // }

  // Create a Tutorial
  const Collection = {
    student_id: req.body.student_id,
    date: req.body.date,
    amount: req.body.amount,
  };

  // Save Tutorial in the database
  FeeCollect.create(Collection)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Student.",
      });
    });
};

exports.feeCollectionGetAll = (req, res) => {
  const date = req.query.date;
  var condition = {};

  if (date) {
    condition.date = { [Op.iLike]: `%${date}%` };
  }
  FeeCollect.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some thing went wrong in db.",
      });
    });
};
