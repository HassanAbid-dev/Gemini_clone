import React, { useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  return (
    <>
      <div className="sidebar">
        <div className="top">
          <img
            onClick={() => {
              setExtended((prev) => !prev);
            }}
            className="menu"
            src={assets.menu_icon}
            alt=""
          />
          <div className="new-chat">
            <img src={assets.plus_icon}></img>
            {extended ? <p>New Chat</p> : null}
          </div>
          <div className="recent">
            {extended ? <p className="recent-title">Recent</p> : null}
            {extended ? (
              <div className="recent-entry">
                <img src={assets.message_icon} alt="" />
                <p>What is react ...</p>
              </div>
            ) : null}
          </div>
        </div>
        <div className="bottom">
          <div className="bottom-item recent-entry">
            <img src={assets.question_icon}></img>
            {extended ? <p>Help</p> : null}
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.history_icon}></img>
            {extended ? <p>Activity</p> : null}
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.setting_icon}></img>
            {extended ? <p>Setting</p> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
