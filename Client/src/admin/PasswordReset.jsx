import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PasswordReset = () => {

  const navigate = useNavigate("")

  let [showEmail, setShowEmail] = useState(true);
  let [showOtp, setShowOtp] = useState(false);
  let [showPassword, setShowPassword] = useState(false);

  let [email, setEmail] = useState("");
  let [otp, setOtp] = useState("");
  let [newPassword, setNewPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");

  // store Otp
  let [serverOtp, setServerOtp] = useState("")

  //sent opt 
  const [messagesentOtp, setMessagesentOtp] = useState("")
  const [errorsentOtp, setErrorsentOtp] = useState("")

  // reset pass 
  let [resetMessage, setResetMessage] = useState("");
  let [resetError, setResetError] = useState("")

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessagesentOtp("")
    setErrorsentOtp("")

    try {
      const response = await axios.post("https://blog-fullstackapp.onrender.com/api/v1/auth/forgot-password", { email })
      // setMessagesentOtp("Otp has been sent to your email")

      toast.success("OTP has been sent to your email");
      setShowEmail(false);
      setShowOtp(true);
      setServerOtp(response.data.otp);

    } catch (err) {
      toast.error(err.response.data.message || "Failed to send OTP please try again")
      setErrorsentOtp(err.response.data.message || "Failed to send Otp please try again")
    }

  };

  const handleSubmitOtp = (e) => {
    e.preventDefault();

    console.log(serverOtp, otp);
    if (serverOtp == otp) {
      toast.success("OTP matched!");
      setShowOtp(false);
      setShowPassword(true)
    } else {

      toast.error("Invalid OTP, please try again");
    }

    console.log(serverOtp);

  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setResetError("");
    setResetMessage("");

    if (newPassword !== confirmPassword) {
      toast.error("Password Do not match")
      setResetError("Passwords do not match");
      return;
    }


    try {
      const response = await axios.post("https://blog-fullstackapp.onrender.com/api/v1/auth/reset-password", { email, otp: otp, newPassword })
      toast.success("Password reset successful")
      setResetMessage("Password reset successful!")

      navigate("/admin-login")
    } catch (error) {
      toast.error("Failed to reset password")
      setResetError("Failed to reset password")
      console.log(error);

    }
    console.log(newPassword, confirmPassword);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md dark:bg-gray-800 dark:border-gray-700 p-6 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>

          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
            {/* Email Step */}

            {showEmail && (
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email Here"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                />
                <button
                  onClick={handleSendOtp}
                  className="w-full mt-4 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Send OTP
                </button>
                {messagesentOtp && <p className="text-green-600 mt-4">{messagesentOtp}</p>}
                {errorsentOtp && <p className="text-red-600 mt-4">{errorsentOtp}</p>}
              </div>
            )}

            {/* OTP Step */}

            {showOtp && (
              <div>
                <label
                  htmlFor="otp"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter the OTP sent to your email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                />
                <button
                  onClick={handleSubmitOtp}
                  className="w-full mt-4 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Submit OTP
                </button>
              </div>
            )}

            {/* Password Reset Step */}

            {showPassword && (
              <>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter New Password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <div>

                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Enter Confirm Password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <button
                  onClick={handleResetPassword}
                  className="w-full mt-4 text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                >
                  Reset Password
                </button>

              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
export default PasswordReset;
