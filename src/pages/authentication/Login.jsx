import React from 'react'
import { useMatches } from 'react-router-dom';

const Login = () => {
  return (
      <form action="" method="post" className='flex flex-col gap-8'>
        <h3 className='font-titres font-bold text-bleu-secondaire text-2xl'>Connection</h3>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-1'>
            <label htmlFor='Email' className='text-gris-fonce text-md'>Email</label>
            <input type="text" name="email" id='Email' className='border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition' placeholder='Entrer votre email' />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='Mot_de_passe' className='text-gris-fonce text-md'>Mot de passe</label>
            <input type="text" name="mot_de_passe" id='Mot_de_passe' className='border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/55 focus:ring-2 focus:ring-orange-cuivre/30 transition' placeholder='Entrer votre mot de passe' />
          </div>
        </div>
        <input type="submit" value="Connecter" className='w-2/6 bg-orange-cuivre rounded-lg p-1 cursor-pointer text-white font-semibold self-end hover:bg-orange-cuivre/90 transition duration-300 ease-in-out'  />
      </form>
  )
}

export default Login