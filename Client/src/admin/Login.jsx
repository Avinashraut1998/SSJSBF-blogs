import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [visiblePass, setVisiblePass] = useState(false);

  const handleData = (e) => {
    let { name, value } = e.target;
    setData((prevVal) => ({
      ...prevVal,
      [name]: value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    setError("");

    axios
      .post("https://blog-fullstackapp.onrender.com/api/v1/users/login", data)
      .then((response) => {
        console.log(response.data.body.accessToken);
        alert(response.data.message);
        navigate("/admin-login/admin-dashboard");
        console.log(response.data);

        // const {accessToken, refreshToken, message} = response.data.body

        localStorage.setItem("accessToken", response.data.body.accessToken);
       
      })

      .catch((err) => {
        if (err) {
          setError(err.response.data.error);
          alert(err.response.data.error);
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md dark:bg-gray-800 dark:border-gray-700 p-6 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Admin Login
          </h2>

          <form
            onSubmit={submitForm}
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
          >
            {/* Name Field */}
            {/* <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={handleData}
                placeholder="John Doe"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div> */}

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                onChange={handleData}
                placeholder="name@company.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type={visiblePass ? "text" : "password"}
                id="password"
                name="password"
                value={data.password}
                onChange={handleData}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
              <span
                onClick={() => setVisiblePass(!visiblePass)}
                className="absolute right-5 bottom-2 self-center transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {visiblePass ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Forget Password Link */}
            <div className="text-sm text-right">
              <Link
                to="/admin-login/forgetpass"
                className="text-white hover:underline dark:text-primary-400"
              >
                Forgot Password?
              </Link>
            </div>

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default Login;
