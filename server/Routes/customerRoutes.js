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

// Main code 
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {


    // Find the employee with the specified ID
    const employee = await Employee.findOne({ id: id });

    // If employee is found, find their associated customers
    if (employee) {
      const customers = await Customer.find({ referralEmployee: employee.referalID });

      // If customers are found, return them; otherwise, return a custom message
      if (customers.length > 0) {
        res.json(customers);
      } else {
        res.status(401).json({ message: 'No customers found for the specified employee' });
      }
    } else {
      res.status(400).json({ message: 'Employee not found' });
    }

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// router.get('/:id', async (req, res) => {
//   const { id } = req.params;
//   const { page = 1, limit = 10, product, timeFrame } = req.query;  // Default page and limit for pagination, input for product and time frame.

//   // Calculate date range based on provided timeFrame value, counting from the current date.
//   let startDate, endDate;
//   const now = new Date();

//   // Define the timeFrames with respective date ranges
//   const timeFrames = {
//     'current': new Date(now.getFullYear(), now.getMonth(), 1),
//     'last': new Date(now.getFullYear(), now.getMonth() - 1, 1),
//     '3': new Date(now.getFullYear(), now.getMonth() - 3, 1),
//     '6': new Date(now.getFullYear(), now.getMonth() - 6, 1),
//     '12': new Date(now.getFullYear() - 1, now.getMonth(), 1)
//   };

//   // Get the start date from the timeFrames; if not present, start date remains undefined to fetch all records
//   startDate = timeFrames[timeFrame] || undefined;
//   // If timeFrame is specified and is not 'default', calculate the end date
//   endDate = timeFrame && timeFrame !== 'default' ? new Date(now.getFullYear(), now.getMonth() + 1, 0) : undefined;

//   const query = {
//     referralEmployee: id,
//     ...(startDate && { createdAt: { $gte: startDate } }),
//     ...(endDate && { createdAt: { $lte: endDate } }),
//     ...(product && product !== 'All' && { 'products.name': product })
//   };

//   try {
//     const customers = await Customer.find(query)
//       .skip((page - 1) * limit)
//       .limit(limit)
//       .sort({ createdAt: -1 });

//     const totalCustomers = await Customer.countDocuments(query);

//     // Format the response to include only the necessary fields
//     const customerData = customers.map(customer => ({
//       date: customer.createdAt,
//       customerID: customer._id,
//       customerName: `${customer.firstName} ${customer.lastName}`,
//       customerEmailID: customer.email,
//       customerPhoneNo: customer.phone,
//       product: customer.products.map(p => p.name).join(', '), // Join names of all products
//       amount: customer.products.reduce((total, p) => total + (p.amount * p.quantity), 0) // Compute total amount
//     }));

//     res.json({
//       data: customerData,
//       currentPage: Number(page),
//       totalPages: Math.ceil(totalCustomers / limit),
//       totalCount: totalCustomers
//     });
//   } catch (error) {
//     console.error('Server error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });




router.post('/register', async (req, res) => {
  const { referralEmployee, firstName, lastName, products, email } = req.body;

  // Find the referral employee
  const findReferral = await Employee.findOne({ referalID: referralEmployee });
  if (!findReferral) {
    return res.status(400).json({ message: 'Invalid referral ID' });
  }

  try {

    const newCustomer = await Customer.create(req.body);

    // Retrieve the current sale amount of the referral employee
    let currentSale = findReferral.sale;

    // Check if currentSale is NaN or undefined, and initialize it to 0 if it is
    if (isNaN(currentSale) || currentSale === undefined) {
      currentSale = 0;
    }

    // Calculate the new total sale amount
    const newTotalSale = currentSale + newCustomer.totalAmount;
    console.log(typeof (newCustomer.totalAmount));
    // Update the sale amount of the referral employee with the new total sale amount
    await Employee.updateOne(
      { referalID: referralEmployee },
      { $set: { sale: newTotalSale } }
    );

    res.status(200).json({ message: 'Customer saved successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error while registration', error: error.message });
  }
});



router.get('/customer/total-amount-per-month', async (req, res) => {
  try {
    const result = await Customer.aggregate([
      {
        $group: {
          _id: { month: { $month: '$createdAt' }, year: { $year: '$createdAt' } },
          totalAmount: { $sum: '$totalAmount' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.json(result);
  } catch (err) {
    console.error('Error fetching total amounts per month:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/employee/total-amount-per-month/:id', async (req, res) => {
  const { id } = req.params
  try {
    const employeeId = await Employee.findOne({ id: id })
    console.log(employeeId);
    const result = await Customer.aggregate([
      {
        $match: { 'referralEmployee': employeeId.referalID }
      },
      {
        $group: {
          _id: { month: { $month: '$createdAt' }, year: { $year: '$createdAt' } },
          totalAmount: { $sum: '$totalAmount' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);
    console.log(result);
    res.json(result);
  } catch (err) {
    console.error('Error fetching total amounts per month for employees:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//  Delete all Customers  ⚠⚠ ⚡ ⚠⚠
router.delete("/delete-all", async (req, res) => {
  try {
    const result = await Customer.deleteMany()
    return res.status(200).json({ message: "All Deleted", result })
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong while deleteing all customers", error: error.message })
  }
})

module.exports = router;
