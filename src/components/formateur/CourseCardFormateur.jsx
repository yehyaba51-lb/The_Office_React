import React from 'react'
import ProgressBar from '../shared/ProgressBar'
import { Link } from 'react-router-dom'

const CourseCardFormateur = ({ cours, enrolled }) => {
  return (
    <div className='w-full rounded-2xl h-fit flex gap-20 justify-between p-2'>
      {cours.map(c => (
        <Link to={`${c.id}`} className='w-1/2 flex flex-col gap-2 border-2 border-gris-clair rounded-2xl'>
          <div className='relative w-full'>
            <div className="rounded-xl bg-bleu-principal py-1 px-3 absolute inset-2 w-fit flex items-center justify-center h-10">
              <p className='text-white text-sm font-semibold'>{c.titre}</p>
            </div>
            <img src={c.imageUrl} alt="cours_image" className='rounded-t-2xl w-full' />
          </div>
          <div className='flex flex-col gap-1 p-3'>
            <h3 className='text-xl font-semibold text-bleu-principal'>{c.titre}</h3>
            <p className='text-md text-bleu-secondaire'>{c.description}</p>
            <div className='flex justify-between'>
              <p className='text-gris-fonce text-md'>{enrolled} étudiants inscrits</p>
              <p className='text-gris-fonce text-md'>4 leçons · 5 exercices</p>
            </div>
            <div className="flex flex-col gap-2 my-3">
              <div className="flex justify-between items-center">
                <h3 className="text-md font-semibold text-bleu-principal">Complétion</h3>
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
  )
}

export default CourseCardFormateur