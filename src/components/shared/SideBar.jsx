import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import logoLampe from "../../assets/logo-lampe.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { ChevronsRightLeft } from "lucide-react";
import { ChevronsLeftRight } from "lucide-react";
import { adminNav, formateurNav, etudiantNav } from "../../roleLinks";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const SideBar = ({ role, currentUser, mobileMenuOpen, setMobileMenuOpen }) => {
  const [isDisconnecting, setIsDisconnecting] = useState(false)
  const navigate = useNavigate()
  const navRole =
    role === "Administrateur"
      ? adminNav
      : role === "Formateur"
        ? formateurNav
        : etudiantNav;

  const disconnect = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth.php`, {
        method: 'DELETE',
        credentials: 'include'
      })
      const data = await response.json()

      if(!response.ok){
        toast.error(data.error)
        return false
      }

      setIsDisconnecting(false)
      return true
    } catch (error) {
      toast.error('Impossible de se déconnecter')
      setIsDisconnecting(false)
      return false
    }
  }
  const [isCollapsed, setIsCollaped] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);

  const activeClass = ({ isActive }) =>
    `flex gap-2 items-center  ${isActive ? `w-full border-l-2 border-orange-cuivre rounded opacity-95 bg-gradient-to-l from-orange-cuivre/45 to-orange-cuivre/10 p-1 text-white font-semibold text-l` : `text-white opacity-65 font-medium text-sm hover:opacity-95 rounded hover:opacity-95 transition duration-300 ease-in-out`} `;

  const widthClasses = isCollapsed
    ? "md:w-15 md:px-1 md:py-20 md:items-center md:justify-between"
    : "md:w-15 md:px-1 md:py-20 md:items-center md:justify-between lg:w-1/5 lg:px-8 lg:py-8 lg:items-stretch";

  return (
    <>
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-bleu-principal/50 z-20 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      <div
        className={`fixed md:relative inset-y-0 left-0 z-30 md:z-auto transition-transform duration-300 ease-in-out ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 w-64 p-8 ${widthClasses} bg-bleu-principal flex flex-col justify-between`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <button
          onClick={() => setIsCollaped(!isCollapsed)}
          className={`hidden lg:flex absolute top-1/4 -right-3 w-8 h-8 bg-orange-cuivre rounded-full justify-center items-center transition duration-300 ease-in-out hover:opacity-100 cursor-pointer ${isHovering ? "opacity-90" : "opacity-0"}`}
        >
          {isCollapsed ? (
            <ChevronsLeftRight color="white" size="18" />
          ) : (
            <ChevronsRightLeft color="white" size="18" />
          )}
        </button>
        {showLogoutMenu && (
          <>
            <div
              className="fixed inset-0"
              onClick={() => setShowLogoutMenu(false)}
            />
            <div className="absolute bottom-25 left-full ml-1 bg-bleu-principal border-2 border-gris-clair rounded-lg p-4 w-58 flex flex-col gap-4 shadow-lg">
              <div className="flex flex-col">
                <h3 className="font-titres text-white text-sm font-semibold">
                  {currentUser.prenom + " " + currentUser.nom}
                </h3>
                <p className="text-gris-clair text-xs">{currentUser.email}</p>
              </div>
              <button
                onClick={(e) => 
                  {e.preventDefault();
                    setIsDisconnecting(true)
                    setTimeout(async () => {
                      const success = await disconnect();
                      if(success){
                        navigate('/');
                      }
                    }, 400)
                  }}
                className="cursor-pointer flex justify-center items-center  border border-gris-clair rounded-xl px-3 py-2 gap-2 text-gris-clair text-sm hover:bg-gris-clair hover:text-bleu-principal transition duration-400 ease-in-out"
                
              >
                {isDisconnecting
                  ? <Spinner login={true} />
                  : <LogOut color="currentColor" size="20" />}
                Se déconnecter
              </button>
            </div>
          </>
        )}
        <div className="flex flex-col gap-30">
          <Link to={navRole[0].to} className="mx-auto">
            <img
              src={logo}
              alt="logo"
              className={isCollapsed ? "hidden" : "hidden lg:block"}
            />
            <img
              src={logoLampe}
              alt="logo"
              className={
                isCollapsed
                  ? "block md:-translate-y-10.5"
                  : "block md:-translate-y-10.5 lg:hidden"
              }
            />
          </Link>
          <div className="flex flex-col gap-4 justify-center">
            {navRole.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={activeClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                {({ isActive }) => (
                  <>
                    {
                      <item.icon
                        color="white"
                        size={
                          isCollapsed
                            ? `${isActive ? 24 : 22}`
                            : `${isActive ? 28 : 26}`
                        }
                      />
                    }
                    <span
                      className={
                        isCollapsed ? "hidden" : "inline md:hidden lg:inline"
                      }
                    >
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
        <div
          className={
            isCollapsed ? "flex gap-3" : "flex gap-3 md:flex lg:hidden"
          }
        >
          <button
            onClick={() => setShowLogoutMenu(!showLogoutMenu)}
            className="cursor-pointer rounded-[50%] w-10 h-10 bg-gris-clair text-xl font-bold text-bleu-principal flex items-center justify-center hover:opacity-90"
          >
            {currentUser.prenom[0].toUpperCase() + currentUser.nom[0].toUpperCase()}
          </button>
        </div>
        <div
          className={
            isCollapsed
              ? "hidden"
              : "hidden lg:flex w-full rounded-xl border-2 border-gris-clair py-2 px-3 flex-col gap-4 cursor-auto"
          }
        >
          <div className="flex gap-3">
            <div className="rounded-full w-11.5 h-11.5 bg-gris-clair text-xl font-bold text-bleu-principal flex items-center justify-center shrink-0">
              {currentUser.prenom[0].toUpperCase() + currentUser.nom[0].toUpperCase()}
            </div>
            <div className="flex flex-col text-gris-clair min-w-0">
              <h3 className="font-titres text-gris-clair text-m font-semibold">
                {currentUser.prenom + ' ' + currentUser.nom}
              </h3>
              <p className="text-gris-clair text-xs truncate">
                {currentUser.email}
              </p>
            </div>
          </div>
          <button
            onClick={(e) => 
              {e.preventDefault();
                setIsDisconnecting(true)
                setTimeout(async () => {
                  const success = await disconnect();
                  if(success){
                    navigate('/');
                  }
                }, 400)
              }}
            className="cursor-pointer flex justify-center items-center  border border-gris-clair rounded-xl px-3 py-2 gap-2 text-gris-clair text-sm hover:bg-gris-clair hover:text-bleu-principal transition duration-400 ease-in-out"
          >
            {isDisconnecting
              ? <Spinner login={true} />
              : <LogOut color="currentColor" size="20" />}
            Se déconnecter
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
