import React from 'react'
import { CircleX } from 'lucide-react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'


const FormModal = ({ type, fields, initialData, editFunction }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const isEditMode = Boolean(initialData)


  return (
    <>
      <div className="fixed bg-bleu-secondaire/20 backdrop-blur-xs inset-0"></div>
      <div className="fixed inset-0 flex justify-center items-start p-22 z-10" onClick={() => navigate(location.pathname)}>
        <div className='bg-white rounded-2xl px-12 py-8 w-160 flex flex-col gap-5' onClick={(e) => e.stopPropagation()}>
          <div className="flex w-full justify-between items-center">
            <h3 className="font-titres text-bleu-primaire text-xl">{isEditMode ? 'Modifier' : 'Créer'} {type}</h3>
            <CircleX size={22} className='text-gris-fonce cursor-pointer hover:text-gris-fonce/50 transition duration-300 ease-in-out' onClick={() => navigate(location.pathname)} />
          </div>
          <form action="" method="post" className='flex flex-col' >
            {fields.map(field => (
              <div key={field.label} className='flex flex-col gap-1 mb-2'>
                <label htmlFor={field.label} className='text-gris-fonce text-sm'>{field.label}</label>
                {field.type === 'select' ? (
                  <select name={field.name} id="role" defaultValue={isEditMode ? initialData[field.name] : field.options[0]} className={`border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition ${isEditMode && field.lockedOn ? 'cursor-not-allowed' : ''}`} disabled={isEditMode && field.lockedOn}>
                    {field.options.map(option => (
                      <option key={option} value={`${option}`}>{`${option}`}</option>
                    ))}
                  </select>
                ) : (
                  <input defaultValue={isEditMode ? initialData[field.name] : ''} type="text" name={field.name} id='prenom' className='border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition' placeholder={`Entrer votre ${field.name}`} />
                )}
              </div>
            ))}
            <div className={`mt-5 gap-3 flex  items-center ${(isEditMode && type === 'un compte') ? 'justify-between' : 'justify-end'}`}>
              {(isEditMode && type === 'un compte') && (
                <input onClick={() => navigate(`${location.pathname}?reset=true&id=${initialData.id}`)} type="button" value="Réinitialiser le mot de passe" className='text-sm bg-bleu-secondaire border-2 border-bleu-secondaire rounded-xl p-2 cursor-pointer text-white font-semibold hover:bg-bleu-secondaire/90 transition duration-300 ease-in-out' />
              )}
              <div className='flex w-2/4 gap-3'>
                <input onClick={() => navigate(location.pathname)} type="button" value="Annuler" className='text-sm w-5/6 bg-white border-2 border-gris-clair rounded-xl p-2 cursor-pointer text-bleu-secondaire font-semibold hover:bg-gray-100 transition duration-300 ease-in-out' />
                <input type="button" onClick={() => { if (isEditMode) editFunction(); navigate(isEditMode ? location.pathname : `${location.pathname}${location.search.replace('create=true', 'success=true')}`) }} value={`${isEditMode ? 'Modifier' : 'Créer'}`} className={`text-sm w-${isEditMode ? '6/7' : '5/6'} bg-orange-cuivre border-2 border-orange-cuivre rounded-xl p-2 cursor-pointer text-white font-semibold hover:bg-orange-cuivre/90 transition duration-300 ease-in-out`} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default FormModal