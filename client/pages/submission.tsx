import React, { useState } from 'react'
import './globals.css'
import { useFormik } from "formik";
import * as yup from "yup";
const submission = () => {
    const [data, setData] = useState(true)
    const formik = useFormik({
        initialValues: {
            email: "",
            doc: "",
        },
        validationSchema: yup.object({
            email: yup.string().required('Enter Email ').email(),
            doc: yup.string().required("Enter CV/Resume"),
          
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            resetForm();
            setData(false)
        },
    });

  return <>
   <div className="min-h-screen md:h-screen  flex items-center justify-center bg-gray-100 py-6 px-5 md:px-10">
                <div className="grid grid-cols-12  md:h-[80%] p-6  gap-8  bg-gray-200">
                    {/* Left Side: DATA*/}
                    <div className="col-span-12 md:col-span-6 flex-1  p-6 rounded-md flex flex-col justify-start items-center">
                        <p className="text-xl md:text-3xl font-semibold mb-4 text-start">
                            CV Submission for student Partner internship                        </p>
                        <div className="md:text-lg">
                           <div className='flex  flex-col gap-2 md:text-lg'>
                            <p>Read the instructions carefully before submitting the form</p>
                            <p>1. Submit your CV/Resume in the form along with your E-mail ID</p>
                            <p>2. Upload your CV/Resume on cloud service like Google Drive or Dropbox and paste the link in the section given in the form.</p>
                            <p className='font-semibold'>3. Important: Make sure your E-MAIL ID used is same as that used earlier at the time of applying to the student partner program </p>
                            <p>4. In case the E-mail ID does not match then the system will not map your CV/Resume against your name. </p>
                           </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}

                    <div className="col-span-12 md:col-span-6 w-full flex flex-col item-center  justify-center items-center  ">
                    <div className=" w-full bg-white p-5 shadow-3xl my-3 rounded-lg ">
                        <h3 className='font-semibold text-lg md:text-xl'>Submit your CV/Resume in the form below</h3>
                        {
                            data?<form onSubmit={formik.handleSubmit}>
                            <div className="my-4">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-600"
                                >
                                     Email
                                </label>
                                <input
                                    {...formik.getFieldProps("email")}
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={`mt-1 p-3 block w-full rounded-md border focus:ring focus:ring-indigo-200
                                    ${formik.touched.email && formik.errors.email?"is-invalid":"is-valid"}
                                    `}
                                    placeholder='johndeo@gmail.com'
                                    required
                                />
                                <div className="is-invalid text-red-600"> {formik.errors.email}</div>
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="doc"
                                    className="block text-sm font-medium text-gray-600"
                                >
                                   CV/Resume Link
                                </label>
                                <input
                                    type="text"
                                    {...formik.getFieldProps("doc")}
                                    id="doc"
                                    name="doc"
                                    className={`mt-1 p-3 block w-full rounded-md border focus:ring focus:ring-indigo-200
                                    ${formik.touched.doc && formik.errors.doc?"is-invalid":"is-valid"}
                                    `}
                                    required
                                />
                                <div className="is-invalid text-red-600"> {formik.errors.doc}</div>
                            </div>

                                <button
                                 type="submit"className="bg-green-500 py-2 px-8 rounded-md text-slate-50"   >
                                  Submit
                                </button>
                          
                        </form>:
                        <div className='flex flex-col gap-2 my-4'>
                            <p>Thanks for submitting your CV/Resume</p>
                            <p>In case you are selected for the internship, we'll  let you know about the same via E-mail.</p>
                            <p>For any queries, do not hesitate to E-mail hr@fireLamma.com</p>
                        </div>
                        }
                    </div>
                    </div>
                    
                </div>
            </div>
  
  </>
}

export default submission