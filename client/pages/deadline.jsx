"use clinet"

import Image from 'next/image'
import logo from "../assets/1.png"
import './globals.css'
import Head from "next/head"




const deadline = () => {
    return <>
   <Head>
        <title>Dealine page 12566</title>
        <link rel="icon" type="image/png" sizes="16x6" href="/1.png" />

      </Head>
        <div className='h-screen px-10 py-2 bg-white  '>
            <div className=' my-2 flex  gap-2 items-end px-2'>
                <Image
                    src={logo}
                    width={40}
                    height={20}
                    alt="Firelama logo"
                />
                <p className='text-xl font-semibold text-pink-500'>FireLama pvt.ltd</p>
            </div>

            <div className='px-4 bg-gray-200 h-[20rem] flex  items-center '>
                <div className='flex flex-col gap-4'>
                    <p className=' text-6xl font-bold text-gray-600'>The deadline for this task is over. </p>
                    <p className=' text-3xl font-semibold text-gray-600'>Keeping this in mind the page has been disabled. The deadline cannot be extended further. </p>
                </div>
            </div>
            <div className=' text-end mt-3'>
                <p className='text-gray-600 text-xs font-bold'>Terms & Conditions | Privacy Policy | Copyright @ Bolt IoT</p>
            </div>
        </div>

    </>
}

export default deadline