const express = require("express");
const router = express.Router();
const { protected } = require('../middelwear/protected.js');
const Candidate = require("../models/candidate");
const nodemailer = require('nodemailer');
const upload = require('../middelwear/multer.js');
const crypto = require('crypto');

//## Get ---------------------------------------------------------------------------
// All candidates


// main Code 

router.get('/', protected, async (req, res) => {
// router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find({});

    // Send back the list of candidates
    res.status(200).json(candidates);
  } catch (error) {
    // If an error occurs, send back an error response
    res.status(500).json({ message: 'Error fetching candidates', error: error });
  }
});

router.get('/:id', protected, async (req, res) => {
  const { id } = req.params
  try {
    const candidates = await Candidate.findById(id);


    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching candidates', error: error });
  }
});

//## Post ---------------------------------------------------------------------------

// Add New candidates
router.post("/", async (req, res) => {
  try {
    const newCandidate = new Candidate(req.body);
    const saveCandidate = await newCandidate.save()
    return res.status(200).json({ message: "Candidate added successfully", saveCandidate })
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong while adding candidate", error })
  }
})

//  All candidates 
router.post('/pending', async (req, res) => {
  try {
    const candiate = await Candidate.find({ status: "pending" })
    res.status(200).json({ message: "Fetched  pending candidates Success", candiate })
  } catch (error) {
    return res.status(500).json({ message: "Error fetching pending candidates", error: error })
  }
})

router.post('/shortlisted', async (req, res) => {
  try {
    const candiate = await Candidate.find({ status: "shortlisted" })
    res.status(200).json({ message: "Fetched  Shortlisted candidates Success", candiate })
  } catch (error) {
    return res.status(500).json({ message: "Error fetching Shortlisted candidates", error: error })
  }
})

router.post('/discarded', async (req, res) => {
  try {
    const candiate = await Candidate.find({ status: "discarded" })
    res.status(200).json({ message: "Fetched  discarded candidates Success", candiate })
  } catch (error) {
    return res.status(500).json({ message: "Error fetching Shortlisted candidates", error: error })
  }
})

//Covert ==> Shortlisted 
router.post('/shortlist/:id', async (req, res) => {
  const { id } = req.params
  try {
    const candidate = await Candidate.find({ _id: id })

    if (!candidate) {
      return res.status(400).json({ message: "candidate did not found" })
    }

    // console.log(candidate[0].status);
    if (candidate[0].status === 'shortlisted') {
      return res.status(400).json({ message: "candiate already shortlisted" })
    }

    const newUpdatedCandidate = await Candidate.findByIdAndUpdate({ _id: id }, {
      status: 'shortlisted'
    }, { new: true });

    return res.json({ message: 'Candidate shortlisted', newUpdatedCandidate });

  } catch (error) {
    res.status(500).send(error);
  }
});

// Covert ==> Discarded
router.post('/discard/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const candidate = await Candidate.findById(id);

    if (!candidate) {
      return res.status(404).json({ message: "Candidate did not found" });
    }

    if (candidate.status === 'discarded') {
      return res.status(400).json({ message: "Candidate already discarded" });
    }

    const updatedCandidate = await Candidate.findByIdAndUpdate(id, {
      status: 'discarded'
    }, { new: true });

    res.json({ message: 'Candidate discarded', candidate: updatedCandidate });

  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Covert ==> Pending
router.post('/pending/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const candidate = await Candidate.findById(id);

    if (!candidate) {
      return res.status(404).json({ message: "Candidate did not found" });
    }

    if (candidate.status === 'pending') {
      return res.status(400).json({ message: "Candidate already discarded" });
    }

    const updatedCandidate = await Candidate.findByIdAndUpdate(id, {
      status: 'pending'
    }, { new: true });

    res.json({ message: 'Candidate status is pending', candidate: updatedCandidate });

  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Send mail to all shortlisted candidates
router.post('/sendemail', async (req, res) => {
  const candidates = await Candidate.find({ status: "shortlisted" });

  if (!candidates.length) {
    return res.status(400).json({ message: "No Candidates found for sending emails" });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // Helper function to create individual emails with a unique submission link
  const sendEmailWithUniqueLink = async (candidate) => {
    const emailHash = candidate.emailHash; // Assume this field is already populated in your Candidate document
    const submissionLink = `http://localhost:3001/submission/${emailHash}`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: candidate.email, // Send to the individual candidate's email
      subject: `Welcome to Bolt IO`,
      html: `<p>Please use the link below to submit your resume:</p><p>${submissionLink}</p>` // Insert the unique link
    };

    // Send email
    return transporter.sendMail(mailOptions);
  };

  // Send emails with unique links
  const sendEmailPromises = candidates.map(candidate => sendEmailWithUniqueLink(candidate));

  Promise.all(sendEmailPromises)
    .then(() => {
      return res.status(200).json({ message: 'All emails sent successfully.' });
    })
    .catch(error => {
      console.error('Error during email sending:', error);
      return res.status(500).json({ message: 'There was an error sending some emails.', error: error.message });
    });
});



// Single candidate shortlisted mail
router.post('/submission/:emailHash', async (req, res) => {
  const { emailHash } = req.params;
  const { email, resumeLink } = req.body;

  try {
    const candidate = await Candidate.findOne({ emailHash });

    if (!candidate) {
      res.status(404).json({ message: 'No candidate found with this identifier.' });
      return;
    }

    if (candidate.email !== email) {
      res.status(400).json({ message: 'The provided email does not match our records.' });
      return;
    }

    candidate.resume = resumeLink;
    await candidate.save();

    res.status(200).json({ message: 'Resume submitted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while processing your submission.', error: error.message });
  }
});


module.exports = router
