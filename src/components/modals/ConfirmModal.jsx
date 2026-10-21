import { useLocation, useNavigate } from 'react-router-dom';
import { translations } from '../../translations';


const ConfirmModal = ({ type, name, deleteFunction, inscriptionEtudiant, irreversible=true, language }) => {
    const navigate = useNavigate()
    const location = useLocation()


  return (
    <>
      <div className="fixed bg-bleu-secondaire/20 backdrop-blur-xs inset-0"></div>
        <div className="fixed inset-0 flex justify-center items-start p-15 px-5 md:p-22 z-10">
          <div className='bg-white rounded-2xl px-3 sm:px-9 py-8 w-150 flex flex-col items-center gap-5'>
            <h3 className="font-titres text-bleu-primaire text-xl text-center">{translations[language]['voulezVousSupprimer']} {inscriptionEtudiant ? `${translations[language][type]} de ${inscriptionEtudiant}` : `${name}`}?⚠️</h3>
            <div className='flex w-3/4 md:w-1/2 gap-3'>
                <input onClick={() =>  navigate(location.pathname)} type="button" value={translations[language]['non']} className='text-sm w-5/6 bg-white border-2 border-gris-clair rounded-xl p-2 cursor-pointer text-bleu-secondaire font-semibold hover:bg-gray-100 transition duration-300 ease-in-out'  />
                <input type="button"  onClick={async ()=> {const success = await deleteFunction(); if(success) navigate(location.pathname)}} value={translations[language]['oui']} className={`text-sm w-5/6 bg-bleu-principal rounded-xl p-2 cursor-pointer text-white font-semibold hover:bg-bleu-principal/90 transition duration-300 ease-in-out`}  />
              </div>
              {irreversible  && (
                <p className='text-sm text-bleu-secondaire'>{translations[language]['actionIrreversible']}</p>
              )}
          </div>
        </div>
    </>
  )
}

export default ConfirmModal