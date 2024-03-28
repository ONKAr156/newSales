"use client"
import { useEffect, useState } from "react"
const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    product: 'All',
    timeFrame: 'current'
  });
  const employeeId = 2
  const fetchCustomers = async (page) => {
    // Construct the query parameters based on filters and page
    const queryParams = new URLSearchParams({
      ...filters,
      page,
      limit: 10,
    });

    try {
      const response = await fetch(`http://localhost:3000/api/customer/${employeeId}?${queryParams}`);
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setCustomers(data.data);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Fetching customers failed:", error);
    }
  };

  // Call fetchCustomers when the component mounts and when filters/page change
  useEffect(() => {
    fetchCustomers(currentPage);
  }, [filters, currentPage]);

  return (
    <>
      {/* Product Filter Select Box */}
      <select
        value={filters.product}
        onChange={(e) => setFilters({ ...filters, product: e.target.value })}
      >
        <option value="All">All Products</option>
        <option value="Product A">Product A</option>
        <option value="Product B">Product B</option>
        <option value="Product C">Product C</option>
        <option value="Product D">Product D</option>
      </select>

      {/* Time Frame Filter Select Box */}
      <select
        value={filters.timeFrame}
        onChange={(e) => setFilters({ ...filters, timeFrame: e.target.value })}
      >
        <option value="default">All Time</option>
        <option value="current">Current Month</option>
        <option value="last">Last Month</option>
        <option value="3">Last 3 Months</option>
        <option value="6">Last 6 Months</option>
        <option value="12">Last 12 Months</option>
      </select>

      {/* Your Customer Table */}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Products</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{new Date(customer.date).toLocaleDateString()}</td>
              <td>{customer.customerID}</td>
              <td>{customer.customerName}</td>
              <td>{customer.customerEmailID}</td>
              <td>{customer.customerPhoneNo}</td>
              <td>{customer.product}</td>
              <td>${customer.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls (Simplified Example) */}
      <div>
        {/* Previous Page Button */}
        <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>
          Previous
        </button>

        {/* Next Page Button */}
        <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
};

export default CustomerTable;