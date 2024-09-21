import React, { useEffect, useState } from "react";
import { Navigate, useNavigate ,Link} from "react-router-dom";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const [valid, setvalid] = useState(false);
  const navigate = useNavigate();

  async function logApi() {
    const res = await fetch("http://127.0.0.1:8000/user/login/", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data1 = await res.json();
      const userid=data1['id']
      const token=data1['token']
      localStorage.setItem('userid',userid)
      localStorage.setItem('token',token)
      console.log(data1,userid);
      navigate("/home");
    } else {
      const data1 = await res.json();
      alert(data1.msg);
    }
  }

  useEffect(() => {
    function validlogin(email, pass) {
      setvalid(false)
      seterror("");
      let errormsg = "Please correct the following issues:\n";
      if (email.length == 0) {
        errormsg += "Email should not be empty \n";
        seterror(errormsg);
      }
      if (pass.length <= 8) {
        errormsg += "Password must have at least 8 characters\n";
        seterror(errormsg);
      }
      if (pass.length >= 8 && email.length > 0) {
        setvalid(true);
      }
    }
    validlogin(email,password);
  }, [email, password]);
const handleSubmit = async (e) => {
  e.preventDefault();
  if (valid) {
    logApi();
  } else alert(error);
};

return (
  <section className="bg-gray-50 h-screen  items-center justify-center flex flex-col">
    <h1 className="font-bold text-[50px]">Login</h1>
    <div className="flex flex-col items-center justify-center w-[50%] max-[550px]:w-[80%]  md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Sign in to your account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                placeholder="Enter Email"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  block w-full p-2.5"
                required=""
              />
            </div>

            <button
              type="submit"
              className="w-full text-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Sign in
            </button>
            <p className="text-sm font-light text-gray-600">
              Don’t have an account yet?{" "}
              
              <Link className="font-bold" to={"/register"}>Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
);
};

export default Login;
