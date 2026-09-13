import{ useEffect, useState } from 'react'
import { Link, useLocation, useMatches, useNavigate, useParams } from 'react-router-dom'
import { MoveLeft, Plus, Menu } from 'lucide-react'

const TopBar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const [lang, setLang] = useState('fr')
  const activeClass = ( isActive ) => `${ isActive ? 'w-8 bg-orange-cuivre text-sm rounded p-0.5 flex justify-center items-center text-white font-semibold' : 'w-10 flex justify-center items-center text-sm text-bleu-secondaire font-m cursor-pointer hover:underline hover:text-orange-cuivre'}`
  const matches = useMatches()
  const { titre, sousTitre, backLink, addButton } = matches[matches.length - 1].handle || {}
  const location = useLocation()
  const navigate = useNavigate()
  const [cours, setCours] = useState([])
  const [lecons, setLecons] = useState([])

  const getCours = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/cours.php`)
      const data = await response.json()

      setCours(data)
    } catch (error) {
      setCours([])
    }
  }

  const getLecons = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/lecons.php`)
      const data = await response.json()

      setLecons(data)
    } catch (error) {
      setLecons([])
    }
  }

  useEffect(() => {
    const loadEverything = async () => {
      await Promise.all([getCours(), getLecons()])
    }
    
    loadEverything()
  }, [])
  

  const { id, leconId } = useParams()

  const isNotePage = location.pathname.startsWith('/etudiant/notes');
  const selectedCours = !isNotePage ? cours ? cours.find(cours => cours.id === id) : [] : null

  
  const selectedLessons = lecons ? lecons.filter(l => l.coursId === Number(id)) : []
  const selectedLesson = selectedLessons.filter(l => l.id === Number(leconId))
  const selectedLeconTitre = selectedLesson.map(l => l.titre)

  const finalBackLink = leconId ? backLink.replace(':id', id).replace(':leconId', leconId) : id ? backLink.replace(':id', id) : backLink
  const displayTitre = selectedLeconTitre.length !== 0 ? selectedLeconTitre : selectedCours ? selectedCours.titre : titre

  return (
    <>
      <div className='flex justify-between w-full p-3 md:p-5 gap-3'>
        <div className="flex items-start gap-3">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden mt-1 text-bleu-principal cursor-pointer">
            <Menu size={24} />
          </button>
          <div className="flex flex-col gap-1">
          {backLink && (
            <Link to={ finalBackLink } className='text-gris-fonce text-xs md:text-sm flex items-center gap-1'>
              <MoveLeft size='15' /> {sousTitre}
            </Link>
          )}
            <h1 className='font-titres text-bleu-secondaire font-semibold text-lg md:text-2xl'>{displayTitre}</h1>
            {!backLink && (
              <p className='text-gris-fonce text-xs md:text-sm'>{sousTitre}</p>
            )}
          </div>
        </div>
        <div className='flex items-center gap-2 md:gap-5'>
          {addButton ? (
            <div onClick={() => navigate(`${location.pathname}?create=true`)} className='flex items-center rounded bg-orange-cuivre px-2 md:px-4 py-1 gap-1 hover:bg-orange-cuivre/90 transition duration-300 ease-in-out cursor-pointer'>
              <Plus className='text-white' size={15} />
              <button className='text-white text-xs md:text-sm font-semibold cursor-pointer hidden sm:block'>{addButton}</button>
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