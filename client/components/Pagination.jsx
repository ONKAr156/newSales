import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

const EmployeesList = () => {
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [customer, setCustomer] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
    const limit = 10; // Number of items you want per page

    useEffect(() => {
        setLoading(true);
        const fetchEmployees = async () => {
            const { key, direction } = sortConfig;
            const sortField = key === 'id' ? '_id' : (key === 'totalSale' ? 'sale' : key); // Assume 'id' refers to '_id' in MongoDB
            try {
                const response = await axios.get(`http://localhost:3000/api/employee/fetchemployees`, {
                    params: {
                        page: currentPage,
                        limit: 10,
                        sortField,
                        sortOrder: direction
                    }
                });
                setEmployees(response.data.employees);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
            setLoading(false);
        };

        fetchEmployees();
    }, [currentPage, sortConfig]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await fetch(`http://localhost:3000/api/customer/`);
                const data = await response.json();
                setCustomer(data);
            } catch (error) {
                console.error('Error fetching Customer data:', error);
            }
            setLoading(false);
        };

        fetchData();
    }, []);







    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };


    const handleSort = (key) => {
        setSortConfig((prevSortConfig) => ({
            key,
            direction: prevSortConfig.direction === 'asc' && prevSortConfig.key === key ? 'desc' : 'asc'
        }));
    };


    const totalSale = employees.reduce((sale, employee) => sale + employee.sale, 0);
    const totalEmployees = employees.length;
    const totalCustomers = employees.reduce((total, employee) => total + employee.totalCustomers, 0);

    if (loading) {
        return <div>Loading...</div>; // You can replace this with any loading spinner or animation you prefer
    }
    return (
        <>
            <div className="bg-slate-100 shadow-md  p-4 mb-4 mt-2 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Summary</h2>
                <div className="grid grid-cols-12 gap-4 ">
                    <div className="col-span-12 md:col-span-4 bg-blue-200 p-4 rounded">
                        <p className="text-lg font-semibold mb-1">Total Sale</p>
                        <p>₹{totalSale}</p>
                    </div>
                    <div className="col-span-12 md:col-span-4  bg-green-200 p-4 rounded">
                        <p className="text-lg font-semibold mb-1">Total Employees</p>
                        <p>{totalEmployees}</p>
                    </div>
                    <div className="col-span-12 md:col-span-4  bg-purple-200 p-4 rounded">
                        <p className="text-lg font-semibold mb-1">Total Customers</p>
                        <p>{customer.length}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-md rounded p-4">
                <h2 className="text-xl font-semibold mb-2">Employee List</h2>
                <div className="mb-4 flex justify-end gap-1">
                    <button
                        className="px-4 py-1 md:py-2 border rounded-md focus:ring focus:ring-indigo-200"
                        onClick={() => handleSort('id')}
                    >
                        <span className='text-sm md:text-lg'>Sort by Employee ID</span>
                    </button>
                    <button
                        className="px-4 py-1 md:py-2 border rounded-md focus:ring focus:ring-indigo-200"
                        onClick={() => handleSort('totalSale')}
                    >
                        <span className='text-sm md:text-lg'>Sort by Total Sale</span>
                    </button>
                </div>



                <div className="overflow-x-auto">
                    {/*Employee  Table  */}
                    <table className="w-full table-auto border border-collapse">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2 cursor-pointer">Employee ID</th>
                                <th className="border px-4 py-2 cursor-pointer">Employee Name</th>
                                <th className="border px-4 py-2 cursor-pointer">Employee Email</th>
                                <th className="border px-4 py-2 cursor-pointer">Total Sale</th>
                                <th className="border px-4 py-2 cursor-pointer">Total Customers</th>
                                <th className="border px-4 py-2 cursor-pointer">Salary</th>
                                <th className="border px-4 py-2 cursor-pointer">Profile</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees && employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td className="border px-4 py-2">{employee.id}</td>
                                    <td className="border px-4 py-2">{employee.firstName} {employee.lastName}</td>
                                    <td className="border px-4 py-2">{employee.email}</td>
                                    <td className="border px-4 py-2">₹{employee.sale}</td>
                                    <td className="border px-4 py-2">{employee.totalCustomers}</td>
                                    <td className="border px-4 py-2">₹{employee.salary}</td>
                                    <td className="border px-4 py-2">
                                        <Link href={{
                                            pathname: `/emp/${employee.id}`,
                                            query: {
                                                name: 'Admin View'
                                            }
                                        }}>
                                            <button
                                                className='py-2 px-5 rounded-lg bg-blue-600 text-slate-50'>View
                                            </button>
                                        </Link>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className='text-center mt-10 mb-2 shadow-gray-300'>
                        <button className={`${currentPage === 1 ? "bg-blue-400" : 'bg-blue-600'}  text-slate-50 px-2 py-1 rounded-md mx-3`}
                            onClick={handlePrevious} disabled={currentPage === 1 || loading}>
                            Previous
                        </button>
                        <span className='font-medium'> Page {currentPage} / {totalPages} </span>
                        <button className={`${currentPage === totalPages ? "bg-blue-400" : 'bg-blue-600 '} text-slate-50 px-2 py-1 rounded-md mx-3`}
                            onClick={handleNext} disabled={currentPage === totalPages || loading}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>


    )
}

export default EmployeesList