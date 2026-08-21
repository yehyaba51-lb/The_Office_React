import React, { useState } from 'react'
import { CircleX, Import } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const LessonBuilderModal = ({ lecon }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [steps, setSteps] = useState(1)
  const [fileName, setFileName] = useState('')
  const [pdfs, setPdfs] = useState([{filename: '', order: ''}])

  return (
    <>
      <div className="fixed bg-bleu-secondaire/20 backdrop-blur-xs inset-0"></div>
      <div className="fixed inset-0 flex justify-center items-start p-22 z-10" onClick={() => navigate(location.pathname)}>
        <div className='bg-white rounded-2xl px-12 py-8 w-160 flex flex-col gap-5' onClick={(e) => e.stopPropagation()}>
          <div className="flex w-full justify-between items-center">
            <h3 className="font-titres text-bleu-primaire text-xl">Creer</h3>
            <CircleX size={22} className='text-gris-fonce cursor-pointer hover:text-gris-fonce/50 transition duration-300 ease-in-out' onClick={() => navigate(location.pathname)} />
          </div>
          <form action="" method="post" className='flex flex-col' >
            {steps === 1 && (
              <>
                <div className='flex flex-col gap-1 mb-2'>
                  <label htmlFor='titre' className='text-gris-fonce text-sm'>Titre</label>
                  <input type="text" name='titre' id='titre' className='border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition' placeholder={`Entrez titre de la leçon...`} />
                </div>
                <div className='flex flex-col gap-1 mb-2'>
                  <label htmlFor='order' className='text-gris-fonce text-sm'>Order</label>
                  <select type="text" name='order' id='order' className='border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition' placeholder={`Entrez titre de la leçon...`} >
                    <option value=""></option>
                    {lecon.map(l => (
                      <option className='text-black' value={l.ordre}>{l.ordre}</option>
                    ))}
                  </select>
                </div>
              </>
            )}
            {steps === 2 && (
              <>
                <div className='flex flex-col gap-1 mb-2'>
                  <label htmlFor='contenu' className='text-gris-fonce text-sm'>Contenu</label>
                  <textarea type="text" name='contenu' id='contenu' rows='6' className='border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire resize-none outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition' placeholder={`Entrez titre de la leçon...`} >
                  </textarea>
                </div>
              </>
            )}
            {steps === 3 && (
              <>
                {pdfs.map((pdf, index) => {
                    return <div key={index} className="border-2 border-gris-clair rounded-xl flex justify-between items-center px-4 py-2">
                      <p className="text-sm text-bleu-secondaire">{pdf.fileName || 'Choisir un fichier PDF'}</p>
                        <input 
                          type="file" 
                          onChange={(e) => {
                            const updated = [...pdfs]
                            updated[index].fileName = e.target.files[0]?.name || ''
                            setPdfs(updated);
                          }}
                          className="hidden" 
                          id={`thumbnail-upload-${index}`}
                        />
                        <label 
                          htmlFor={`thumbnail-upload-${index}`} 
                          className="bg-bleu-secondaire text-white rounded-xl px-10 py-1.5 cursor-pointer hover:bg-bleu-secondaire/90 transition duration-300 ease-in-out"
                        >
                          Parcourir
                        </label>
                      </div>
                  })}
                <div className='flex flex-col gap-1 my-2'>
                  <label htmlFor='order' className='text-gris-fonce text-sm'>Order</label>
                  <select type="text" name='order' id='order' className='border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition' placeholder={`Entrez titre de la leçon...`} >
                    <option value=""></option>
                    {lecon.map(l => (
                      <option className='text-black' value={pdfs.length}>{pdfs.length}</option>
                    ))}
                  </select>
                </div>
                <input onClick={() => setPdfs([...pdfs, {fileName: '', order: ''}])} type="button" className='text-orange-cuivre text-end cursor-pointer hover:text-orange-cuivre/55 transition duration-500 ease-in-out' value="Ajouter un autre PDF" />
              </>
            )}
            <div className='flex items-center justify-between mt-5'>
              <input onClick={() => setSteps(prev => prev - 1)} type="button" value="Retour" className='text-bleu-secondaire cursor-pointer hover:text-bleu-secondaire/75 transition duration-300 ease-in-out' />
              <div className={`w-1/2 gap-3 flex`}>
                  <input onClick={() => navigate(location.pathname)} type="button" value={steps === 1 ? 'Annule' :`Passer`} className='text-sm w-5/6 bg-white border-2 border-gris-clair rounded-xl p-2 cursor-pointer text-bleu-secondaire font-semibold hover:bg-gray-100 transition duration-300 ease-in-out' />
                  <input type="button" onClick={() => setSteps(prev => prev + 1)} value={steps === 4 ? `Terminer` : 'Suivant'} className={`text-sm w-5/6 bg-orange-cuivre border-2 border-orange-cuivre rounded-xl p-2 cursor-pointer text-white font-semibold hover:bg-orange-cuivre/90 transition duration-300 ease-in-out`} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default LessonBuilderModal