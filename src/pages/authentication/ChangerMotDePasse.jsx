import React from 'react'
import { TriangleAlert } from 'lucide-react'

const ChangerMotDePasse = () => {
  return (
    <>
      <form action="" method="post" className='flex flex-col gap-8'>
        <h3 className='font-titres font-bold text-bleu-secondaire text-2xl'>Changer votre Mot de passe</h3>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-1'>
            <label htmlFor='Email' className='text-gris-fonce text-md'>Nouveau mot de passe</label>
            <input type="text" name="email" id='Email' className='border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition' placeholder='Nouveau mot de passe'  />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='Mot_de_passe' className='text-gris-fonce text-md'>Confirmer le nouveau mot de passe</label>
            <input type="text" name="mot_de_passe" id='Mot_de_passe' className='border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/55 focus:ring-2 focus:ring-orange-cuivre/30 transition' placeholder='Confirmer votre nouveau mot de passe' />
          </div>
        </div>
        <input type="submit" value="Changer" className='w-2/6 bg-orange-cuivre rounded-lg p-1 cursor-pointer text-white font-semibold self-end hover:bg-orange-cuivre/90 transition duration-300 ease-in-out' />
      </form>
      <div className="w-6/7 mt-8 border border-orange-cuivre/75 rounded-xl p-4 mx-auto m-4 justify-center items-center text-center">
        ⚠️ Vous ne pourrez pas revenir à cet écran. Notez bien
        votre nouveau mot de passe : en cas d'oubli, seul un
        administrateur pourra le réinitialiser.
      </div>
    </>
  )
}

export default ChangerMotDePasse