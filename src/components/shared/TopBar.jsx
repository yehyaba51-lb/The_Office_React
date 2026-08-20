import React, { useState } from 'react'
import { Link, useLocation, useMatches, useNavigate, useParams } from 'react-router-dom'
import { MoveLeft, Plus } from 'lucide-react'
import { fakeCoursDetail } from '../../fakeData'


const TopBar = () => {
  const [lang, setLang] = useState('fr')
  const activeClass = ( isActive ) => `${ isActive ? 'w-8 bg-orange-cuivre text-sm rounded p-0.5 flex justify-center items-center text-white font-semibold' : 'w-10 flex justify-center items-center text-sm text-bleu-secondaire font-m cursor-pointer hover:underline hover:text-orange-cuivre'}`
  const matches = useMatches()
  const { titre, sousTitre, backLink, addButton } = matches[matches.length - 1].handle
  const location = useLocation()
  const navigate = useNavigate()
  
  const { id } = useParams()
  const selectedCours = fakeCoursDetail.find(cours => cours.id === Number(id))

  const displayTitre = selectedCours ? selectedCours.titre : titre
  return (
    <>
      <div className='flex justify-between w-full p-5'>
        <div className="flex flex-col gap-1">
        {backLink && (
          <Link to='/admin/cours' className='text-gris-fonce text-sm flex items-center gap-1'>
            <MoveLeft size='15' /> {sousTitre}
          </Link>
        )}
          <h1 className='font-titres text-bleu-secondaire font-semibold text-2xl'>{displayTitre}</h1>
          {!backLink && (
            <p className='text-gris-fonce text-sm'>{sousTitre}</p>
          )}
        </div>
        <div className='flex items-center gap-5'>
          {addButton ? (
            <div className='flex items-center rounded bg-orange-cuivre px-4 py-1 gap-1 hover:bg-orange-cuivre/90 transition duration-300 ease-in-out cursor-pointer'>
              <Plus className='text-white' size={15} />
              <button onClick={() => navigate(`${location.pathname}?create=true`)} className='text-white text-sm font-semibold cursor-pointer'>{addButton}</button>
            </div>
          ) : ''}
          <div className="border-2 border-gris-clair h-8 flex items-center px-1 rounded-lg">
            <button className={activeClass(lang === 'en')} onClick={() => setLang('en')} >EN</button>
            <button className={activeClass(lang === 'fr')} onClick={() => setLang('fr')} >FR</button>
          </div>
        </div>
      </div>
      <hr className='border-bleu-secondaire w-4/5 mx-auto opacity-50' />
    </>
  )
}

export default TopBar