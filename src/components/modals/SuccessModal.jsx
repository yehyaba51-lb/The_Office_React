import { useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { BadgeCheck } from 'lucide-react'
import { toast } from 'react-toastify'
import { translations } from '../../translations'

const SuccessModal = ({ accord, type, content, create=false, lecon=false, password, language }) => {
  const capitalize = (str) => str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  const [copied, setCopied] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()


  const passwordSuccess = () => {
    toast.success("Mot de passe copié");
  }

  return (
    <>
      <div className="fixed bg-bleu-secondaire/20 backdrop-blur-xs inset-0"></div>
        <div className="fixed inset-0 flex justify-center items-start p-15 px-5 md:p-22 z-10">
          <div className='bg-white rounded-2xl px-9 py-8 w-150 flex flex-col items-center gap-5'>
            {create ? (
              <div className="flex w-full justify-center text-center items-center gap-2 p-2">
                {lecon ? (
                  <h3 className="font-titres text-bleu-primaire text-xl flex justify-center items-start gap-1 p-2"><BadgeCheck className='text-vert-reussite' size={25} /> { type } {translations[language]["creePourTitre"]} { content }</h3>
                ) : (
                  <>
                    <h3 className="font-titres text-bleu-primaire text-xl">{ translations[language][type] } {translations[language]['creePourTitre']} { capitalize(content) }</h3>
                    <BadgeCheck className='text-vert-reussite' size={25} />
                  </>
                )}
              </div>
            ) : !create && accord &&(
                <h3 className="font-titres text-bleu-primaire text-xl flex w-full justify-center text-center items-start gap-1 p-2"><BadgeCheck className='text-vert-reussite' size={30} /> { translations[language][type] } { translations[language]['a'] } { content } { translations[language]['accordeA'] } {accord}</h3>
            )}
            {create && type==='compte' ? (
              <>
                <div className='w-4/5 rounded-xl border-2 border-gris-clair p-2 flex justify-between items-center'>
                  <h3 className='text-bleu-principal font-titres font-bold'>{password}</h3>
                  <button className={`text-white font-semibold text-md rounded-lg bg-orange-cuivre px-2 py-1 cursor-pointer hover:bg-orange-cuivre/90 transition duration-500 ease-in-out`}
                    onClick={(e) => {e.stopPropagation(); navigator.clipboard.writeText(password); passwordSuccess(); setCopied(true)}}>
                      {copied ? translations[language]['copiee'] : translations[language]['copier']}
                  </button>
                </div>
                <p className='text-sm text-bleu-secondaire'>⚠️ { translations[language]['motDePassePlusAffiche'] }</p>
              </>
            ) : type === 'compte' ? (
              <div className="flex flex-col w-full justify-center items-center gap-2 p-2">
                <div className="flex w-full justify-center items-center gap-2 p-2">
                  <h3 className="font-titres text-bleu-primaire text-xl text-center">{ translations[language]['motDePasseReinitialisePour'] } { capitalize(content) }</h3>
                  <BadgeCheck className='text-vert-reussite' size={25} />
              </div>
                <div className='w-4/5 rounded-xl border-2 border-gris-clair p-2 flex justify-between items-center'>
                  <h3 className='text-bleu-principal font-titres font-bold'>{password}</h3>
                  <button className={`text-white font-semibold text-md rounded-lg bg-orange-cuivre px-2 py-1 cursor-pointer hover:bg-orange-cuivre/90 transition duration-500 ease-in-out`} onClick={(e) => {e.stopPropagation(); navigator.clipboard.writeText(password); passwordSuccess(); setCopied(true)}}>{copied ? translations[language]['copiee'] : translations[language]['copier']}</button>
                </div>
                <p className='text-sm text-bleu-secondaire'>⚠️ { translations[language]['motDePassePlusAffiche'] }</p>

              </div>
            ) : '' }
            {copied || type !=='compte' ? (
              <input onClick={() => navigate(location.pathname)} type="button" value={translations[language]['fermer']} className={`text-sm w-2/5 bg-white border-2 border-gris-clair rounded-xl p-1 cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out text-bleu-secondaire font-semibold`} disabled={false} />
            ) : (
              <input onClick={() => navigate(location.pathname)} type="button" value={translations[language]['fermer']} className={`text-sm w-2/5 cursor-not-allowed bg-white border-2 border-gris-clair rounded-xl p-1 text-bleu-secondaire font-semibold`} title={translations[language]['copiezMotDePasseAvantFermer']} disabled={true} />
            )}

        </div>
      </div>
    </>
  )
}

export default SuccessModal