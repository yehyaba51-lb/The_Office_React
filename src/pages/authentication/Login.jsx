import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/shared/Spinner";

const Login = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const formRef = useRef();
  const navigate = useNavigate();

  const verifierSession = async () => {
    try {
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

      await sleep(2000)
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth.php`, {
        credentials: 'include'
      })
      const data = await response.json()
  
      if(!response.ok){
        setLoading(false)
        return false
      }
  
      if(data.premiere_connexion){
        navigate('/changer-mot-de-passe')
        return
      } else {
        if(data.role === 'Administrateur'){
          navigate('/admin')
        } else if(data.role === 'Formateur') {
          navigate('/formateur')
        } else {
          navigate('/etudiant')
        }
        return
      }
    } catch (error) {
      toast.error('Impossible de charger les données')
      setLoading(false)
      return false
    }
  }
  
  useEffect(() => {
    verifierSession()
  }, [])


  const handleLogin  = async (email, mot_de_passe) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, mot_de_passe })
      });
      const data = await response.json();

      if(!response.ok){
        toast.error(data.error);
        setIsLoggingIn(false)
        return false
      }

      setIsLoggingIn(false)
      if(data.premiere_connexion){
        navigate('/changer-mot-de-passe')
      } else {
        if(data.role === 'Administrateur'){
          navigate('/admin')
        } else if(data.role === 'Formateur') {
          navigate('/formateur')
        } else {
          navigate('/etudiant')
        }
      }
      return true;
    } catch (error) {
      toast.error('Impossible de se connecter')
      setIsLoggingIn(false)
      return false;
    }
  };

  const submitLogin = () => {
    const formData = new FormData(formRef.current);
    const emailInput = formData.get("email");
    const passwordInput = formData.get("mot_de_passe");
    setIsLoggingIn(true);
    handleLogin(emailInput, passwordInput);
  };

  return (
    <>
      {loading
        ? <div className="flex items-center justify-center p-20">
            <Spinner />
          </div>
        : <div className='border-2 border-gris-clair rounded-xl flex flex-col w-2/5 mx-auto px-10 py-4 m-10 shadow-md'>
            <form
                action=""
                method="post"
                className="flex flex-col gap-8"
                ref={formRef}
                onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  submitLogin()
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
                  onClick={() => {
                    submitLogin()
                  }}
                  disabled={isLoggingIn}
                  className="w-2/6 bg-orange-cuivre rounded-lg p-1 flex items-center justify-center cursor-pointer text-white font-semibold self-end hover:bg-orange-cuivre/90 transition duration-300 ease-in-out"
                >
                  {isLoggingIn ? <Spinner login={true} /> : 'Connecter'}
                </button>
            </form>
          </div>
        }
    </>
  );
};

export default Login;
