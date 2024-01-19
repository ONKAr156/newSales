"use client"
import { data, options } from '@/pages/linechart'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Head from 'next/head';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { toast } from 'react-toastify';

//Home Page
const page = ({ params }) => {
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState("Email")
  const [employees, setEmployees] = useState([])
  const [admin, setAdmin] = useState("true")
  const [logout, setLogout] = useState()
  const [validate, setValidate] = useState("true")
  const [edit, setEdit] = useState({
    email: "",
    password: "",
  })
  // Admin cannot edit Employee's data as a prop  is send here ⤵
  const search = useSearchParams()
  const customers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      product: 'Product A',
      amount: 1000,
      date: '2023-08-01',
    },
    {
      id: 2,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      product: 'Product B',
      amount: 100,
      date: '2023-07-01',
    },
    {
      id: 3,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      product: 'Product A',
      amount: 200,
      date: '2023-07-01',
    },
    {
      id: 4,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      product: 'Product C',
      amount: 5000,
      date: '2023-08-01',
    },
    {
      id: 5,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      product: 'Product A',
      amount: 1000,
      date: '2023-06-01',
    }
  ];
  const filteredCustomers = filter === 'all' ? customers : filter === 'thisMonth'
    ? customers.filter(
      (customer) => new Date(customer.date).getMonth() === new Date().getMonth()
    )
    : customers.filter((customer) => customer.product === filter);
  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'thisMonth', label: 'This Month' },
    { value: 'Product A', label: 'Product A' },
    { value: 'Product B', label: 'Product B' },
    { value: 'Product C', label: 'Product C' },
  ];
  const firstEmployee = employees[0];
  const referalID = firstEmployee ? firstEmployee.referalID : undefined;
  const router = useRouter()
  const handleLogout = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/api/employee/logout`,{},{
        withCredentials:true
      });
      console.log(response.data);
      toast.success('logout success')
      router.push('/login')
      setLogout(true);
    } catch (error) {
      console.error('Error while logging out:', error);
     
    }
  };

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/employee/${params.id}`, {
          withCredentials: true
        });
        setEmployees([data]);
        toast.success('Welcome'); // Handle success
        // If a 401 is returned, redirect to the login page
      } catch (error) {
        if (error.response && error.response.status === 401) {
          router.push('/login');
        } else {
          console.error('Error fetching employee data:', error);
          toast.error('Failed to fetch data'); // Handle general error
        }
      }
    };
  
    fetchData();
  }, [params.id])

  // Check if the admin is viewing
  useEffect(() => {
    if (search.get('name') === null) {
      setAdmin(false);
    } else {
      setAdmin(true);
    }
  }, []);

  

  return <>
   <Head>
        <title>Dealine page 12566</title>
        <link rel="icon" type="image/png" sizes="16x6" href="/1.png" />

      </Head>
    <div> 
          <div className='min-h-screen bg-slate-100 scroll-smooth '>
            <div className='h-full grid grid-cols-12 px-6 md:px-10 py-6  md:py-10  gap-3'>
            
              <div className=' h-[20rem] flex justify-center items-center  col-span-12 md:col-span-6 bg-slate-100'>
                <div className='h-[18rem] w-full flex flex-col justify-center  py-2  md:py-5 px-2 md:px-5  text-sm  md:text-base shadow-xl bg-slate-50  text-black rounded-xl gap-6'>

                  {
                    employees && employees.map((item) => <div className='flex flex-col gap-2' key={item.id}>
                      
                      <div>
                        <div className=' flex justify-between'>
                          <div>
                            <span className='md:text-lg font-semibold mx-2'>Name:</span>
                            <span className='md:text-lg'>{item.firstName} {item.lastName}</span>
                          </div>
                          <div>
                            <span className='md:text-lg font-semibold mx-2'>ID:</span>
                            <span className='md:text-lg'>{item.id}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div >
                          <span className='md:text-lg font-semibold mx-2'>Referal ID:</span>
                          <span className='md:text-lg'>{item.referalID}</span>
                        </div>
                        <div>
                          <span className='md:text-lg font-semibold mx-2'>Email:</span>
                          <span className='md:text-lg '>{item.email}</span>
                        </div>
                      </div>
                      <div>
                        <div className=''>
                          <span className='md:text-lg font-semibold mx-2'>Date of joining:</span>
                          <span className='md:text-lg'>{item.profileCreationDate}</span>
                        </div>
                      </div>
                      <div>
                        <div className=''>
                          <span className='md:text-lg font-semibold mx-2'>Sales:</span>
                          <span className='md:text-lg'>{item.sale}</span>
                        </div>
                      </div>
                      <div>
                        {admin ? "" : <button type="button" className="btn btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                          <span>Edit</span>
                        </button>}

                      
                      </div>
                      <div className='text-end'>
                      <button 
                      // data-bs-toggle="modal" data-bs-target="#logoutModal"
                      onClick={handleLogout}
                      className='bg-blue-600 p-2  
                       text-slate-50'>Logout</button>
                      </div>
                    </div>)

                  }
                </div>
              </div>

              <div className='col-span-12 md:col-span-6   h-[20rem]  bg-slate-50 p-2 flex justify-center rounded-xl shadow-lg '>
                <Line options={options} data={data} />
              </div>

              <div className='col-span-12  py-6 md:py-4  '>
                <div className='col-span-12  py-6 md:py-4  '>
                  <div className="bg-white shadow-md rounded p-4">
                    <h2 className="text-xl font-semibold mb-2">Customer List</h2>
                    <div className="mb-4">
                      <label htmlFor="filter" className="block font-medium text-gray-700">
                        Filter:
                      </label>
                      <select
                        id="filter"
                        name="filter"
                        className="mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                      >
                        {filterOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* customer table ---------------------------------------------------------------- */}
                    <div className="overflow-x-auto">
                      <table className="w-full border border-collapse">
                        <thead>
                          <tr>
                            <th className="border px-4 py-2 sm:px-6 md:px-8">Date</th>
                            <th className="border px-4 py-2 sm:px-6 md:px-8">Customer ID</th>
                            <th className="border px-4 py-2 sm:px-6 md:px-8">Customer Name</th>
                            <th className="border px-4 py-2 sm:px-6 md:px-8">Customer Email ID</th>
                            <th className="border px-4 py-2 sm:px-6 md:px-8">Customer Phone No</th>
                            {filter === 'all' && <th className="border px-4 py-2 sm:px-6 md:px-8">Product</th>}
                            <th className="border px-4 py-2 sm:px-6 md:px-8">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredCustomers.map((customer) => (
                            <tr key={customer.id}>
                              <td className="border px-4 py-2 sm:px-6 md:px-8">{customer.date}</td>
                              <td className="border px-4 py-2 sm:px-6 md:px-8">{customer.id}</td>
                              <td className="border px-4 py-2 sm:px-6 md:px-8">{customer.name}</td>
                              <td className="border px-4 py-2 sm:px-6 md:px-8">{customer.email}</td>
                              <td className="border px-4 py-2 sm:px-6 md:px-8">{customer.phone}</td>
                              {filter === 'all' && <td className="border px-4 py-2 sm:px-6 md:px-8">{customer.product}</td>}
                              <td className="border px-4 py-2 sm:px-6 md:px-8">${customer.amount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <h1 className="text-2xl font-semibold mb-4 ">Monthly Sales</h1>
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 p-2">Month</th>
                      <th className="border border-gray-300 p-2">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.labels.map((label, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 p-2">{label}</td>
                        <td className="border border-gray-300 p-2">{data.datasets[0].data[index]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className='col-span-12 px-4 md:px-10 py-6 md:py-4 '>
                <div className="bg-white shadow-md rounded-xl p-4 mb-4">
                  <h2 className="text-xl font-semibold mb-2">Summary</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-blue-200 p-4 rounded">
                      <p className="text-lg font-semibold mb-1">Total Customers</p>
                      <p>{customers.length}</p>
                    </div>
                    <div className="bg-green-200 p-4 rounded">
                      <p className="text-lg font-semibold mb-1">Customers Onboarded This Month</p>
                      <p>{filteredCustomers.length}</p>
                    </div>
                    <div className="bg-purple-200 p-4 rounded">
                      <p className="text-lg font-semibold mb-1">Earnings Next Month</p>
                      <p>${customers.reduce((total, customer) => total + customer.amount, 0)}</p>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
    </div>

    {/* Edit Modal-------------------------------------------------- */}

    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">

        <div className="modal-content">
          <div className="modal-header">
            {/* <pre>{JSON.stringify(edit, null, 2)}</pre> */}
            <h5 className="modal-title" id="exampleModalLabel">Edit your data</h5>
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
              {/* {
                active == "Email" ? <EditEmail params={params} /> : <EditPassword params={params} />
              } */}
              {
                active == "Email" ? <EditEmail params={params} /> : <EditPassword params={params} />
              }
            </div>
          </div>
        </div>

      </div>
    </div>

    {/* Logout Modal-------------------------------------------------- */}
{/* <div className="modal fade" id="logoutModal" tabindex="-1" aria-labelledby="logoutModalLabel" aria-hidden="true">
  <div className="modal-dialog ">
    <div className="modal-content  ">
      <div className="modal-header">
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <p>Are you sure ??</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-success" data-bs-dismiss="modal">Cancel</button>
        <button onClick={handleLogout} type="button" className="btn btn-danger "data-bs-dismiss="modal">Logout</button>
      </div>
    </div>
  </div>
</div> */}

  </>
}

//  EDIT EMAIL------------------------------------------------------------------------
const EditEmail = ({ params }) => {
  const [emailData, setEmailData] = useState({
    oldEmail: "",
    newEmail: "",
    OTP: "",
  })
  const [status, setStatus] = useState()
  const [errorData, setErrorData] = useState()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({ ...emailData, [name]: value });

  };
  const handelSubmit = async e => {
    e.preventDefault()
    console.log(emailData);
    try {
      if (status === undefined) {
        const response = await axios.post(`http://localhost:3000/api/employee/sendEmail/${(+(params.id))}`, emailData)
        setStatus(200)
        toast.success("OTP Sent successfully")
        console.log('200 abjfbajbfja')

      } else if (status === 200) {
        const response = await axios.post(`http://localhost:3000/api/employee/otp/${(+(params.id))}`, emailData)
        console.log('OTP matched successfully')
        setStatus(201)

      } else if (status === 201) {
        const response = await axios.put(`http://localhost:3000/api/employee/updateEmail/${(+(params.id))}`, emailData)
        console.log('Completed finally')
        setStatus(undefined)
        toast.success("Email Updated successfully")
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
      oldEmail: "",
      newEmail: "",
      OTP: "",
    })

  }

  return <>
    <div className="h-full flex flex-col justify-between">
      {/* <pre>{JSON.stringify(status, null, 2)}</pre> */}
      <form action="" onSubmit={handelSubmit}>
        <div className=" p-3">
          {
            status ? "" : <div className="my-2">
              <label className="md: text-lg" htmlFor="oldEmail">Enter Old Email<span className="text-red-600">*</span></label>
              <input
                name="oldEmail"
                value={String(emailData.oldEmail)}
                onChange={handleChange}
                className="w-full my-2 border p-2 rounded-md" type="email" placeholder="Enter new Email" id="oldEmail" required />
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
            status ? "" : <button type="submit" className=" bg-blue-600 text-slate-50 px-3 md:px-5 py-1 md:py-2">send OTP</button>
          }
          {
            status === 200 ? <button type="submit" className=" bg-blue-600 text-slate-50 px-3 md:px-5 py-1 md:py-2" >Verify OTP</button> : status === 201
              ?
              <button
                type="submit"
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
const EditPassword = ({ params }) => {
  const x = useSearchParams()
  const [passData, setPassData] = useState({
    currentPassword: "",
    confirmPassword: "",
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
      const response = await axios.post(`http://localhost:3000/api/employee/cpass/${(+(params.id))}`, passData)
      setStatus(response.data.message)

      if (status == "true") {
        const response = await axios.put(`http://localhost:3000/api/employee/updateUser/${(+(params.id))}`, passData)
        console.log(response.data);
        setStatus(response.data.message)
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
      confirmPassword: "",
    })
  };



  return <>
    <div className="h-full flex flex-col justify-between">
      {/* <pre>{JSON.stringify(passData, null, 2)}</pre> */}
      <form onSubmit={(e) => handlePassSubmit(e)}>
        <div className=" p-3">


          <div className="my-2">
            <label className="md: text-lg" htmlFor="currPass">Current Password<span className="text-red-600">*</span></label>
            <input
              name="currentPassword"
              value={String(passData.currentPassword)}
              onChange={handleChange}
              className="w-full my-2 border p-2 rounded-md" type="password" placeholder="Enter current Password" id="currPass" />

          </div>

          {
            status ? <div>

              <div className="my-2">
                <label className="md: text-lg" htmlFor="newPass">New Password<span className="text-red-600">*</span></label>
                <input
                  name="newPassword"
                  value={String(passData.newPassword)}
                  onChange={handleChange}
                  className="w-full my-2 border p-2 rounded-md" type="text" placeholder="Enter new Password" id="newPass" required />
              </div>
              <div className="my-2">
                <label className="md: text-lg" htmlFor="confirmPassword">Confirm Password<span className="text-red-600">*</span></label>
                <input
                  name="confirmPassword"
                  value={String(passData.confirmPassword)}
                  onChange={handleChange}
                  className="w-full my-2 border p-2 rounded-md" type="password" placeholder="Enter new Password" id="confirmPassword" required />
              </div>

            </div> : ""
          }

        </div>
        <div className="my-2 text-end ">
          {
            status ? "" : <button type="submit" className=" bg-blue-600 text-slate-50 px-3 md:px-5 py-1 md:py-2">check</button>
          }
          {
            status ? <button type="submit" className=" bg-blue-600 text-slate-50 px-3 md:px-5 py-1 md:py-2" data-bs-dismiss="modal">Submit</button> : ""
          }

        </div>
      </form>
      <p>{errorData}</p>
    </div>

  </>
}


export default page