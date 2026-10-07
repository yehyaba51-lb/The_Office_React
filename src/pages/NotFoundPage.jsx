import { SearchX } from 'lucide-react'
import { useNavigate, useMatches } from 'react-router-dom'

const NotFoundPage = () => {
  const navigate = useNavigate()
  const matches = useMatches();
  const { homeLink } = matches[matches.length - 1].handle
  return (
    <div className='flex flex-col gap-5 items-center justify-center mt-25 py-2 px-6'>
        <div className="rounded-full bg-gris-clair w-18 h-18 flex items-center justify-center">
            <SearchX  size={32} className='text-bleu-secondaire' />
        </div>
        <h1 className="font-titres text-bleu-principal font-semibold text-6xl">404</h1>
        <h3 className="font-titres text-bleu-principal font-semibold text-2xl">Page introuvable</h3>
        <p className="text-bleu-principal text-md text-center">Cette page n'existe pas ou l'adresse est incorrecte. Vérifiez le <br /> lien ou retournez à l'accueil.</p>
        <button onClick={() => navigate(homeLink)} className="bg-orange-cuivre px-6 py-2 rounded-xl text-white font-semibold cursor-pointer hover:bg-orange-cuivre/90 transition duration-300 ease-in-out">Retour à l'accueil</button>
    </div>
  )
}

export default NotFoundPage