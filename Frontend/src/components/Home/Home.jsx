import React, { useEffect } from "react";
import useAuth from "../../Hook/useAuth";
import { useNavigate } from "react-router-dom";
import userRole from "../../Hook/userRole";

const Home = () => {
  const { user, loading, LogOut } = useAuth();
  const navigate = useNavigate();
  const [Role, isRole] = userRole();

  useEffect(() => {
    if (!loading && !isRole) {
      if (user) {
        // Navigate based on the user's role
        switch (Role) {
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
            navigate("/login"); // Fallback if the role is undefined
            break;
        }
      } else {
        navigate("/login"); // Navigate to login if no user
      }
    }
  }, [user, loading, Role, isRole, navigate]);

  const handleLogout = async () => {
    await LogOut(); // Log out the user
    navigate("/login", { replace: true }); // Redirect to login page
  };

  // If loading or fetching the role, show a loader
  if (loading || isRole) {
    return <p>Loading...</p>;
  }

  // If the user is null, navigate to login and stop rendering the component
  if (!user) {
    navigate("/login", { replace: true });
    return null;
  }

  return (
    <div>
      <h3>Welcome, {Role}</h3>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
