import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CircleX } from 'lucide-react'

const AddQuestionModal = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [exerciceType, setExerciceType] = useState('Input')
  return (
    <>
      <div className="fixed bg-bleu-secondaire/20 backdrop-blur-xs inset-0"></div>
        <div
          className="fixed inset-0 flex justify-center items-start p-22 z-10"
          onClick={() => navigate(location.pathname)}
        >
          <div
            className="bg-white rounded-2xl px-12 py-8 w-160 flex flex-col gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex w-full justify-between items-center">
              <h3 className="font-titres text-bleu-primaire text-xl">Ajouter une question</h3>
              <button
              title="Fermer"
              className="text-gris-fonce cursor-pointer hover:text-gris-fonce/50 transition duration-300 ease-in-out"
              onClick={() => navigate(location.pathname)}
            >
              <CircleX size={22} />
            </button>
          </div>
          <form action="" method="post" className="flex flex-col">
            <div className="flex flex-col gap-1 mb-2">
              <label htmlFor="texte" className="text-gris-fonce text-sm">
                Texte de la question
              </label>
              <input
                type="text"
                name="texte"
                id="titre"
                className="border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition"
                placeholder={`Entrez le texte de la question...`}
              />
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label htmlFor="reponse" className="text-gris-fonce text-sm">
                Type de réponse
              </label>
              <div className="flex self-center gap-5">
                <input value='Input' type='button' className={`${exerciceType === 'Input' ? 'text-orange-cuivre' : 'text-bleu-secondaire'}  font-semibold ${exerciceType === 'Input' ? ' bg-orange-cuivre/20' : 'bg-white'} rounded-2xl px-8 py-1  border ${exerciceType === 'Input' ? 'border-orange-cuivre/20' : 'border-gris-clair'} cursor-pointer hover:border ${exerciceType === 'Input' ? 'hover:border-orange-cuivre/50 hover:text-orange-cuivre/75' : 'hover:border-gris-fonce/25 hover:text-gris-fonce/65 hover:bg-gris-fonce/2'} transition duration-300 ease-in-out`} onClick={() => setExerciceType('Input')} />
                <input value='QCM' type='button' className={`${exerciceType === 'QCM' ? 'text-orange-cuivre' : 'text-bleu-secondaire'}  font-semibold ${exerciceType === 'QCM' ? ' bg-orange-cuivre/20' : 'bg-white'} rounded-2xl px-8 py-1  border ${exerciceType === 'QCM' ? 'border-orange-cuivre/20' : 'border-gris-clair'} cursor-pointer hover:border ${exerciceType === 'QCM' ? 'hover:border-orange-cuivre/50 hover:text-orange-cuivre/75' : 'hover:border-gris-fonce/25 hover:text-gris-fonce/65 hover:bg-gris-fonce/2'} transition duration-300 ease-in-out`} onClick={() => setExerciceType('QCM')} />
                <input value='File Upload' type='button' className={`${exerciceType === 'File' ? 'text-orange-cuivre' : 'text-bleu-secondaire'}  font-semibold ${exerciceType === 'File' ? ' bg-orange-cuivre/20' : 'bg-white'} rounded-2xl px-8 py-1  border ${exerciceType === 'File' ? 'border-orange-cuivre/20' : 'border-gris-clair'} cursor-pointer hover:border ${exerciceType === 'File' ? 'hover:border-orange-cuivre/50 hover:text-orange-cuivre/75' : 'hover:border-gris-fonce/25 hover:text-gris-fonce/65 hover:bg-gris-fonce/2'} transition duration-300 ease-in-out`} onClick={() => setExerciceType('File')} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddQuestionModal