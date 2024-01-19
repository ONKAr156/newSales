"use client";
import { useFormik } from "formik";
import React, { useState } from "react";
import './globals.css'
import * as yup from "yup";

interface Data {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    profileCreationDate: String,
    sale: Number,
    id: Number,
    referalID: String,
}

const Bolt = () => {
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            Phone: "",
            collegeName: "",
            collegeCity: "",
            collegeState: "",
        },
        validationSchema: yup.object({
            firstName: yup.string().required("Enter FirstName"),
            lastName: yup.string().required("Enter LastName"),
            email: yup.string().required('Enter Email ').email(),
            Phone: yup.string().required("Enter phone number"),
            collegeName: yup.string().required("Enter college name"),
            collegeCity: yup.string().required("Enter college city"),
            collegeState: yup.string().required("Enter college state"),
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            resetForm();
        },
    });

    const country = [
        { id: 1, name: "USA", code: "+1" },
        { id: 2, name: "Canada", code: "+1" },

        { id: 3, name: "UK", code: "+44" },
        { id: 4, name: "Germany", code: "+49" },
        { id: 5, name: "France", code: "+33" },
        { id: 6, name: "Australia", code: "+61" },
        { id: 7, name: "Japan", code: "+81" },
        { id: 8, name: "Brazil", code: "+55" },
        { id: 9, name: "India", code: "+91" },
        { id: 10, name: "South Africa", code: "+27" },
    ];
    const Branch = [
        { field: "" },
        { field: "Computer Science and Engineering" },
        { field: "Electrical Engineering" },
        { field: "Civil Engineering" },
        { field: "Statistics and Informatics" },
        { field: "Mechanical Engineering" },
        { field: "Aerospace Engineering" },
        { field: "Fashion Technology" },
        { field: "Biotechnology" },
        { field: "Chemical Engineering" },
        { field: "Medical Engineering" },
        { field: "Other" },
    ];
    const Degree = [
        { degree: "" },
        { degree: "Bachelor of Technology (B.Tech)" },
        { degree: "Bachelor of Science (B.Sc)" },
        { degree: "Bachelor of Engineering (B.E)" },
        { degree: "Bachelor of Statistics and Informatics" },
        { degree: "Bachelor of Medicine, Bachelor of Surgery (MBBS)" },
        { degree: "Bachelor of Arts (B.A)" },
        { degree: "Bachelor of Business Administration (BBA)" },
        { degree: "Bachelor of Environmental Science" },
        { degree: "Bachelor of Commerce (B.Com)" },
        { degree: "Bachelor of Fine Arts (BFA)" },
    ];
    const Year = [
        { year: "" },
        { year: 2012 },
        { year: 2013 },
        { year: 2015 },
        { year: 2014 },
        { year: 2016 },
        { year: 2013 },
        { year: 2015 },
        { year: 2014 },
        { year: 2014 },
        { year: 2016 },
        { year: 2017 },
        { year: 2018 },
        { year: 2020 },
        { year: 2019 },
        { year: 2021 },
        { year: 2018 },
        { year: 2020 },
        { year: 2019 },
        { year: 2019 },
        { year: 2021 },
        { year: 2022 },
        { year: 2023 },
        { year: 2025 },
        { year: 2024 },
        { year: 2026 },
        { year: 2023 },
        { year: 2025 },
        { year: 2024 },
        { year: 2024 },
        { year: 2026 },
        { year: 2027 },
        { year: 2028 },
        { year: 2030 },
    ];

    const [selectedCountry, setSelectedCountry] = useState<String>();

    const handelCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedId = e.target.value;
        setSelectedCountry(selectedId);
        console.log("Selected Country ID:", selectedId);
        const phoneCode = country.filter(
            (item) => item.id == parseInt(selectedId, 10)
        );
        if (phoneCode) {
            console.log("Phone Code:", phoneCode[0].code);
        }
        setSelectedCountry(phoneCode[0].code);
    };

    const [formData, setFormData] = useState<Data>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profileCreationDate: "",
    sale: 0,
    id: 0,
    referalID: "",
    });
   

    
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="grid grid-cols-12 bg-white p-6 rounded shadow-md  gap-6 ">
                    {/* Left Side: Form */}
                    <div className="col-span-12 md:col-span-6 flex-1 bg-gray-200 p-6 rounded-md flex flex-col justify-start items-center">
                        <h2 className="text-lg md:text-xl font-semibold mb-4">
                            Student Partner Internship
                        </h2>
                        <p className="md:text-lg">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
                            arcu eu erat tincidunt fermentum. Integer ullamcorper urna eu
                            augue laoreet, non tincidunt velit tempus. Donec euismod tincidunt
                            libero, a volutpat est efficitur non. Fusce vel vehicula justo.
                            Nullam commodo quam vel nisi feugiat, a suscipit erat bibendum. In
                            sollicitudin rhoncus libero a dictum. Etiam euismod dolor at odio
                            congue vestibulum. orem ipsum dolor sit amet, consectetur
                            adipiscing elit. Sed ut arcu eu erat tincidunt fermentum. Integer
                            ullamcorper urna eu augue laoreet, non tincidunt velit tempus.
                            Donec euismod tincidunt libero, a volutpat est efficitur non.
                            Fusce vel vehicula justo. Nullam commodo quam vel nisi feugiat, a
                            suscipit erat bibendum. In sollicitudin rhoncus libero a dictum.
                            Etiam euismod dolor at odio congue vestibulum.orem ipsum dolor sit
                            amet, consectetur adipiscing elit. Sed ut arcu eu erat tincidunt
                            fermentum. Integer ullamcorper urna eu augue laoreet, non
                            tincidunt velit tempus. Donec euismod tincidunt libero, a volutpat
                            est efficitur non. Fusce vel vehicula justo. Nullam commodo quam
                            vel nisi feugiat, a suscipit erat bibendum. In sollicitudin
                            rhoncus libero a dictum. Etiam euismod dolor at odio congue
                            vestibulum.
                        </p>
                    </div>

                    {/* Right Side: Random Text */}

                    <div className="col-span-12 md:col-span-6 w-full flex-1">
                        <form onSubmit={formik.handleSubmit}>
                            {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
                            <div className="mb-4">
                                <label
                                    htmlFor="firstName"
                                    className="block text-sm font-medium text-gray-600"
                                >
                                    1) First Name
                                </label>
                                <input
                                    type="text"
                                    {...formik.getFieldProps("firstName")}
                                    id="firstName"
                                    name="firstName"
                                    className={`mt-1 p-3 block w-full rounded-md border focus:ring focus:ring-indigo-200
                                    ${formik.touched.firstName && formik.errors.firstName?"is-invalid":"is-valid"}
                                    `}
                                    required
                                />
                                <div className="is-invalid text-red-600"> {formik.errors.firstName}</div>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="lastName"
                                    className="block text-sm font-medium text-gray-600"
                                >
                                    2) Last Name
                                </label>

                                <input
                                    type="text"
                                    {...formik.getFieldProps("lastName")}
                                    id="lastName"
                                    name="lastName"
                                    className={`mt-1 p-3 block w-full rounded-md border focus:ring focus:ring-indigo-200
                                    ${formik.touched.lastName && formik.errors.lastName?"is-invalid":"is-valid"}
                                    `}
                                    required
                                />
                                <div className="is-invalid text-red-600"> {formik.errors.lastName}</div>

                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-600"
                                >
                                    3) Email
                                </label>
                                <input
                                    {...formik.getFieldProps("email")}
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={`mt-1 p-3 block w-full rounded-md border focus:ring focus:ring-indigo-200
                                    ${formik.touched.email && formik.errors.email?"is-invalid":"is-valid"}
                                    `}
                                    required
                                />
                                <div className="is-invalid text-red-600"> {formik.errors.email}</div>
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="Phone"
                                    className="block text-sm font-medium text-gray-600"
                                >
                                    4. Phone number*
                                </label>

                                <div className="flex  gap-2  justify-start w-full items-center">
                                    <select
                                        className="border p-3 rounded-md"
                                        onChange={()=>handelCheck}
                                    >
                                        {country.map(({ id, name }) => (
                                            <option key={id} value={id}>
                                                {name}
                                            </option>
                                        ))}
                                    </select>

                                    <div
                                        className="border flex items-center w-full rounded-md"
                                        id=""
                                    >
                                        <div>{selectedCountry}</div>
                                        <input
                                            type="tel"
                                            {...formik.getFieldProps("Phone")}
                                            id="Phone"
                                            name="Phone"
                                            className={`mt-1 p-3 block w-full rounded-md border focus:ring focus:ring-indigo-200
                                            ${formik.touched.Phone && formik.errors.Phone?"is-invalid":"is-valid"}
                                            `}
                                            required
                                        />
                                        <div className="is-invalid text-red-600 my-2"> {formik.errors.Phone}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="collegeName"
                                    className="block text-sm font-medium text-gray-600"
                                >
                                    5. College/Institute name (Enter the full name and NOT short
                                    form)*
                                </label>
                                <input
                                    type="text"
                                    {...formik.getFieldProps("collegeName")}
                                    id="collegeName"
                                    name="collegeName"
                                    className={`mt-1 p-3 block w-full rounded-md border focus:ring focus:ring-indigo-200
                                    ${formik.touched.collegeName && formik.errors.collegeName?"is-invalid":"is-valid"}
                                    `}
                                    required
                                />
                                <div className="is-invalid text-red-600"> {formik.errors.collegeName}</div>
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="collegeCity"
                                    className="block text-sm font-medium text-gray-600"
                                >
                                    6. City of college / institute*
                                </label>
                                <input
                                    type="text"
                                    id="collegeCity"
                                    {...formik.getFieldProps("collegeCity")}
                                    name="collegeCity"
                                    className={`mt-1 p-3 block w-full rounded-md border focus:ring focus:ring-indigo-200
                                    ${formik.touched.collegeCity && formik.errors.collegeCity?"is-invalid":"is-valid"}
                                    `}
                                    required
                                />
                                <div className="is-invalid text-red-600"> {formik.errors.collegeCity}</div>
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="collegeState"
                                    className="block text-sm font-medium text-gray-600"
                                >
                                    7. State of college / institute*
                                </label>
                                <input
                                    type="text"
                                    {...formik.getFieldProps("collegeState")}
                                    id="collegeState"
                                    name="collegeState"
                                    className={`mt-1 p-3 block w-full rounded-md border focus:ring focus:ring-indigo-200
                                    ${formik.touched.collegeState && formik.errors.collegeState?"is-invalid":"is-valid"}
                                    `}
                                    required
                                />
                                <div className="is-invalid text-red-600"> {formik.errors.collegeState}</div>
                            </div>

                            <div className="mb-4 flex flex-col gap-2 w-full">
                                <label
                                    htmlFor="Branch"
                                    className="block text-sm font-medium text-gray-600"
                                >
                                    8. Branch of study / graduation*
                                </label>
                                <select className="p-3  border rounded-md" id="Branch">
                                    {Branch.map((item) => (
                                        <option>{item.field}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4 flex flex-col gap-2 w-full">
                                <label
                                    htmlFor="degree"
                                    className="block text-sm font-medium text-gray-600"
                                >
                                    9. Graduation degree*
                                </label>
                                <select className="p-3  border rounded-md" id="degree">
                                    {Degree.map((item) => (
                                        <option>{item.degree}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4 flex flex-col gap-2 w-full">
                                <label
                                    htmlFor="graduation"
                                    className="block text-sm font-medium text-gray-600"
                                >
                                    10. Year of graduation / passing*
                                </label>
                                <select className="p-3  border rounded-md" id="graduation">
                                    {Year.map((item) => (
                                        <option>{item.year}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4 flex flex-col gap-2 w-full">
                                <label>
                                    11. Why should you be hired for this 'Student Partner
                                    Internship'?*
                                </label>
                                <div className="flex flex-col justify-between gap-2 ">
                                    <div className="text-sm text-gray-400 flex flex-col justify-between gap-3">
                                        <p>
                                            A. Write about your achievements, positions of
                                            responsibility or anything else that will help us decide
                                            upon your application.
                                        </p>
                                        <p>
                                            B. Share how you plan to create awareness about Bolt IoT
                                            and ML in your college.{" "}
                                        </p>
                                        <p>
                                            <span className="font-semibold text-gray-400">
                                                Be specific with your answer
                                            </span>
                                            , e.g. If you have been part of the college club, then
                                            mention the name of the club, or if you have been an
                                            organiser for a college event, then mention the specific
                                            name of the event and the year.
                                        </p>
                                    </div>
                                    <div className="w-full border rounded-md">
                                        <textarea
                                            className="rounded-md w-full p-3 resize-none"
                                            rows={2}
                                            id="id"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4 flex flex-col gap-2 w-full">
                                <label>
                                    12. Based on the 'Selected intern's responsibilities’
                                    mentioned on this page, which of the following are the tasks
                                    that you will be performing during the internship if selected?
                                    Choose the correct answer below
                                </label>
                                <div className="flex flex-col justify-between gap-2 ">
                                    <div className="text-sm  flex flex-col justify-between gap-3">
                                        <p className="text-gray-400">
                                            This question is to check if you have read and understood
                                            the 'Selected intern's responsibilities'.
                                        </p>
                                        <p className="flex gap-2 items-start">
                                            <input className="mt-2" type="radio" value="" id="id" />
                                            <span>
                                                Promote the IoT and ML online training, increase the
                                                awareness about IoT and ML and organise a webinar in
                                                your college.
                                            </span>
                                        </p>

                                        <p className="flex gap-2 items-start">
                                            <input className="mt-2" type="radio" value="" id="id" />
                                            <span>
                                                Study circuit design, software programming and
                                                accordingly build IoT and ML projects.
                                            </span>
                                        </p>
                                    </div>
                                    <div className="w-full border rounded-md">
                                        <textarea
                                            className="rounded-md w-full p-3 resize-none"
                                            rows={2}
                                            id="id"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4 ">
                                <p className="text-sm my-1">
                                    By submitting this form, you agree to receive communication
                                    over SMS, E-Mail and Whatsapp from Bolt IoT.
                                </p>
                            </div>
                                <button
                                 type="submit"className="bg-gray-800 py-2 px-8 rounded-md text-slate-100"   >
                                  Submit
                                </button>
                          
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Bolt;