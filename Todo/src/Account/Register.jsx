import React from "react";
import { Link ,useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";


const Register = () => {
  const [name, setname] = useState("")
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpass, setconfirmpass] = useState("")
  const [error, seterror] = useState("");
  const [valid, setvalid] = useState(false);
  const navigate = useNavigate();

  async function RegApi() {
    const res = await fetch("http://127.0.0.1:8000/user/register/", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        name:name,
        password: password,
        password2:confirmpass,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data1 = await res.json();
      const userid=data1['id']
      const token=data1['token']
      console.log(data1,userid);
      navigate("/");
    } else {
      const data1 = await res.json();
      alert(data1.email);
    }
  }
  useEffect(() => {
    function validRegister(email, pass,pass2,name) {
      setvalid(false)
      seterror("");
      let errormsg = "Please correct the following issues:\n";
      if (name.length<3){
        errormsg += "Name should be Atleast three character\n";
        seterror(errormsg);

      }
      if (pass.length <= 8 || pass2.length<=8) {
        errormsg += "Password must have at least 8 characters\n";
        seterror(errormsg);
      }
      if(pass!=pass2){
        errormsg+="Password & ConfirmPassword Should be Same"
        seterror(errormsg)

      }

      if (pass.length >= 8 && email.length > 0 && pass==pass2) {
        setvalid(true);
      }
    }
    validRegister(email,password,confirmpass,name);
  }, [name,email, password,confirmpass]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (valid) {
      RegApi();
    } else alert(error);
  };
  return (
    <div className='bg-gray-50 h-screen flex flex-col items-center justify-center  '>
       <h1 className="font-bold text-[50px]">Register</h1>
      <form className=" bg-white w-2/5 max-sm:w-[80%] my-auto p-5 rounded-xl "onSubmit={handleSubmit}>
      <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Enter Email "
            onChange={(e) => setname(e.target.value)}
            required
          />
        </div>
     
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Enter Email "
            onChange={(e) => setemail(e.target.value)}
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            onChange={(e) => setpassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="repeat-password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Repeat password
          </label>
          <input
            type="password"
            id="repeat-password"
            value={confirmpass}
            onChange={(e) => setconfirmpass(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Register new account
        </button>
        <p className="text-sm font-light text-gray-600 pt-5 ">
                      Already have account?  <Link className="font-bold" to={"/"}>Sign in</Link>

                  </p>
      </form>
    </div>
  );
};

export default Register;
