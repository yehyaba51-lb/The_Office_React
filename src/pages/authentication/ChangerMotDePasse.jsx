import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../../components/shared/Spinner'

const ChangerMotDePasse = () => {
  const navigate = useNavigate()
  const [isLoggingInPasser, setIsLoggingInPasser] = useState(false)
  const [isLoggingInChanger, setIsLoggingInChanger] = useState(false)
  const formRef = useRef();

  const passerPassword = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth.php?action=passer`, {
        method: 'PUT',
        credentials: 'include',
      })
      const data = await response.json()

      if(!response.ok){
        toast.error(data.error)
        setIsLoggingInPasser(false)
        return false
      }

      setIsLoggingInPasser(false)
      if(data.role === 'Administrateur'){
        navigate('/admin')
      } else if(data.role === 'Formateur') {
        navigate('/formateur')
      } else {
        navigate('/etudiant')
      }

      return true
    } catch (error) {
      toast.error('Impossible de passer mot de passe')
      setIsLoggingInPasser(false)
      return false
    }
  }

  const changePassword = async (password, confirmPassword) => {
    const passwordRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    const errors = []
    if(!password || password.length === 0 || !passwordRegex.test(password)){
      errors.push('Mot de passe invalid!')
    }

    if(!confirmPassword || confirmPassword.length === 0 ||  password !== confirmPassword){
      errors.push('Mot de passes pas indentique')
    }

    if(errors.length > 0){
      errors.forEach(error => toast.error(error))
      return false;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth.php?action=changer`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ password })
      })
      const data = await response.json()

      if(!response.ok){
        toast.error(data.error)
        setIsLoggingInChanger(false)
        return false
      }

      setIsLoggingInChanger(false)
      if(data.role === 'Administrateur'){
        navigate('/admin')
      } else if(data.role === 'Formateur') {
        navigate('/formateur')
      } else {
        navigate('/etudiant')
      }

      return true
    } catch (error) {
      toast.error('Impossible de changer mot de passe')
      setIsLoggingInChanger(false)
      return false
    }
  }

  const changerFunction = () => {
    const formData = new FormData(formRef.current)
    const passwordInput = formData.get("password")
    const confirmPasswordInput = formData.get("confirmPassword")
    changePassword(passwordInput, confirmPasswordInput)
  };
  
  
  return (
    <>
      <form action="" method="post" className='flex flex-col gap-8' ref={formRef}>
        <h3 className='font-titres font-bold text-bleu-secondaire text-2xl'>Changer votre Mot de passe</h3>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-1'>
            <label htmlFor='Password' className='text-gris-fonce text-md'>Nouveau mot de passe</label>
            <input type="password" name="password" id='Password' className='border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition' placeholder='Nouveau mot de passe'  />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='ConfirmPassword' className='text-gris-fonce text-md'>Confirmer le nouveau mot de passe</label>
            <input type="password" name="confirmPassword" id='ConfirmPassword' className='border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/55 focus:ring-2 focus:ring-orange-cuivre/30 transition' placeholder='Confirmer votre nouveau mot de passe' />
          </div>
        </div>
        <div className="flex w-full gap-3 justify-end">
          <button
            onClick={() => {
              setIsLoggingInPasser(true)
              passerPassword()
            }}
            disabled={isLoggingInPasser}
            className="text-sm flex items-center justify-center w-1/6 bg-white border-2 border-gris-clair rounded-xl p-1 cursor-pointer text-bleu-secondaire font-semibold hover:bg-gray-100 transition duration-300 ease-in-out"
          >
            {isLoggingInPasser ? <Spinner login={true} /> : 'Passer'}
          </button>
          <button
            onClick={() => {
              setIsLoggingInChanger(true);
              changerFunction()
            }}
            disabled={isLoggingInChanger}
            className='w-2/7 flex items-center justify-center bg-orange-cuivre rounded-lg p-1 cursor-pointer text-white font-semibold hover:bg-orange-cuivre/90 transition duration-300 ease-in-out'
          >
            {isLoggingInChanger ? <Spinner login={true} /> : 'Changer'}
          </button>
        </div>
      </form>
      <div className="w-6/7 text-bleu-principal mt-8 border border-orange-cuivre/75 rounded-xl p-4 mx-auto m-4 justify-center items-center text-center">
        ⚠️ Vous ne pourrez pas revenir à cet écran. Notez bien
        votre nouveau mot de passe : en cas d'oubli, seul un
        administrateur pourra le réinitialiser.
      </div>
    </>
  )
}
export default ChangerMotDePasse