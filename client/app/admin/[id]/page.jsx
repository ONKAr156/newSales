"use client"
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useGetAdminQuery } from '@/app/redux/api/AdminApi';
import Pagination from '../../../components/Pagination'
import { io } from "socket.io-client"



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
    const [active, setActive] = useState("Email")
    const [employees, setEmployees] = useState([])
    const [adminData, setAdminData] = useState()
    const [rvc, setRvc] = useState()
    const [progress, setProgress] = useState(false)

    const search = useSearchParams()
    const router = useRouter()
    const { data } = useGetAdminQuery(params.id)
    // console.log(data) // all admin data fetched here

    const handleLogout = async () => {
        try {
            const response = await axios.post(`http://localhost:3000/api/employee/logout`, {}, {
                withCredentials: true
            });
            console.log(response.data);
            toast.success('logout success')
            router.push('/login')
        } catch (error) {
            console.error('Error while logging out:', error);

        }
    };

    // Fetching Admin id when the component mounts
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             setAdmin(data);
    //             console.log(admin)
    //             // console.log(admin);
    //             toast.success('Welcome')
    //         } catch (error) {
    //             if (error.response && error.response.status === 401) {
    //                 router.push('/login');
    //             }
    //             else {
    //                 console.error('Error fetching admin data:', error);
    //                 toast.error('Failed to  fetch admin data'); // Handle general error
    //             }
    //         }
    //     };

    //     fetchData();
    // }, [params.id])


    const xc = JSON.stringify(data)
    // console.log(`JSON Data:${xc}`)

    const socket = io("http://localhost:3000")
    useEffect(() => {
        if (data) {
            socket.on("connect", () => {
                console.log("admin user ", socket.id);
            })
            socket.emit("message", xc)
            // console.log(xc, "anfnasn");
            socket.on("recive-message", (recive) => {
                // console.log(`return data: ${recive}`, setAdminData(recive))
                setAdminData(recive)
            })
        }

    }, [data])


    console.log(`AdminData: ${adminData}`);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const { data } = await axios.get(`http://localhost:3000/api/admin/${params.id}`, {
    //                 withCredentials: true
    //             });
    //             setAdmin([data]);
    //             toast.success('Welcome'); // Handle success

    //             // If a 401 is returned, redirect to the login page
    //         } catch (error) {
    //             if (error.response && error.response.status === 401) {
    //                 router.push('/login');
    //             }
    //             else {
    //                 console.error('Error fetching admin data:', error);
    //                 toast.error('Failed to  fetch admin data'); // Handle general error
    //             }
    //         }
    //     };

    //     fetchData();
    // }, [params.id])


    // Fetching employees when the component mounts
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:3000/api/employee/fetchemployees`);
    //             const data = await response.json();
    //             setEmployees(data);
    //         } catch (error) {
    //             console.error('Error fetching employee data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    const toggleStatus = () => {
        setProgress((data) => !data);
        console.log(" togglestatus  completed");
    };
    useEffect(() => {
        console.log(progress, "page reloaded")
    }, [progress])

    useEffect(() => {
        toast.success("welcome admin")
    }, [data])

    return <>
        {  /*   <button onClick={e => socket.emit('getAdmin', data)}>add</button> */}
        <div className='min-h-screen bg-gray-100 p-4'>
            {/* <pre>{JSON.stringify(admin, null, 2)}</pre> */}
            <p className='md:text-2xl my-2 font-semibold text-center'>Admin Dashboard</p>

            {/* Admin Data -------------------------------------------------------------- */}
            <div className='bg-slate-50 shadow-lg p-4 md:h-[10rem] rounded-lg mb-4'>

                {data && (
                    <div className='flex flex-col md:flex-row  md:justify-between md:items-center h-full gap-0 md:gap-4 p-2' key={data.id}>

                        <div className='mb-4 md:mb-0 md:mr-4'>
                            <div className='flex flex-col'>
                                <div className='mb-2'>
                                    <span className='md:text-lg font-semibold'>Name:</span>
                                    <span className='md:text-lg'> {data.firstName} {data.lastName}</span>
                                </div>
                                <div>
                                    <span className='md:text-lg font-semibold'>ID: </span>
                                    <span className='md:text-lg'>{data.id}</span>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col md:justify-between gap-2 mb-4 md:mb-0'>
                            <div className='mb-2'>
                                <span className='md:text-lg font-semibold'>Date of joining: </span>
                                <span className='md:text-lg'>{data.profileCreationDate}</span>
                            </div>
                            <div>
                                <span className='md:text-lg font-semibold'>AdminID: </span>
                                <span className='md:text-lg'>{data.adminId}</span>
                            </div>
                        </div>

                        <div className='mb-4 md:mb-0'>
                            <div className='mb-2'>
                                <span className='md:text-lg font-semibold'>Email: </span>
                                <span className='md:text-lg'>{data.email}</span>
                            </div>
                        </div>

                        <div>
                            <Link href={"/candidates"} className='text-sm md:text-base'>
                                <button type="button" className="bg-blue-600 text-white px-4 py-1 md:py-2 rounded-sm ">
                                    Candidates
                                </button>
                            </Link>

                        </div>
                        <div>
                            <button type="button" className="bg-blue-600 text-white px-4 py-1 md:py-2 rounded-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <span className='text-sm md:text-base'>Edit</span>
                            </button>
                        </div>
                        <div className='text-end'>
                            <button
                                // data-bs-toggle="modal" data-bs-target="#logoutModal"
                                onClick={handleLogout}
                                className='bg-blue-600 p-2  text-slate-50 rounded-sm'>
                                Logout
                            </button>
                        </div>

                    </div>
                )}

            </div>
            {/* Summary ------------------------------------------------------------------ */}
            {/* <div className="bg-slate-100 shadow-md  p-4 mb-4 mt-2 rounded-lg">
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
            </div> */}

            {/* All Employee's List ------------------------------------------------------ */}
            <div className="bg-slate-50 shadow-md rounded p-4 ">
                <div className="overflow-x-auto">
                    <Pagination />
                </div>
            </div>
        </div>

        {/*Admin Edit Modal (Email or Password)-------------------------------------------- */}

        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">

                <div className="modal-content">
                    <div className="modal-header">
                        {/* <pre>{JSON.stringify(edit, null, 2)}</pre> */}
                        <h5 className="modal-title" id="exampleModalLabel">Edit Admin data</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className='flex gap-2'>
                            <button className={`${(active == "Email") ? "bg-blue-600 text-slate-100 p-2" : "p-2 bg-slate-200"}`}
                                onClick={() => setActive('Email')}
                            >Email</button>

                            <button className={`${(active == "Password") ? "bg-blue-600 text-slate-100 p-2" : "p-2 bg-slate-200"}`}
                                onClick={() => setActive('Password')}
                            >Password</button>
                        </div>

                        <div>
                            {
                                active == "Email" ? <EditEmail params={params} toggle={toggleStatus} /> : <EditPassword params={params} toggle={toggleStatus} />
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </>
}

//  EDIT EMAIL------------------------------------------------------------------------
const EditEmail = ({ params, toggle }) => {
    const [emailData, setEmailData] = useState({
        currentPassword: "",
        newEmail: "",
        OTP: "",
    })
    const [status, setStatus] = useState()
    const [complete, setComplete] = useState()
    const [errorData, setErrorData] = useState()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmailData({ ...emailData, [name]: value });

    };
    const handelSubmit = async e => {
        e.preventDefault()
        console.log(emailData);
        console.log((params.id))
        try {
            if (status === undefined) {
                const response = await axios.post(`http://localhost:3000/api/admin/checkpass/${params.id}`, emailData)

                setStatus(200)
                toast.success("OTP Sent successfully")
                console.log('200 abjfbajbfja')

            } else if (status === 200) {
                const response = await axios.post(`http://localhost:3000/api/admin/otp/${params.id}`, emailData)
                console.log('OTP matched successfully')
                setStatus(201)

            } else if (status === 201) {
                const response = await axios.put(`http://localhost:3000/api/admin/updateEmail/${params.id}`, emailData)
                setComplete(true)
                console.log('Email updated successfully ')
                setStatus(undefined)
                toast.success("Email Updated successfully")
                setComplete("updated")
            }

        } catch (error) {
            if (error.response) {
                // setErrorData(error.response.data.message);
                setErrorData(error.response.data.message);
            } else {
                setErrorData('An error occurred during update Email');
            }
            setTimeout(() => {
                setErrorData("");
            }, 2500)
        }
        setEmailData({
            currentPassword: "",
            newEmail: "",
            OTP: "",
        })

    }

    useEffect(() => {
        console.log("page reloaded email se");
    }, [complete])


    return <>
        <div className="h-full flex flex-col justify-between">
            {/* <pre>{JSON.stringify(status, null, 2)}</pre> */}
            <form action="" onSubmit={handelSubmit}>
                <div className=" p-3">
                    {
                        status ? "" : <div className="my-2">
                            <label className="md: text-lg" htmlFor="currentPassword">Enter Current Password<span className="text-red-600">*</span></label>
                            <input
                                name="currentPassword"
                                value={String(emailData.currentPassword)}
                                onChange={handleChange}
                                className="w-full my-2 border p-2 rounded-md" type="text" placeholder="Enter current Password" id="currentPassword" required />
                            <p>{errorData}</p>
                        </div>
                    }
                    {
                        status === 200 ?
                            <div className="my-2">
                                <label className="md: text-lg" htmlFor="OTP">Enter OTP<span className="text-red-600">*</span></label>
                                <input
                                    name="OTP"
                                    value={String(emailData.OTP)}
                                    onChange={handleChange}
                                    className="w-full my-2 border p-2 rounded-md" type="number" placeholder="Enter your OTP" id="OTP" required />
                                <p>{errorData}</p>
                            </div> : ''
                    }
                    {
                        status === 201 ?
                            <div className="my-2">
                                <label className="md: text-lg" htmlFor="newEmail">Enter newEmail<span className="text-red-600">*</span></label>
                                <input
                                    name="newEmail"
                                    value={String(emailData.newEmail)}
                                    onChange={handleChange}
                                    className="w-full my-2 border p-2 rounded-md" type="email" placeholder="Enter your new Email" id="newEmail" required />
                                <p>{errorData}</p>
                            </div> : ''
                    }

                </div>
                <div className="my-2 text-end ">

                    {
                        status ? "" : <button type="submit" className=" bg-blue-600 text-slate-50 px-3 md:px-5 py-1 md:py-2">Check</button>
                    }
                    {
                        status === 200 ? <button type="submit" className=" bg-blue-600 text-slate-50 px-3 md:px-5 py-1 md:py-2" >Verify OTP</button> : status === 201
                            ?
                            <button
                                type="submit"
                                onClick={toggle}
                                className=" bg-blue-600 text-slate-50 px-3 md:px-5 py-1 md:py-2"
                                data-bs-dismiss={status === 201 ? `modal` : ""}
                            >submit</button> : ""
                    }

                </div>
            </form>
        </div>
    </>
}

