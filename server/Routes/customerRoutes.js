const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

// Customer login
router.post('/login', async (req, res) => {
  const { username, name, password } = req.body;

  try {
    const customer = await Customer.findOne({ username });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Add your own authentication logic here, e.g., comparing hashed passwords
    if (customer.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    return res.status(200).json({ message: 'Login successful', customer });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Customer register
router.post('/register', async (req, res) => {
  const { username,name, password } = req.body;

  try {
    const customer = await Customer.findOne({ username });

    if (customer) {
      return res.status(409).json({ message: 'Customer already exists OR username not unique' });
    }

    const newCustomer = new Customer({
      username,
      name,
      password
    });

    await newCustomer.save();

    return res.status(201).json({ message: 'Customer created successfully', customer: newCustomer });
  } catch (error) {
    console.error('Error during sign-up:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to fetch a specific customer by ID
router.get('/home/:username', async (req, res) => {
  const { username } = req.params; // Get the customer's username from the route parameter
  
  try {
    const customer = await Customer.findOne({ username });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    return res.json(customer);
  } catch (error) {
    console.error('Error fetching customer data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
