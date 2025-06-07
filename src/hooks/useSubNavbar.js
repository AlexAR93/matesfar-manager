import { useState } from "react";

export const useSubNavbar = () => {
  const [menuExpanded, setMenuExpanded] = useState(true);
  const [expandedSubMenus, setExpandedSubMenus] = useState({});

  const toggleMenu = () => setMenuExpanded((prev) => !prev);
  const toggleSubMenu = (menu) =>
    setExpandedSubMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));

    const closeBoardSubMenu = (menu) =>
      setExpandedSubMenus((prev) => ({
        ...prev,
        [menu]: false,
      }));

  return {
    menuExpanded,
    toggleMenu,
    expandedSubMenus,
    closeBoardSubMenu,
    toggleSubMenu,
  };
};
