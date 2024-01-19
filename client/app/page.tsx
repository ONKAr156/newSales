import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const page = () => {

  return <>

    <div className='h-screen flex flex-col gap-4 justify-center items-center text-slate-50  bg-slate-950'>
      <h1 className='text-2xl'> Welcome to sales portal </h1>
      <div className='bg-slate-900 w-96 p-4'>
        <div className=' flex flex-col  gap-3 rounded-xl'>
          <li> <Link href={'/login'}>Login</Link></li>
          <li><Link href={'/admin_register'}>Admin Register</Link></li>
          <li><Link href={'/emp_register'}>Employee Register</Link></li>
        </div>
      </div>

    </div>

  </>
}

export default page