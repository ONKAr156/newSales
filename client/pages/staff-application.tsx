import { useState } from 'react';
import './globals.css'

const StaffApplication = () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      college: '',
      graduationField: '',
      graduationYear: '',
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Add your form submission logic here
      console.log(formData);
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full md:w-2/3 lg:w-1/2">
          <h1 className="text-2xl font-semibold mb-4">Staff Application Form</h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-gray-700 font-bold">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="input-field mb-12"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-gray-700 font-bold ">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="input-field mb-12"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
  
            <div>
              <label htmlFor="email" className="block text-gray-700 font-bold ">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input-field mb-12"
                onChange={handleChange}
                required
              />
            </div>
  
            <div>
              <label htmlFor="phoneNumber" className="block text-gray-700 font-bold">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                className="input-field mb-12"
                onChange={handleChange}
                required
              />
            </div>
  
            <div>
              <label htmlFor="college" className="block text-gray-700 font-bold">College</label>
              <input
                type="text"
                name="college"
                placeholder="College"
                className="input-field mb-12"
                onChange={handleChange}
                required
              />
            </div>
  
            <div>
              <label htmlFor="graduationField" className="block text-gray-700 font-bold">Graduation Field</label>
              <input
                type="text"
                name="graduationField"
                placeholder="Graduation Field"
                className="input-field mb-12"
                onChange={handleChange}
                required
              />
            </div>
  
            <div>
              <label htmlFor="graduationYear" className="block text-gray-700 font-bold">Graduation Year</label>
              <input
                type="text"
                name="graduationYear"
                placeholder="Graduation Year"
                className="input-field mb-12"
                onChange={handleChange}
                required
              />
            </div>
  
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default StaffApplication;
  