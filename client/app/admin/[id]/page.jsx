"use client"
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';




const page = ({ params }) => {
    const [validate, setValidate] = useState()
    const [admin, setAdmin] = useState([])
    const [edit, setEdit] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        profileCreationDate: "",
        adminId: "",
        id: +"",
    })
    const [employees, setEmployees] = useState([])
    const [sortKey, setSortKey] = useState('id');
    const [sortOrder, setSortOrder] = useState('asc');
    const router = useRouter()


    const sortedEmployees = [...employees].sort((a, b) => {
        const aValue = sortKey === 'totalSale' ? a.totalSale : a.id;
        const bValue = sortKey === 'totalSale' ? b.totalSale : b.id;

        if (sortOrder === 'asc') {
            return aValue - bValue;
        } else {
            return bValue - aValue;
        }
    });

    // const handleSort = (key: string) => {
    const handleSort = (key) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEdit({ ...edit, [name]: value });
    };

    const handelSubmit = async (e) => {
        e.preventDefault();
        console.log(edit);
        try {
            // Sending PUT request to the backend
            const response = await axios.put(`http://localhost:3000/api/admin/${params.id}`, edit);

            // Handle the response from the backend (if needed)
            console.log('Backend response:', response.data);
        } catch (error) {
            // Handle errors
            console.error('Error updating user:', error);
        }
    }
    //  Summary data :---------------------------------------------------------------
    const totalSale = employees.reduce((sale, employee) => sale + employee.sale, 0);
    const totalEmployees = employees.length;
    const totalCustomers = employees.reduce((total, employee) => total + employee.totalCustomers, 0);


    const search = useSearchParams()

    const handleLogout = async () => {
        try {
            const response = await axios.post(`http://localhost:3000/api/employee/logout`, {}, {
                withCredentials: true
            });
            console.log(response.data);
            toast.success('logout success')
            router.push('/login')
            setLogout(true);
        } catch (error) {
            console.error('Error while logging out:', error);

        }
    };
    //    console.log(search.get('admin'));


    // Fetching Admin id when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3000/api/admin/${params.id}`, {
                    withCredentials: true
                });
                setAdmin([data]);
                toast.success('Welcome'); // Handle success
                
                // If a 401 is returned, redirect to the login page
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    router.push('/login');
                }
                else {
                    console.error('Error fetching admin data:', error);
                    toast.error('Failed to  fetch admin data'); // Handle general error
                }
            }
        };

        fetchData();
    }, [params.id])



    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:3000/api/admin/${params.id}`);
    //             const data = await response.json();
    //             setAdmin([data]);
    //         } catch (error) {
    //             console.error('Error fetching employee data:', error);
    //         }
    //     };

    //     fetchData();

    // }, []);
    // }, [admin]);

    // Fetching employees when the component mounts
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
    // }, [employees]);

    return <>
        
                    <div className='min-h-screen bg-gray-100 p-4'>
                        {/* <pre>{JSON.stringify(admin, null, 2)}</pre> */}
                        <p className='md:text-2xl my-2 font-semibold text-center'>Admin Dashboard</p>

                        <div className='bg-slate-50 shadow-lg p-4 md:h-[10rem] rounded-lg'>

                            {admin && admin.map((item) => (
                                <div className='flex flex-col md:flex-row  md:justify-between md:items-center h-full gap-0 md:gap-4 p-2' key={item.id}>

                                    <div className='mb-4 md:mb-0 md:mr-4'>
                                        <div className='flex flex-col'>
                                            <div className='mb-2'>
                                                <span className='md:text-lg font-semibold'>Name:</span>
                                                <span className='md:text-lg'> {item.firstName} {item.lastName}</span>
                                            </div>
                                            <div>
                                                <span className='md:text-lg font-semibold'>ID: </span>
                                                <span className='md:text-lg'>{item.id}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-col md:justify-between gap-2 mb-4 md:mb-0'>
                                        <div className='mb-2'>
                                            <span className='md:text-lg font-semibold'>Date of joining: </span>
                                            <span className='md:text-lg'>{item.profileCreationDate}</span>
                                        </div>
                                        <div>
                                            <span className='md:text-lg font-semibold'>AdminID: </span>
                                            <span className='md:text-lg'>{item.adminId}</span>
                                        </div>
                                    </div>

                                    <div className='mb-4 md:mb-0'>
                                        <div className='mb-2'>
                                            <span className='md:text-lg font-semibold'>Email: </span>
                                            <span className='md:text-lg'>{item.email}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <button type="button" className="btn btn-primary px-4 py-1 md:py-2 " data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <span className='text-sm md:text-base'>Edit</span>
                                        </button>
                                    </div>
                                    <div className='text-end'>
                                        <button
                                            // data-bs-toggle="modal" data-bs-target="#logoutModal"
                                            onClick={handleLogout}
                                            className='bg-blue-600 p-2  text-slate-50'>
                                            Logout
                                        </button>
                                    </div>

                                </div>
                            ))}


                        </div>

                        <div className="bg-slate-100 shadow-md  p-4 mb-4 mt-2 rounded-lg">
                            <h2 className="text-xl font-semibold mb-2">Summary</h2>
                            <div className="grid grid-cols-12 gap-4 ">
                                <div className="col-span-12 md:col-span-4 bg-blue-200 p-4 rounded">
                                    <p className="text-lg font-semibold mb-1">Total Sale</p>
                                    <p>${totalSale}</p>
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
                                        {sortedEmployees && sortedEmployees.map((employee) => (
                                            <tr key={employee.id}>
                                                <td className="border px-4 py-2">{employee.id}</td>
                                                <td className="border px-4 py-2">{employee.firstName} {employee.lastName}</td>
                                                <td className="border px-4 py-2">{employee.email}</td>
                                                <td className="border px-4 py-2">${employee.sale}</td>
                                                <td className="border px-4 py-2">{employee.totalCustomers}</td>
                                                <td className="border px-4 py-2">${employee.salary}</td>
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


                                                    {/* <button
                                                    onClick={e => router.push(`/emp/${employee.id}`)}
                                                    className='py-2 px-5 rounded-lg bg-blue-600 text-slate-50'>View
                                                </button> */}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>



                        </div>
                    </div>

        {/* Edit Modal-------------------------------------------------- */}

        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <form onSubmit={e => handelSubmit(e)}>
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* <pre>{JSON.stringify(edit, null, 2)}</pre> */}
                            <h5 className="modal-title" id="exampleModalLabel">Edit Admin data</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='d-flex flex-column gap-2'>
                                <div>
                                    <label for="fname" className="form-label">First name</label>
                                    <input name='firstName' value={edit.firstName} onChange={handleChange} type="text" className="form-control" id="fname" placeholder="Edit Your First name" />
                                </div>
                                <div>
                                    <label for="lname" className="form-label">Last name</label>
                                    <input name='lastName' value={edit.lastName} onChange={handleChange} type="text" className="form-control" id="lname" placeholder="Edit Your Last name" />
                                </div>
                                <div>
                                    <label for="email" className="form-label">email</label>
                                    <input name='email' value={edit.email} onChange={handleChange} type="email" className="form-control" id="email" placeholder="Edit Your Email" />
                                </div>
                                <div>
                                    <label for="password" className="form-label">password</label>
                                    <input name='password' value={edit.password} onChange={handleChange} type="text" className="form-control" id="password" placeholder="Edit Your password" />
                                </div>
                                <div>
                                    <label for="profileCreationDate" className="form-label">profileCreationDate</label>
                                    <input name='profileCreationDate' value={edit.profileCreationDate} onChange={handleChange} type="text" className="form-control" id="profileCreationDate" placeholder="Edit Your profileCreationDate" />
                                </div>
                                <div>
                                    <label for="adminID" className="form-label">Admin ID</label>
                                    <input name='adminId' value={edit.adminId} onChange={handleChange} type="text" className="form-control" id="adminID" placeholder="Edit Your admin ID" />
                                </div>

                                {/* <div>
                                    <label for="id" className="form-label"> ID</label>
                                    <input name='id' value={edit.id} onChange={handleChange} type="text" className="form-control" id="id" placeholder="Edit Your Employee Id" />
                                </div> */}


                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
}

export default page