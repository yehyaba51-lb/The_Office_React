import React, { useState } from "react";
import logo from "../../assets/logo.png";
import logoLampe from "../../assets/logo-lampe.png";
import { Link, NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
import { ChevronsRightLeft } from "lucide-react";
import { ChevronsLeftRight } from "lucide-react";
import { adminNav, formateurNav, etudiantNav } from "../../roleLinks";

const SideBar = ({ role }) => {
  const navRole = role === 'admin' ? adminNav : role === 'formateur' ? formateurNav : etudiantNav

  const [isCollapsed, setIsCollaped] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);

  const activeClass = ({ isActive }) =>
    `flex gap-2 items-center  ${isActive ? `w-full border-l-2 border-orange-cuivre rounded opacity-95 bg-gradient-to-l from-orange-cuivre/45 to-orange-cuivre/10 p-1 text-white font-semibold text-l` : `text-white opacity-65 font-medium text-sm hover:opacity-95 rounded hover:opacity-95 transition duration-300 ease-in-out`} `;

  
  return (
    <div
      className={`relative ${isCollapsed ? "w-15 px-1 py-20 items-center justify-between" : "w-1/5 p-8"} bg-bleu-principal flex flex-col justify-between `}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <button
        onClick={() => setIsCollaped(!isCollapsed)}
        className={`absolute top-1/4 -right-3 w-8 h-8 bg-orange-cuivre rounded-full flex justify-center items-center transition duration-300 ease-in-out hover:opacity-100 cursor-pointer ${isHovering ? "opacity-90" : "opacity-0"}`}
      >
      
        {isCollapsed ? (
          <ChevronsLeftRight color="white" size="18" />
        ) : (
          <ChevronsRightLeft color="white" size="18" />
        )}
      </button>
      {showLogoutMenu && (
        <>
          <div className="fixed inset-0" onClick={() => setShowLogoutMenu(false)} />
            <div className="absolute bottom-25 left-full ml-1 bg-bleu-principal border-2 border-gris-clair rounded-lg p-4 w-58 flex flex-col gap-4 shadow-lg">
              <div className="flex flex-col">
                <h3 className="font-titres text-white text-sm font-semibold">User</h3>
                <p className="text-gris-clair text-xs">user2020@gmail.com</p>
              </div>
              <Link to='/' className="cursor-pointer flex justify-center items-center  border border-gris-clair rounded-xl px-3 py-2 gap-2 text-gris-clair text-sm hover:bg-gris-clair hover:text-bleu-principal transition duration-400 ease-in-out">
                <LogOut color="currentColor" size="20" /> Se déconnecter
              </Link>
            </div>
        </>
      )}
      <div className="flex flex-col gap-30">
        <Link to={navRole[0].to} className="mx-auto ">
          <img
            src={isCollapsed ? logoLampe : logo}
            alt="logo"
            className={`${isCollapsed ? "-translate-y-10.5" : ""}`}
          />
        </Link>
        <div className="flex flex-col gap-4 justify-center">
          {navRole.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={activeClass}>
              {({ isActive }) => (
                <>
                    {<item.icon
                      color="white"
                      size={
                        isCollapsed
                          ? `${isActive ? 24 : 22}`
                          : `${isActive ? 28 : 26}`
                      }
                    />}
                    {isCollapsed ? "" : `${item.label}`}  
                    
                </>
              )}
            </NavLink>
          ))}
          
        </div>
      </div>
      {isCollapsed ? (
        <div className="flex gap-3">
          <button
            onClick={() => setShowLogoutMenu(!showLogoutMenu)}
            className="cursor-pointer rounded-[50%] w-10 h-10 bg-gris-clair text-xl font-bold text-bleu-principal flex items-center justify-center hover:opacity-90"
          >
            L
          </button>
        </div>
      ) : (
        <div className="w-full rounded-xl border-2 border-gris-clair py-2 px-3 flex flex-col gap-4 cursor-auto">
          <div className="flex gap-3">
            <div className="rounded-[50%] w-11.5 h-11.5 bg-gris-clair text-xl font-bold text-bleu-principal flex items-center justify-center">
              L
            </div>
            <div className="flex flex-col text-gris-clair">
              <h3 className="font-titres text-gris-clair text-m font-semibold">User</h3>
              <p className="text-gris-clair text-xs">user2020@gmail.com</p>
            </div>
          </div>
          <Link to='/' className="cursor-pointer flex justify-center items-center  border border-gris-clair rounded-xl px-3 py-2 gap-2 text-gris-clair text-sm hover:bg-gris-clair hover:text-bleu-principal transition duration-400 ease-in-out">
            <LogOut color="currentColor" size="20" /> Se déconnecter
          </Link>
        </div>
      )}
    </div>
  );
};

export default SideBar;
