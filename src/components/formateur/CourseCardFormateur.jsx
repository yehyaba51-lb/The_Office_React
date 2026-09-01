import React, { useState } from 'react'
import ProgressBar from '../shared/ProgressBar'
import { Link } from 'react-router-dom'
import Spinner from '../../components/shared/Spinner'

const CourseCardFormateur = ({ cours, enrolled, etudiant=false }) => {
  const [imageLoadedCount, setImageLoadedCount] = useState(0)
  // const allLoaded = imageLoadedCount >= cours.length

  const descriptionSlice = (description) => {
    return description.slice(0, 150) + '...'
  }
  
  return (
    <>
      {
        <div className="flex items-center justify-center">
          
        </div>
      }
        <div className={`w-full rounded-2xl h-fit flex gap-20 justify-between p-2`}>
          {cours.map(c => (
              <Link to={`${c.id}`} className='w-1/2 flex flex-col gap-2 border-2 border-gris-clair rounded-2xl'>
                <div className='relative w-full h-40'>
                  <div className="rounded-xl bg-bleu-principal py-1 px-3 absolute inset-2 w-fit flex items-center justify-center h-10">
                    <p className='text-white text-sm font-semibold'>{c.categorie}</p>
                  </div>
                        <img
                            src={c.imageUrl || "https://picsum.photos/seed/default/600/300"}
                            alt="cours_image"
                            className="rounded-t-2xl w-full"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                </div>
                <div className='flex flex-col gap-1 p-3'>
                  <h3 className='font-titres text-xl font-semibold text-bleu-principal'>{c.titre}</h3>
                  <p className='text-md text-bleu-secondaire'>{descriptionSlice(c.description)}</p>
                  <div className='flex justify-between items-center'>
                    {etudiant ? (
                      <div className='flex items-center gap-3'>
                        <div className="w-10 h-10 rounded-full bg-gris-clair flex items-center justify-center text-bleu-secondaire font-semibold">{cours[0].formateur[0]}</div>
                        <p className='font-semibold text-bleu-principal'>{cours[0].formateur}</p>
                      </div>
                    ) : (
                      <p className='text-gris-fonce text-md'>{enrolled} étudiants inscrits</p>
                    )}
                    <p className='text-gris-fonce text-md'>4 leçons · 5 exercices</p>
                  </div>
                  <div className="flex flex-col gap-2 my-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-titres text-md font-semibold text-bleu-principal">Complétion</h3>
                      <p  className='text-orange-cuivre font-semibold'>2/4</p>
                    </div>
                    <div className="w-full">
                      <ProgressBar current={2} total={4} className='w-full'/>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
    </>
  )
}

export default CourseCardFormateur