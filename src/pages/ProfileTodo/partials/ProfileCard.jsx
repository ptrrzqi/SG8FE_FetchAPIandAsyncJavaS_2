import React from "react";
import avatar from "../../../assets/images/profile.webp";
import Button from "../../../components/Button";
import { Link } from "react-router";

const ProfileCard = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <div
      className="
      border
      border-borderColor
      dark:border-borderColorDark
      md:h-85
      w-full md:max-w-112.5
      bg-bgCard dark:bg-bgCardDark 
      p-6 rounded-2xl 
      shadow-[0_4px_12px_rgba(0,0,0,0.1)] 
      flex flex-col justify-center 
      transition-colors duration-300
    "
    >
      <div className="flex items-center gap-4 mb-4">
        <img
          src={avatar}
          alt="Avatar"
          className="w-15 h-15 rounded-full bg-gray-200 object-cover"
        />

        <div>
          <h2
            id="name-display"
            className="font-bold text-xl text-textPrimary dark:text-textPrimaryDark"
          >
            Putra Rizaqi Athallah
          </h2>
          <p className="text-sm text-textSecondary dark:text-textSecondaryDark">
            Learning Front-end Web Developer
          </p>
        </div>
      </div>

      <p className="text-sm mb-5 leading-relaxed text-textSecondary dark:text-textSecondaryDark">
        Currently Learning and Studying about Frontend Web Development at GDGoC Telkom University Campus Community.
      </p>

      <div className="flex gap-2">
        <Button variant="secondary" onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </Button>

        <Link to="/">
          <Button variant="primary">Ke Login</Button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
