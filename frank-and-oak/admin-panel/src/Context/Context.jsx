import React, { createContext, useState } from "react";

export const NavToggle = createContext();
function Context({ children }) {
  let [navVisible, setNavVisibility] = useState(false);
  let [cookieData, setCookieData] = useState({});
  let globalData = { navVisible, setNavVisibility, cookieData, setCookieData };
  return <NavToggle.Provider value={globalData}>{children}</NavToggle.Provider>;
}

export default Context;
