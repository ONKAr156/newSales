import { useFetchEmpQuery } from '@/app/redux/api/EmployeeApi';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Pagination = () => {
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortKey, setSortKey] = useState('id');
    const [sortOrder, setSortOrder] = useState('asc');
    const { data } = useFetchEmpQuery()

    const employeesPerPage = 10

    const handleSort = (key) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };

    const sortedEmployees = [...employees].sort((a, b) => {
        const aValue = sortKey === 'totalSale' ? a.totalSale : a.id;
        const bValue = sortKey === 'totalSale' ? b.totalSale : b.id;

        if (sortOrder === 'asc') {
            return aValue - bValue;
        } else {
            return bValue - aValue;
        }
    });

    //Employees to display
    const indexOfLastEmp = currentPage * employeesPerPage;
    const indexOfFirstEmp = indexOfLastEmp - employeesPerPage;
    const currentItems = sortedEmployees.slice(indexOfFirstEmp, indexOfLastEmp);

    const handleNextBtn = () => {
        setCurrentPage((prev) => (prev < 10 ? prev + 1 : prev));
    };

    const handlePreviouBtn = () => {
        setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
    };


    const totalSale = employees.reduce((sale, employee) => sale + employee.sale, 0);
    const totalEmployees = employees.length;
    const totalCustomers = employees.reduce((total, employee) => total + employee.totalCustomers, 0);

    // Fetching employees data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/employee/fetchemployees`);
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchData();
    }, []);
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
                        <p>{totalCustomers}</p>
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
                            {currentItems && currentItems.map((employee) => (
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
                        <div className="">
                            <button onClick={handlePreviouBtn} disabled={currentPage === 1} className={`border rounded mx-1 p-2 ${currentPage === 1 ? "hidden" : "bg-blue-600 text-white"}`}>Previous</button>
                            {Array.from({ length: 10 }, (_, index) => (
                                <button
                                    key={index}
                                    className={`rounded-full bg-slate-50 text-black border mx-1 px-3 py-2 ${currentPage === index + 1 ? 'bg-yellow-400 text-white border-2 ' : ''}`}
                                    onClick={() => setCurrentPage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button onClick={handleNextBtn} disabled={currentPage === 10} className={`border rounded mx-1 p-2 ${currentPage === 10 ? "hidden" : "bg-blue-600 text-white"}`}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Pagination;