// Edit Password----------------------------------------------------------------------

const EditPassword = ({ params, toggle }) => {
    const x = useSearchParams()
    const [passData, setPassData] = useState({
        currentPassword: "",
        newPassword: "",
    })
    const [status, setStatus] = useState()
    const [errorData, setErrorData] = useState()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPassData({ ...passData, [name]: value });

    };

    const handlePassSubmit = async (e) => {
        e.preventDefault();
        try {
            if (status === undefined) {
                const response = await axios.post(`http://localhost:3000/api/admin/checkpass-pass/${params.id}`, passData)
                setStatus(200)
                toast.success("Password Matched")
                console.log(response.status);
            }
            if (status == 200) {
                const response = await axios.put(`http://localhost:3000/api/admin/passupdate/${params.id}`, passData)
                console.log(response.data.message);
                setStatus(response.data.message)
                toast.success("Password updated")
                setStatus(undefined)


            }

        } catch (error) {
            console.error('Error while posting  current password', error);
            setErrorData(error.response.data.message)
            setTimeout(() => {
                setErrorData("");
            }, 2500)
        }
        setPassData({
            currentPassword: "",
            newPassword: "",

        })
    };


    return <>
        <div className="h-full flex flex-col justify-between">
            {/* <pre>{JSON.stringify(passData, null, 2)}</pre> */}
            <form onSubmit={(e) => handlePassSubmit(e)}>
                <div className=" p-3">
                    {
                        status === undefined ? <div className="my-2">
                            <label className="md: text-lg" htmlFor="currPass">Current Password<span className="text-red-600">*</span></label>
                            <input
                                name="currentPassword"
                                value={String(passData.currentPassword)}
                                onChange={handleChange}
                                className="w-full my-2 border p-2 rounded-md" type="password" placeholder="Enter current Password" id="currPass" />

                        </div> : ""
                    }

                    {
                        status === 200 ? <div>

                            <div className="my-2">
                                <label className="md: text-lg" htmlFor="newPass">New Password<span className="text-red-600">*</span></label>
                                <input
                                    name="newPassword"
                                    value={String(passData.newPassword)}
                                    onChange={handleChange}
                                    className="w-full my-2 border p-2 rounded-md" type="text" placeholder="Enter new Password" id="newPass" required />
                            </div>


                        </div> : ""
                    }

                </div>
                <div className="my-2 text-end ">
                    {
                        status === undefined ? <button type="submit" className=" bg-blue-600 text-slate-50 px-3 md:px-5 py-1 md:py-2">check</button> : ""
                    }
                    {
                        status === 200 ? <button type="submit" onClick={toggle} className=" bg-blue-600 text-slate-50 px-3 md:px-5 py-1 md:py-2" data-bs-dismiss="modal">Submit</button> : ""
                    }

                </div>
            </form>
            <p>{errorData}</p>
        </div>

    </>
}

export default page