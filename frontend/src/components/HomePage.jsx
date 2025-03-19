import React, { useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import MessageContainer from "./MessageContainer.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { authUser } = useSelector((store) => store.user);
  //   This line uses the useSelector hook from React Redux to access a specific part of the Redux state—in this case, the authUser property from the user slice of the state.
  const navigate = useNavigate();
  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, []);
  //   As soon as the component is rendered for the first time, React executes the code inside the useEffect hook.

  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default HomePage;
