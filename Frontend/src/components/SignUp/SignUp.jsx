import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/login/login.svg";

import { useState } from "react";
import useAuth from "../../Hook/useAuth";

const SignUp = () => {
  //const { createUser, upload, UpdateUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [photo, setphoto] = useState(null);
  const [username, setUsername] = useState("");

  const handleChangePhoto = (e) => {
    if (e.target.files[0]) {
      setphoto(e.target.files[0]);
    }
  };
  //console.log(photo);
  const handleChangeUserName = (e) => {
    setUsername(e.target.value);
  };

  // console.log(username);
  const { user, loading, createUser, signIn, LogOut } = useAuth();
  const handleSignUp = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    const result = await createUser(email, password);
    console.log(result.user);
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="w-1/2 mr-12">
          <img src={img} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <h1 className="text-3xl text-center font-bold">Sign Up</h1>
            <form onSubmit={handleSignUp}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">User Name</span>
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="User name"
                  onChange={handleChangeUserName}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">UpLoad Profile Photo</span>
                </label>
                <input
                  type="file"
                  name="files"
                  placeholder="Profile Photo"
                  onChange={handleChangePhoto}
                  className="input input-bordered cursor-pointer p-2"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>

              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Sign Up"
                />
              </div>
            </form>
            <p className="my-4 text-center">
              Already Have an Account?{" "}
              <Link className="text-orange-600 font-bold" to="/login">
                Login
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
