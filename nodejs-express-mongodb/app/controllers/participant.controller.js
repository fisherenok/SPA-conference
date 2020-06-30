const db = require("../models");
const Participant = db.participants;


exports.create = (req, res) => {

  // Create a Participant
  const participant = new Participant({
    fio: req.body.fio,
    fioEng: req.body.fioEng,
    rank: req.body.rank,
    degree: req.body.degree,
    email: req.body.email,
    country: req.body.country,
    city: req.body.city,
    phone: req.body.phone,
    job: req.body.job,
    note: req.body.note,
    participation: req.body.participation ? req.body.participation : false
  });

  //Validate form
  const value = !!req.body.fio + !!req.body.email + !!req.body.country + !!req.body.city;
  if (value < 4) {
    res.status(400).send({ message: "Content can not be empty!" });
  } else {
    // Save Participant in the database
    participant
      .save(participant)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the participant."
        });
      });
  }
};

exports.findAll = (req, res) => {
  try {
    const data = req.query.data;
    const arrKey = ['fio', 'fioEng', 'rank', 'degree', 'email', 'phone', 'city', 'country', 'job', 'note'];
    const dataKey = req.query.key;
    const conditionKey = dataKey ? { [dataKey.split(/\s*,\s*/)[0]]: { $regex: new RegExp(dataKey.split(/\s*,\s*/)[1]), $options: "i" } } : {};
    if (dataKey) {
      Participant.find(conditionKey)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving participants."
          });
        });
    } else {
      for (let i = 0; i < arrKey.length; i++) {
        const condition = data ? {[arrKey[i]]: {$regex: new RegExp(data.trim()), $options: "i"}} : {};
        Participant.find(condition)
          .then(data => {
            if (data.length) res.send(data);
          })
          .catch(err => {
            return res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving participants."
            });
          });
      }
    }
  }
  catch (e) {
    throw Error(e)
  }
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Participant.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found participant with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving participant with id=" + id });
    });
};

exports.update = (req, res) => {

  //Validate from
  const value = !!req.body.fio + !!req.body.email + !!req.body.country + !!req.body.city;
  const id = req.params.id;

  if (value < 4) {
    res.status(400).send({
      message: "Data to update can not be empty!"
    });
  } else {
    Participant.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update participant with id=${id}. Maybe participant was not found!`
          });
        } else res.send({ message: "participant was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating participant with id=" + id
        });
      });
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Participant.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete participant with id=${id}. Maybe participant was not found!`
        });
      } else {
        res.send({
          message: "participant was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete participant with id=" + id
      });
    });
};

exports.findAllParticipation = (req, res) => {
  Participant.find({ participation: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving participants."
      });
    });
};
