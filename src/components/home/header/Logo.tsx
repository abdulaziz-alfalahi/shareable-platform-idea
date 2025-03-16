
import React from "react";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <Link to="/" className="text-2xl font-bold text-emirati-desertRed">
        Emirati Journey
      </Link>
    </div>
  );
};

export default Logo;
