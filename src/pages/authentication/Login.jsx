import React, { useEffect, useRef, useState } from "react";
import { useLocation, useMatches, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/shared/Spinner";

const Login = () => {
  const [users, setUsers] = useState([]);
  const [passwords, setPasswords] = useState([]);
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const formRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:8000/users");
      const data = await response.json();

      setUsers(data);
      return true;
    } catch (error) {
      setUsers("");
      return false;
    }
  };

  const getPasswords = async () => {
    try {
      const response = await fetch("http://localhost:8000/testPasswords");
      const data = await response.json();

      setPasswords(data);
      return true;
    } catch (error) {
      setPasswords("");
      return false;
    }
  };

  useEffect(() => {
    const loadEverything = async () => {
      await Promise.all([getUsers(), getPasswords()]);
    };

    loadEverything();
  }, []);


  const getuserInfo = (email) => {
    const matchedUser = users ? users.find((u) => u.email === email) : "";

    const password = matchedUser
      ? passwords.find((p) => p.email === matchedUser.email)?.password
      : "";
    return { matchedUser, password };
  };

  const handleLogin = () => {
    setIsLoggingIn(true)
    const formData = new FormData(formRef.current);
    const emailInput = formData.get("email");
    const passwordInput = formData.get("mot_de_passe");
    const { matchedUser, password } = getuserInfo(emailInput);

    if (matchedUser && password === passwordInput) {
      localStorage.setItem("user", JSON.stringify(matchedUser));
      setTimeout(() => {
        navigate(
          `${location.pathname}/${matchedUser.role === "Étudiant" ? "etudiant" : matchedUser.role === "Formateur" ? "formateur" : matchedUser.role === "Administrateur" && "admin"}`,
        );
      }, 400)
    } else {
      toast.error("Email ou mot de passe incorrect");
      setIsLoggingIn(false)
    }
  };

  return (
    <form
      action=""
      method="post"
      className="flex flex-col gap-8"
      ref={formRef}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleLogin();
        }
      }}
    >
      <h3 className="font-titres font-bold text-bleu-secondaire text-2xl">
        Connection
      </h3>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <label htmlFor="Email" className="text-gris-fonce text-md">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="Email"
            className="border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition"
            placeholder="Entrer votre email"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="Mot_de_passe" className="text-gris-fonce text-md">
            Mot de passe
          </label>
          <input
            type="password"
            name="mot_de_passe"
            id="Mot_de_passe"
            className="border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/55 focus:ring-2 focus:ring-orange-cuivre/30 transition"
            placeholder="Entrer votre mot de passe"
          />
        </div>
      </div>
      <button
      type="button"
        onClick={handleLogin}
        disabled={isLoggingIn}
        className="w-2/6 bg-orange-cuivre rounded-lg p-1 flex items-center justify-center cursor-pointer text-white font-semibold self-end hover:bg-orange-cuivre/90 transition duration-300 ease-in-out"
      >
        {isLoggingIn ? <Spinner login={true} /> : 'Connecter'}
      </button>
    </form>
  );
};

export default Login;
