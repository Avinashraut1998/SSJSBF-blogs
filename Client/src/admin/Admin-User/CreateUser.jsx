import axios from "axios";
import { useState } from "react"
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CreateUser = () => {

  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState("");


  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log(`Subbmiting the form`, data);

    const token = localStorage.getItem("accessToken")

    const config = { headers : {
      'Authorization': 'Bearer ' + token
    }}

    axios.post('https://blog-fullstackapp.onrender.com/api/v1/users/create-user', data, config )
      .then((response) => {
        // console.log(response.data.token);
        toast.success(response.data.message)
        

        // localStorage.setItem("accessToken", response.data.token)
        // console.log("Token stored in localStorage:", response.data.token);

        console.log("Full response:", response);

        // Safely access the token
        // const token = response.data?.token;
        // console.log("Token:", token);

        // if (token) {
        //   localStorage.setItem("accessToken", token);
        //   console.log("Token stored in localStorage:", token);
        // } else {
        //   console.warn("Token not found in response");
        // }
        
        reset();


      })
     .catch((err) => {
      console.log("Full error response:", err?.response?.data);
      setError(err?.response?.data?.error || "An unexpected error occurred.");
      toast.error(err?.response?.data?.error || "An error occurred.");
    });

  }

  return (
    <>
      <button
        className=" bg-primary  text-black active:bg-pink-600 font-bold uppercase text-sm px-3 py-1.5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Create User
      </button>

      {
        showModal ?
          (<>
            <div className="justify-center z-9999 items-center flex overflow-x-hidden overflow-y-auto   fixed inset-0  outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white  outline-none focus:outline-none">
                  {/*header*/}
                  <div className="border-b border-stroke px-5 py-2 dark:border-strokedark">
                    <h3 className="font-medium text-title-sm text-black ">
                      Create User
                    </h3>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto overflow-y-auto max-h-80 md:max-h-90">
                    {/* Ensure to set max height and overflow for the content */}
                    <form onSubmit={handleSubmit(onSubmit)} className="font-thin text-sm ">
                      {/* name  */}
                      <div className="mb-4.5 flex flex-col gap-3 md:flex-row">
                        <div className="w-full xl:w-1/3">
                          <label className="mb-1.5 block text-black ">
                            User Name <span className="text-meta-1">*</span>
                          </label>
                          <input
                            type="text"
                            // name="username"
                            {...register("userName")}
                            placeholder="User Name"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />
                        </div>

                        <div className="w-full xl:w-1/3">
                          <label className="mb-2.5 block text-black ">
                            First Name <span className="text-meta-1">*</span>
                          </label>
                          <input
                            type="text"
                            // name="firstname"
                            {...register("firstName")}
                            placeholder="firstname"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />
                        </div>

                        <div className="w-full xl:w-1/3">
                          <label className="mb-2.5 block text-black ">
                            Last name <span className="text-meta-1">*</span>
                          </label>
                          <input
                            type="text"
                            // name="lastname"
                            {...register("lastName")}
                            placeholder="last name"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />
                        </div>
                      </div>
                      {/* email and phone no  */}
                      <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
                        <div className="w-full xl:w-1/3">
                          <label className="mb-2.5 block text-black ">
                            Email <span className="text-meta-1">*</span>
                          </label>
                          <input
                            type="email"
                            // name="email"
                            {...register("email")}
                            placeholder="email"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />
                        </div>

                        <div className="w-full xl:w-1/3">
                          <label className="mb-2.5 block text-black ">
                            Password <span className="text-meta-1">*</span>
                          </label>
                          <input
                            type="password"
                            // name="password"
                            {...register("password")}
                            placeholder="password"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />
                        </div>

                        <div className="w-full xl:w-1/3">
                          <label className="mb-2.5 block text-black ">
                            Phone No <span className="text-meta-1">*</span>
                          </label>
                          <input
                            type="number"
                            // name="phone no"
                            {...register("phoneNumber")}
                            placeholder="phone no"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                        </div>

                      </div>
                      {/* Role */}

                      <div className="w-full xl:w-1/3">
                        <label className="mb-2.5 block text-black ">
                          Role <span className="text-meta-1">*</span>
                        </label>
                        <select
                          {...register("role")}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary"
                        >
                          <option value="">Select Role</option>
                          <option value="admin">Admin</option>
                          <option value="editor">Editor</option>
                          <option value="user">User</option>
                        </select>
                        {/* <input
                          type="text"
                          // name="role"
                          {...register("role")}
                          placeholder="Role"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-1.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        /> */}
                      </div>
                      {error ? <p className="text-red-500 text-sm mb-3">{error}</p> : null}
                      <button
                        className="inline-flex items-center justify-center bg-primary px-1 py-1 text-center font-normal  text-black hover:bg-opacity-90 md:px-2 xl:px-4"
                        type="submit"
                      // onClick={handleFormSubmit}
                      >
                        Save
                      </button>
                    </form>

                    {/* Address */}
                    {/* error message  */}

                  </div>
                  {/*footer*/}
                  <div className="flex items-center text-title-sm justify-end gap-2 p-2 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="inline-flex items-center justify-center bg-danger px-1 py-1 text-center font-normal text-black hover:bg-opacity-90 md:px-2 xl:px-4"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="inline-flex items-center justify-center bg-primary px-1 py-1 text-center font-normal  text-black hover:bg-opacity-90 md:px-2 xl:px-4"
                      type="button"
                    // onClick={handleFormSubmit}
                    >
                      Save
                    </button>
                  </div>

                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
          ) : null
      }
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </>
  )

}
export default CreateUser