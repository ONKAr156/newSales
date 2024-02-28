const express = require("express");
const router = express.Router();
const { protected } = require('../middelwear/protected.js');
const Candidate = require("../models/candidate");
const nodemailer = require('nodemailer');

//## Get ---------------------------------------------------------------------------
// All candidates
// router.get('/', protected, async (req, res) => {
router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find({});

    // Send back the list of candidates
    res.status(200).json(candidates);
  } catch (error) {
    // If an error occurs, send back an error response
    res.status(500).json({ message: 'Error fetching candidates', error: error });
  }
});

router.get('/:id', async (req, res) => {
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

// Covert ==> 
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

// Send mail to shortlisted candidates
router.post('/sendemail', async (req, res) => {

  const data = await Candidate.find({ status: "shortlisted" })
  if (!data) {
    return res.status(400).json({ message: "No Candidates found for sending Mails" })
  }

  const allEmails = [];
  for (let i = 0; i < data.length; i++) {
    allEmails.push(data[i].email);
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });


  const mailOptions = {
    from: process.env.EMAIL,
    // to: ["rankob15@gmail.com"],
    to: allEmails,
    subject: `Welcome to Bolt IO`,
    text: `Working ......`
  };

  console.log(allEmails);
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error('Error during email sending:', error);
      return res.status(500).send({ message: 'There was an error sending the email.', error: error.message });
    }
    return res.status(200).send({ message: 'Email sent successfully.' });
  });

})


// Single candidate mail

router.post('/sendemail/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const candidate = await Candidate.findById(id);

    // Check if candidate exists and is shortlisted
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found.' });
    }

    if (candidate.status !== 'shortlisted') {
      return res.status(400).json({ message: 'Candidate is not shortlisted.' });
    }

    if (candidate.status === 'invited') {
      return res.status(200).json({ message: 'Candidate already invited.' });
    }

    // Email transport setup
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email service of choice
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: candidate.email,
      subject: `Welcome to the team, ${candidate.firstName} ${candidate.lastName}!`, 
      text: `Hello, ${candidate.firstName}!\n\nWe're pleased to inform you that you've been shortlisted for the role. Please find further instructions attached.`,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error('Error during email sending:', error);
        return res.status(500).json({ 
          message: 'There was an error sending the email.',
          error: error.message 
        });
      } else {
        // Update candidate status to 'invited'
        candidate.status = 'invited';
        await candidate.save(); // Make sure to handle potential errors here too

        console.log('Email sent: ' + info.response);
        res.status(200).json({
          message: 'Email sent successfully! Candidate status updated to invited.',
          info: info.response
        });
      }
    });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({
      message: 'There was a server error.',
      error: error.message
    });
  }
});


// router.post('/sendemail/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const candidate = await Candidate.findById(id);
//     // Check if candidate exists and is shortlisted
//     if (!candidate) {
//       return res.status(404).json({ message: 'Candidate not found.' });
//     }

//     if (candidate.status !== 'shortlisted') {
//       return res.status(400).json({ message: 'Candidate is not shortlisted.' });
//     }

    
//     // Email transport setup
//     const transporter = nodemailer.createTransport({
//       service: 'gmail', // Use your email service of choice
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASSWORD
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL,
//       to: "borgaonkar1998@gmail.com",
//       // to: candidate.email,
//       subject: `Welcome to the team, ${candidate.firstName} ${candidate.lastName}!`, // Candidate's name in the subject
//       text: `Dear ${candidate.firstName},\n\nWe are excited to welcome you to the team! Your email, ${candidate.email}, has been successfully added to our system and we'll be in touch with the next steps.\n\nBest,\nThe HR Team`
     
//     };

//     transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//         console.error('Error:', error);
//         return res.status(500).json({ message: 'Error sending email', error: error.message });
//       } else {
//         console.log('Email sent: ' + info.response);
//         console.log(candidate.email);
//         res.status(200).json({ message: 'Email sent successfully!', info: info.response   });
//       }
//     });

//   } catch (error) {
//     console.error('Server Error:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

module.exports = router
