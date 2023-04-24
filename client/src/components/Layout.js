import React from "react";
import "../styles/LayoutStyles.css";
import { AdminMenu, userMenu } from "../data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message, Badge } from "antd";

const Layout = ({ children }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  //logout
  const handgleLogout = () => {
    localStorage.clear();
    message.success("Logout Successful");
    navigate("/login");
  };

  // =================train company menu====================
  const trainMenu = [
    { name: "Home", path: "/", icon: "" },
    { name: "Ticket List", path: "/train-tickets", icon: "" },
    { name: "Profile", path: `train/train-profile/${user?._id}`, icon: "" },
  ];
  // =================train company menu====================
  //rendering menu list
  const SidebarMenu = user?.isAdmin
    ? AdminMenu
    : user?.isTrain
    ? trainMenu
    : userMenu;
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h1>RailEase</h1>
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className="menu-item" onClick={handgleLogout}>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content" style={{ cursor: "pointer" }}>
                <Badge
                  count={user && user.notification.length}
                  onClick={() => {
                    navigate("/notification");
                  }}
                >
                  <i className="fa-solid fa-bell"></i>
                </Badge>

                <Link to="/profile">{user?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
