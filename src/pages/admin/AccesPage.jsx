import React from 'react'
import { fakeUsers, fakeCours, fakeAcces } from '../../fakeData'
import { CircleX, KeyRound } from 'lucide-react'
import ConfirmModal from '../../components/modals/ConfirmModal'
import SuccessModal from '../../components/modals/SuccessModal'
import { toast } from 'react-toastify'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

const AccesPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const showModal = searchParams.get('success') === 'true'
  const showDelete = searchParams.get('delete') === 'true'

  const deleteId = searchParams.get('id')
  const selectedInscription = fakeAcces.find(inscription => inscription.id === Number(deleteId))

  const supprimerInscription = () => {
        toast.success("Inscription supprimer");
      }
  return (
    <div className='flex flex-col justify-start'>
      {showModal && (
        <SuccessModal type={'Accès'} content={"« Gestion d'équipe et leadership »"} accord={'« Amira Zouaoui »'} />
      )}
      {showDelete && selectedInscription && (
        <ConfirmModal type={"l'inscription"} name={ selectedInscription.cours } deleteFunction={supprimerInscription} inscriptionEtudiant={selectedInscription.etudiant} irreversible={false} />
      )}
      <div className="flex justify-between p-2 mx-5 gap-7">
        <div className="h-fit gap-2 border-2 justify-start border-gris-clair w-2/5 rounded-2xl py-6 px-4 mt-5 flex flex-col items-start">
          <h2 className='font-titres font-semibold text-bleu-principal text-xl px-3 mb-1'>Accorder un accès</h2>
          <div className="flex flex-col w-full">
            <div className='flex flex-col gap-1 mt-3 w-full'>
              <label htmlFor='Email' className='text-gris-fonce text-md'>Rechercher</label>
              <input type="text" name="email" id='Email' className='border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition' placeholder="Nom d'étudiant" />
            </div>
            <div className='flex flex-col gap-1 mt-3 w-full'>
              <label htmlFor='Email' className='text-gris-fonce text-md'>Email</label>
              <select type="text" name="email" id='Email' className='border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition' placeholder='Entrer votre email'>
                {fakeUsers.filter(user => user.role === 'Etudiant').map(u => (
                  <option value={u.id} key={u.id}>{u.nom + ' ' + u.prenom}</option>
                ))}
              </select>
            </div>
            <div className='flex flex-col gap-1 mt-3 w-full'>
              <label htmlFor='Email' className='text-gris-fonce text-md'>Email</label>
              <select type="text" name="email" id='Email' className='border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition' placeholder='Entrer votre email'>
                {fakeCours.map(cours => (
                  <option value={cours.id} key={cours.id}>{cours.titre}</option>
                ))}
              </select>
            </div>
          </div>
          <button onClick={() => navigate(`${location.pathname}?success=true`)} className='text-white font-semibold mt-3 flex items-center rounded bg-orange-cuivre px-4 py-1 gap-1 hover:bg-orange-cuivre/90 transition duration-300 ease-in-out cursor-pointer'>
            <KeyRound className='text-white' size={16} /> Donner l'accès
          </button>
        </div>
        <div className="border-2 border-gris-clair w-3/5 rounded-2xl py-6 px-4 mt-5 flex flex-col gap-3 justify-center items-start">
          <h2 className='font-titres font-semibold text-bleu-principal text-xl px-3 mb-2'>Accès déjà accordés</h2>
              {fakeAcces.map(access => (
                <div key={access.id} className='w-full text-bleu-secondaire text-md flex px-2 py-1 justify-between items-center border-2 border-gris-clair rounded-xl'>
                  <div className="flex items-center gap-3">
                    <div className="bg-gris-clair w-10 h-10 rounded-full flex justify-center items-center font-semibold text-bleu-principal">
                      {access.etudiant[0]}
                    </div>
                    <div className="flex flex-col">
                      <h3 className='text-bleu-secondaire font-semibold'>{access.etudiant}</h3>
                      <p className='text-gris-fonce text-sm'>{access.cours}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <h4 className="font-titres text-md text-gris-fonce">{access.date}</h4>
                    <CircleX size={18} className='cursor-pointer hover:text-gris-fonce/40 transition duration-300 ease-in-out' onClick={() => navigate(`${location.pathname}?delete=true&id=${access.id}`)} />
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  )
}

export default AccesPage