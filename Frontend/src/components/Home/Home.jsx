import React, { useEffect } from "react";
import useAuth from "../../Hook/useAuth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, loading, LogOut } = useAuth();
  const navigate = useNavigate();
  const role = "student";
  useEffect(() => {
    if (!loading) {
      if (user) {
        // Assuming user role is stored in `user.role`
        switch (role) {
          case "student":
            navigate("/student");
            break;
          case "driver":
            navigate("/driver");
            break;
          case "admin":
            navigate("/admin");
            break;
          default:
            navigate("/login"); // Fallback for undefined role
            break;
        }
      } else {
        navigate("/login"); // Navigate to login if no user
      }
    }
  }, [user, loading, navigate]);

  return (
    <div>
      {user ? (
        <div>
          <h3>Welcome, {role}</h3>
          <button
            onClick={async () => {
              await LogOut();
              navigate("/login"); // Redirect to login after logout
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;
