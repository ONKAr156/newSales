const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const Employee = require("../models/employee");


router.get('/', async (req, res) => {
  try {
    // Fetch all employees from the MongoDB collection
    const customer = await Customer.find();
    res.json(customer);

  } catch (error) {
    console.error('Error fetching customer data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/register', async (req, res) => {
  const { referralEmployee, firstName, lastName, products, email } = req.body;

  // console.log(req.body);

  const findReferral = await Employee.findOne({ referalID: referralEmployee })
  if (!findReferral) {
    return res.status(400).json({ message: 'Invalid referral ID ' });
  }

  try {
    console.log(req.body)
    await Customer.create(req.body)

    res.status(200).json({ message: 'Customer Saved success' });
  } catch (error) {
    return res.status(500).json({ message: 'Error while registration', error: error.message });
  }
});


module.exports = router;
