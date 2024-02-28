"use client"
import { data } from "@/pages/linechart";
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { MIDDLEWARE_MANIFEST } from "next/dist/shared/lib/constants";
import Link from "next/link";
import { useState, useEffect } from "react"
import { toast } from 'react-toastify';


const Candidates = () => {
    const [allCandidate, setAllCandidate] = useState()
    const [candidate, setCandidate] = useState([])
    const [modalData, setModalData] = useState()
    const [mail, setMail] = useState(false)
    const [shouldRefetch, setShouldRefetch] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [id, setId] = useState()
    const [page, setPage] = useState(1)
    const [emailSent, setEmailSent] = useState(false);

    const currentPage = 10
    const indexOfLastCandidate = currentPage * page;
    const indexOfFirstCandidate = indexOfLastCandidate - currentPage;
    const currentItems = candidate.slice(indexOfFirstCandidate, indexOfLastCandidate);
    // console.log(currentItems);
    const handleNextBtn = () => {
        setPage((prev) => (prev < 10 ? prev + 1 : prev));
    };

    const handlePreviouBtn = () => {
        setPage((prev) => (prev > 1 ? prev - 1 : prev));
    };


    const table = <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white sm:p-2 ">
        <table className="w-full text-sm text-left rtl:text-right bg-slate-900 text-white  ">
            <thead className="text-xs  uppercase border-b border-slate-600">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        #
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Candidates name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Phone number
                    </th>
                    <th scope="col" className="px-6 py-3">
                        College
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Location
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Degree & passing
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Message
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Actions
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Profile
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    currentItems.map((item, i) => <tr className="bg-slate-800 text-slate-400 p-2 text-center hover:bg-slate-900 hover:text-white cursor-pointer border-b-2 border-slate-600  ">
                        <td>{i + 1}</td>
                        <td>{item.firstName} {item.lastName}</td>
                        <td>{item.email}</td>
                        <td className="w-full">{item.phone}</td>
                        <td className="text-xs">{item.college}</td>
                        <td>{item.state}</td>
                        <td>{item.degree} {item.branch} {item.passingYear}</td>
                        <td >
                            {item.status}
                        </td>
                        <td className="pt-2 ">
                            <textarea className=" resize-none p-2 text-slate-200 bg-slate-700 rounded-sm focus:outline-none cursor-pointer" name="" id="" cols="25" rows="4" readOnly>
                                {item.message}
                            </textarea>
                        </td>
                        <td>
                            <button
                                data-bs-toggle="modal" data-bs-target="#exampleModal"
                                onClick={e => setId(`${item._id}`)}
                                className="bg-green-600 text-white px-4 py-1">Edit</button>
                        </td>
                        <td>
                            <Link href={{
                                pathname: `/candidates/${item._id}`

                            }}>
                                <button
                                    className='py-2 px-5  mx-2 bg-blue-600 text-slate-50'>View
                                </button>
                            </Link>
                        </td>
                    </tr>)
                }

            </tbody>
        </table>
    </div>

    const handleStatusFilter = (status) => {
        setCandidate(allCandidate.filter(item => status === "all" ? allCandidate : item.status === status))
        setPage(1)
    }

    const handelPostRequest = async () => {
        setStatusMessage('')
        const endpoint =
            modalData === 'selected' ? `shortlist/${id}` :
                modalData === 'discarded' ? `discard/${id}` :
                    modalData === 'pending' ? `pending/${id}` :
                        false

        try {
            const response = await axios.post(`http://localhost:3000/api/candidate/${endpoint}`);

            if (response.status === 200) {
                console.log('Status updated successfully:', response.data);
                setStatusMessage('Status updated successfully.');
                setShouldRefetch(true);
                toast.success("Status updated successfully ")
            }
        } catch (error) {
            if (error.response?.status === 400) {

                setStatusMessage('Status is the same.');
                toast.error("Status is already the same")
            } else {
                setStatusMessage('An error occurred while updating the status.');
                console.error('Error posting update:', error);
                toast.error("An error occurred while updating the status")

            }
        }
        setModalData(undefined); // Reset modal data after post attempt
    };


    const handelSendMail = async () => {
        try {

            const data = await axios.post("http://localhost:3000/api/candidate/sendemail")
            console.log(data.status);
            if (data.status === 200) {
                toast.success("mail sent successfully")
                setMail(false)
                setReload(true)
            }

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3000/api/candidate`, {
                    withCredentials: true
                });
                setCandidate(data);
                setAllCandidate(data)

            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [modalData]
    )


    useEffect(() => {
        if (emailSent) {
            setEmailSent(false);
        }
    }, [emailSent]);

    return <>
        <div className=" min-h-screen w-full bg-slate-100 p-4 ">
            <p className=" p-4  bg-white text-black font-semibold text-lg sm:text-xl md:text-3xl shadow-xl rounded-md">Candidates Portal</p>
            <div className="mt-6   flex flex-wrap sm:flex-row  justify-between items-center  gap-2">
                <div>
                    {
                        mail ? <button
                            onClick={handelSendMail}
                            className="px-2 md:px-4 py-1 md:py-2 bg-blue-700 text-white rounded-sm">
                            Send Mail
                        </button> : ""
                    }
                </div>
                <div className="flex items-center gap-2">


                    <button
                        onClick={() => `${handleStatusFilter('all')} , ${setMail(false)}`}
                        className="px-2 md:px-4 py-1 md:py-2 bg-green-600 text-white rounded-sm">
                        All
                    </button>

                    <button
                        onClick={() => handleStatusFilter('pending')}
                        className="px-2 md:px-4 py-1 md:py-2 bg-gray-600 text-white rounded-sm">
                        Pending
                    </button>

                    <button
                        onClick={() => ` ${handleStatusFilter('shortlisted')}, ${setMail(true)}`}

                        className="px-2 md:px-4 py-1 md:py-2 bg-blue-600 text-white rounded-sm">
                        Shortlisted
                    </button>

                    <button
                        onClick={() => `${handleStatusFilter('discarded')}, ${setMail(false)}`}
                        className="px-2 md:px-4 py-1 md:py-2 bg-red-600 text-white rounded-sm">
                        Discarded
                    </button>

                    <button
                        onClick={() => `${handleStatusFilter('invited')} , ${setMail(false)}`}
                        className="px-2 md:px-4 py-1 md:py-2 bg-green-600 text-white rounded-sm">
                        Invited
                    </button>


                </div>
            </div>
            {table}

            <div className='text-center mt-10 mb-2 shadow-gray-300'>
                <div className="">
                    <button onClick={handlePreviouBtn} disabled={page === 1} className={`border rounded mx-1 p-2 ${page === 1 ? "hidden" : "bg-blue-600 text-white"}`}>Previous</button>
                    {Array.from({ length: 10 }, (_, index) => (
                        <button
                            key={index}
                            className={`rounded-full bg-slate-50 text-black border mx-1 px-3 py-2 ${page === index + 1 ? 'bg-yellow-400 text-white border-2 ' : ''}`}
                            onClick={() => setPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button onClick={handleNextBtn} disabled={page === 10} className={`border rounded mx-1 p-2 ${page === 10 ? "hidden" : "bg-blue-600 text-white"}`}>Next</button>
                </div>
            </div>

        </div>


        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">

                        <h5 class="modal-title" id="exampleModalLabel">Candidate Status </h5>
                        <h5 class="modal-title" id="exampleModalLabel"> </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div className="flex justify-center items-center gap-3">
                            <button
                                onClick={() => setModalData("selected")}
                                className={`" text-white px-2 md:px-6 py-1 md:py-3" ${modalData === "selected" ? "bg-blue-600" : "bg-blue-300"}`}>Selected</button>
                            <button
                                onClick={() => setModalData("discarded")}
                                className={`" text-white px-2 md:px-6 py-1 md:py-3" ${modalData === "discarded" ? "bg-red-600" : "bg-red-300"}`}>Discared</button>
                            <button
                                onClick={() => setModalData("pending")}
                                className={`" text-white px-2 md:px-6 py-1 md:py-3" ${modalData === "pending" ? "bg-gray-600" : "bg-gray-300"}`}>Pending
                            </button>

                            <button
                                onClick={() => setModalData("invited")}
                                className={`" text-white px-2 md:px-6 py-1 md:py-3" ${modalData === "invited" ? "bg-gray-600" : "bg-gray-300"}`}>Invited
                            </button>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" className="bg-gray-600 text-white px-2 md:px-6 py-1 md:py-3" data-bs-dismiss="modal">Close</button>
                        <button
                            onClick={handelPostRequest}
                            type="button" className="bg-blue-600 text-white px-2 md:px-6 py-1 md:py-3" data-bs-dismiss="modal">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

    </>
}




export default Candidates