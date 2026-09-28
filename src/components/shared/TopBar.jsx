import{ useEffect, useState } from 'react'
import { Link, useLocation, useMatches, useNavigate } from 'react-router-dom'
import { MoveLeft, Plus, Menu } from 'lucide-react'
import { toast } from 'react-toastify'

const TopBar = ({ currentUser, mobileMenuOpen, setMobileMenuOpen }) => {
  const capitalize = (str) => str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  const [lang, setLang] = useState('fr')
  const activeClass = ( isActive ) => `${ isActive ? 'w-8 bg-orange-cuivre text-sm rounded p-0.5 flex justify-center items-center text-white font-semibold' : 'w-10 flex justify-center items-center text-sm text-bleu-secondaire font-m cursor-pointer hover:underline hover:text-orange-cuivre'}`
  const matches = useMatches()
  const { titre, sousTitre, backLink, addButton } = matches[matches.length - 1].handle || {}
  const location = useLocation()
  const navigate = useNavigate()
  const [cours, setCours] = useState(null)
  const [lecon, setLecon] = useState(null)
  const { id, leconId } = matches[matches.length - 1].params

  const getCours = async () => {
    if(!id) {
      setCours(null)
      return
    }

    const isCoursDetail = location.pathname.includes('cours/')

    if(!isCoursDetail){
      setCours(null)
      return
    }
    
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/cours.php?id=${id}`, {
        credentials: 'include',
      });
      const data = await response.json();

      if(!response.ok){
        toast.error(data.error)
        return false
      }

      setCours(data);
      return true;
    } catch (error) {
      setCours([]);
      return false;
    }
  };

  const getLecon = async () => {
    if(!leconId) {
      setLecon(null)
      return
    }

    const isLeconDetail = location.pathname.includes('cours/')

    if(!isLeconDetail){
      setCours(null)
      return
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/lecons.php?id=${id}&lecon=${leconId}&one=true`, {
        credentials: 'include',
      })
      const data = await response.json()

      if(!response.ok){
        toast.error(data.error)
        return false
      }

      setLecon(data)
      return true
    } catch (error) {
      setLecon([])
      return false
    }
  }

  useEffect(() => {
    const loadEverything = async () => {
      await Promise.all([
        getCours(),
        getLecon()
      ])
    }
    
    loadEverything()
  }, [id, leconId])
  
  const finalBackLink = leconId ? backLink.replace(':id', id).replace(':leconId', leconId) : id ? backLink.replace(':id', id) : backLink
  const displayTitre = lecon?.lecon_titre || cours?.cours_titre || titre || ''
  return (
    <>
      <div className='flex justify-between w-full p-3 md:p-5 gap-3'>
        <div className="flex items-start gap-3">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden mt-1 text-bleu-principal cursor-pointer">
            <Menu size={24} />
          </button>
          <div className="flex flex-col gap-1">
          {backLink && sousTitre && (
            <Link to={ finalBackLink } className='text-gris-fonce text-xs md:text-sm flex items-center gap-1'>
              <MoveLeft size='15' /> {sousTitre}
            </Link>
          )}
            {displayTitre && <h1 className='font-titres text-bleu-secondaire font-semibold text-lg md:text-2xl'>{capitalize(displayTitre)}</h1>}
            {!backLink && (
              sousTitre ? (
                <p className='text-gris-fonce text-xs md:text-sm'>{sousTitre}</p>
              ) : (
                <p className='text-gris-fonce text-xs md:text-sm'>{`${capitalize(currentUser.prenom)} ${capitalize(currentUser.nom)}`}</p>
                
              )
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