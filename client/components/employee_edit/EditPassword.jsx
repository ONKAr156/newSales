import axios from "axios";
import { useState } from "react"
import { toast } from 'react-toastify';

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

  export default EditPassword