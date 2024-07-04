import React from "react";

interface HeaderProps {
  logoSrc: string;
  altText: string;
}

const Header: React.FC<HeaderProps> = ({ logoSrc, altText }) => {
  return (
    <header className="header">
      <img src={logoSrc} alt={altText} className="logo" />
    </header>
  );
};

export default Header;
