import React, { useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { BadgeCheck } from 'lucide-react'
import { toast } from 'react-toastify'

const SuccessModal = ({ accord, type, content, create=false, lecon=false }) => {
  const [copied, setCopied] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()


  const passwordSuccess = () => {
    toast.success("Mot de passe copié");
  }
  const generatePassword = () => {
    return 'x4#jf@Wa'
  }

  return (
    <>
      <div className="fixed bg-bleu-secondaire/20 backdrop-blur-xs inset-0"></div>
        <div className="fixed inset-0 flex justify-center items-start p-22 z-10">
          <div className='bg-white rounded-2xl px-9 py-8 w-150 flex flex-col items-center gap-5'>
            {create ? (
              <div className="flex w-full justify-center text-center items-center gap-2 p-2">
                {lecon ? (
                  <h3 className="font-titres text-bleu-primaire text-xl flex justify-center items-start gap-1 p-2"><BadgeCheck className='text-vert-reussite' size={25} /> { type } créé pour { content }</h3>
                ) : (
                  <>
                    <h3 className="font-titres text-bleu-primaire text-xl">{ type } créé pour { content }</h3>
                    <BadgeCheck className='text-vert-reussite' size={25} />
                  </>
                )}
              </div>
            ) : !create && accord &&(
                <h3 className="font-titres text-bleu-primaire text-xl flex w-full justify-center text-center items-start gap-1 p-2"><BadgeCheck className='text-vert-reussite' size={30} /> { type } à { content } accordé à {accord}</h3>
            )}
            {create && type==='Compte' ? (
              <>
                <div className='w-4/5 rounded-xl border-2 border-gris-clair p-2 flex justify-between items-center'>
                  <h3 className='text-bleu-principal font-titres font-bold'>{generatePassword()}</h3>
                  <button className={`text-white font-semibold text-md rounded-lg bg-orange-cuivre px-2 py-1 cursor-pointer hover:bg-orange-cuivre/90 transition duration-500 ease-in-out`} onClick={(e) => {e.stopPropagation(); navigator.clipboard.writeText(generatePassword()); passwordSuccess(); setCopied(true)}}>{copied ? 'Copiée ' : 'Copier'}</button>
                </div>
                <p className='text-sm text-bleu-secondaire'>⚠️ Ce mot de passe ne sera plus affiché</p>  
              </>
            ) : type==='Compte' ? (
              <div className="flex flex-col w-full justify-center items-center gap-2 p-2">
                <div className="flex w-full justify-center items-center gap-2 p-2">
                  <h3 className="font-titres text-bleu-primaire text-xl text-center">Mot de passe réinitialisé  pour { content }</h3>
                  <BadgeCheck className='text-vert-reussite' size={25} />
              </div>
                <div className='w-4/5 rounded-xl border-2 border-gris-clair p-2 flex justify-between items-center'>
                  <h3 className='text-bleu-principal font-titres font-bold'>{generatePassword()}</h3>
                  <button className={`text-white font-semibold text-md rounded-lg bg-orange-cuivre px-2 py-1 cursor-pointer hover:bg-orange-cuivre/90 transition duration-500 ease-in-out`} onClick={(e) => {e.stopPropagation(); navigator.clipboard.writeText(generatePassword()); passwordSuccess(); setCopied(true)}}>{copied ? 'Copiée ' : 'Copier'}</button>
                </div>
                <p className='text-sm text-bleu-secondaire'>⚠️ Ce mot de passe ne sera plus affiché</p>  

              </div>
            ) : '' }
            {copied || type !=='Compte' ? (
              <input onClick={() => navigate(location.pathname)} type="button" value="Fermer" className={`text-sm w-2/5 bg-white border-2 border-gris-clair rounded-xl p-1 cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out text-bleu-secondaire font-semibold`} disabled={false}  />
            ) : (
              <input onClick={() => navigate(location.pathname)} type="button" value="Fermer" className={`text-sm w-2/5 cursor-not-allowed  bg-white border-2 border-gris-clair rounded-xl p-1 text-bleu-secondaire font-semibold`} title={'Copiez le mot de passe avant de fermer'} disabled={true} />
            )}

        </div>
      </div>
    </>
  )
}

export default SuccessModal