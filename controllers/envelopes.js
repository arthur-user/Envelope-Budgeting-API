

const databaseEnv = require("../conf/db");
const { reset } = require("nodemon");
const { findById, newid, deleteById } = require("../helpers/helperFunctions")
const router  = require("../routes/envelopes");
// @desc: get all envelopes
// @route: GET /api/v1/envelopes
exports.getEnvel = async (req, res, next) => {
    try {
        const env = await databaseEnv;
        res.status(200).send(env);
    } catch (err) {
        res.status(400).send(err)
    }
};



// @desc: Create an envelope
// @route: POST /api/v1/envelopes

exports.addEnv = async (req, res) => {
  try {
    const { title, budget } = req.body;
    const env = await databaseEnv;
    const newId = newid(env);
    const newEnvelope = {
      id: newId,
      title,
      budget,
    };
    env.push(newEnvelope);
    res.status(201).send(newEnvelope);
  } catch (err) {
    res.status(500).send(err);
  }
};

// @desc: GET a single envelope
// @route: GET api/v1/envelopes/:id
exports.getEnvByID = async (req, res) => {
  try {
    const { id } = req.params;
    const env = await databaseEnv;
    const envelope = findById(env, id);

    if (!envelope) {
      return res.status(404).send({ message: "Envelope not found" });
    }
    return res.status(200).send(envelope);
  } catch (err) {
    res.status(500).send(err);
  }
};

//@desc: update existing envelope
//@route: PUT api/v1/envelopes/:id
exports.updateEnv = async (req, res) => {
  try {
    const { title, budget } = req.body;
    const { id } = req.params;
    const env = await databaseEnv;
    const envelope = findById(env,id);

    if (!envelope){
      return res.status(404).send({message: "Not found",

      })
    }
    envelope.title = title;
    envelope.budget = budget;
    res.status(201).send(env);
  } catch (err){
    res.status(500).send(err);
  }
};

//@desc: Delete specified envelope
//@route: DELETE api/v1/envelopes/:id
exports.deleteEnv = async (req, res) => {
  try {
    const { id } = req.params;
    const env = await databaseEnv;
    const envelope = findById(env,id);

    if (!envelope){
      return res.status(404).send({message: 'Not found'});
    }

    const updatedEnvelopes = deleteById(env,id);
    return res.status(204).send(updatedEnvelopes);
  } catch (err) {
    res.status(500).send(err);
  }
};


exports.transferEnv = async (req, res) => {
  try {
    const env = await databaseEnv;
    const { fromId, toId } = req.params;
    const { amount } = req.body;

    const sourceEnv = findById(env, fromId);
    const destinationEnv = findById(env, toId);

    if (!sourceEnv || !destinationEnv) {
      return res.status(404).send({ message: "Not found" });
    }
    if (sourceEnv.budget < amount) {
      return res.status(400).send({
        message: "Total amount to be transferred exceeds the envelope budget",
      });
    }
    sourceEnv.budget -= amount;
    destinationEnv.budget += amount;

    return res.status(201).send(sourceEnv);
  } catch (err) {
    res.status(500).send(err);
  }
};
