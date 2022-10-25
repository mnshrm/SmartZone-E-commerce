import React from "react";
import { MdAccountCircle } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/Smart.png";

const Header = () => {
  return (
    <ReactNavbar
      burgerColorHover="#eb4034"
      logo={logo}
      logoWidth="20vmax"
      navColor1="white"
      logoHoverSize="10px"
      logoHoverColor="#eb4034"
      link1Text="Home"
      link2Text="Product"
      link3Text="Contact"
      link4Text="About"
      link1Url="/"
      link2Url="/product"
      link3Url="/contact"
      link4Url="/about"
      link1Size="1.3vmax"
      link1Color="rgba(35,35,35,0.8)"
      nav1justifyContent="flex-end"
      nav2justifyContect="flex-end"
      nav3justifyContect="flex-start"
      nav4justifyContect="flex-start"
      link1ColorHover="#eb4034"
      link1Margin="1vmax"
      profileIcon={true}
      profileIconColor="rgba(35,35,35,0.8)"
      ProfileIconElement={MdAccountCircle}
      searchIcon={true}
      searchIconColor="rgba(35,35,35,0.8)"
      SearchIconElement={MdSearch}
      cartIcon={true}
      cartIconColor="rgba(35,35,35,0.8)"
      CartIconElement={MdAddShoppingCart}
      profileIconColorHover="#eb4034"
      searchIconColorHover="#eb4034"
      cartIconColorHover="#eb4034"
    />
  );
};

export default Header;
