import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import StateBox from "../../components/shared/PageComponents/StateBox";
import FormModal from "../../components/modals/FormModal";
import SuccessModal from "../../components/modals/SuccessModal";
import ConfirmModal from "../../components/modals/ConfirmModal";
import { exerciceFields } from '../../formModalsData'
import TableData from "../../components/shared/PageComponents/TableData";
import { etudiantsInscritsColumns } from "../../fakeData";
import { toast } from 'react-toastify'
import { FileX } from "lucide-react";
import Spinner from "../../components/shared/Spinner";
import FetchError from "../../components/shared/FetchError";

const CoursDetails = () => {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
  const [cours, setCours] = useState(null)
  const [lecons, setLecons] = useState([])
  const [inscriptions, setInscriptions] = useState([])
  const [hasErrors, setHasErrors] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  const { id } = useParams();
  const getSelectedCours = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/cours.php?id=${id}`)
      const data = await response.json()

      if(!response.ok){
        toast.error(data.error)
      }

      setCours(data)
      return true
    } catch (error) {
      setCours(null)
      return false
    }
  }


  const getLecons = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/lecons.php?id=${id}`)
      const data = await response.json()

      if(!response.ok){
        toast.error(data.error)
      }

      setLecons(data)
      
      return true
    } catch (error) {
      setLecons([])
      return false
    }
  }
  const getInscriptions = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/inscriptions.php?id=${id}`)
      const data = await response.json()

      if(!response.ok){
        toast.error(data.error)
      }
      
      setInscriptions(data)
      
      return true
    } catch (error) {
      setInscriptions([])
      return false
    }
  }


  useEffect(() => {
    const loadEverything = async () => {
      const results = await Promise.all([getSelectedCours(), getInscriptions(), getLecons()])
      
      setHasErrors(results.includes(false))

      setLoading(false)
    }

    loadEverything()
  }, [])

  

  const [searchParams] = useSearchParams()
  const showModal = searchParams.get('create')=== 'true'
  const showSuccess = searchParams.get('success')=== 'true'
  const showDelete = searchParams.get('delete')=== 'true'
  const etudiantId = Number(searchParams.get('id'))


  const leconId = Number(searchParams.get('leconId'))
  const coursId = Number(searchParams.get('coursId'))

  
  const selectedLecon = lecons ? lecons.find(l => l.id === Number(leconId) && l.cours_id === coursId) : ''
  
  const selectedInscription = inscriptions.length > 0 ? inscriptions.find(i => i.id === etudiantId) : '';  
  
  const addExercice = async (submittedExercice) => {
    let errors = []
    const nameRegex = /^[a-zA-ZÀ-ÿ' :\-]*$/
    if(!submittedExercice.exercice_titre || submittedExercice.exercice_titre.length < 2 || !nameRegex.test(submittedExercice.exercice_titre)){
      errors.push('Titre invalide')
    }

    try {
      const response  = await fetch(`${import.meta.env.VITE_SERVER_URL}/exercices.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...submittedExercice,
          coursId,
          leconId})
      })
      const data = await response.json()

      if(!response.ok){
        return false
      }

      getLecons()
      return true
    } catch (error) {
      toast.error("Impossible de créer l'exercice");
      return false
    }
  }

  const supprimerInscription = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}/inscriptions.php?id=${id}`, {
        method: 'DELETE'
      })

      toast.success(`Inscription de ${selectedInscription.etudiant} supprimé`);
      getInscriptions()
      return true
    } catch (error) {
      toast.error("Impossible de supprimer l'inscription");
      return false
    }
  }
  
  return (
    <div  className="flex flex-col justify-center">
      {showModal && (
        <FormModal type={ 'un exercice' } fields={ exerciceFields } submitFunction={ addExercice } />
      )}
      {showSuccess && (
        <SuccessModal type={ 'Exercice' } content = { selectedLecon.lecon_titre } create={ true } lecon={ true } />
      )}
      {showDelete && (
        <ConfirmModal type={ "l'inscription" } inscriptionEtudiant={ selectedInscription.etudiant } deleteFunction={ () => supprimerInscription(selectedInscription.id) } irreversible={ false } />
      )}
      <div
        className={`flex flex-col items-center justify-center p-2 mx-5 ${loading && "mt-25"}`}
      >
        {loading ? (
          <Spinner />
        ) : hasErrors ? (
          <FetchError />
        ) : (
          cours ? (
            <div className="w-full">
              <div className="flex justify-between w-full">
                <StateBox titre={"Formateur"} label={capitalize(cours.formateur)} />
                <StateBox
                  titre={"Étudiants inscrits"}
                  label={ inscriptions ? inscriptions.length : '0' }
                />
                <StateBox titre={"Leçons"} label={cours.lecons} />
                <StateBox titre={"Exercices"} label={cours.exercices} />
              </div>
              <div className="m-5 border-2 border-gris-clair rounded-2xl px-5 py-2 flex flex-col gap-2 items-start justify-between">
                <h3 className="font-titres text-gris-fonce/80 text-xl">Description</h3>
                <p className="text-bleu-principal text-md">
                  {cours.description ? capitalize(cours.description) : 'Pas de description'}
                </p>
              </div>
              <div className="flex flex-col gap-3 px-5 py-2 w-full mb-5">
                <h3 className="font-titres text-bleu-principal font-semibold text-xl">Leçons</h3>
                <div className="border-2 border-gris-clair rounded-2xl p-1 flex flex-col gap-2 justify-between">
                  {cours && lecons.length === 0 ? (
                      <p className="text-bleu-secondaire self-center p-4">Pas de leçons</p>
                  ) : lecons.map((lecon) => (
                    <div
                      key={`${lecon.id}-${lecon.cours_id}`}
                      className={`flex flex-col border-t-${lecon.id === 1 ? 0 : 2} border-gris-clair p-4 gap-3`}
                    >
                      
                      <div className="flex justify-between">
                        <div className="flex gap-4">
                          <div className="bg-orange-cuivre/30 w-12 h-12 rounded flex items-center justify-center text-orange-cuivre text-2xl font-bold">
                            {String(lecon.lecon_ordre).padStart(2, "0")}
                          </div>
                          <div className="flex flex-col items-start">
                            <h3 className="font-titres text-bleu-principal font-semibold text-lg">
                              {capitalize(lecon.lecon_titre)}
                            </h3>
                            <p className="text-bleu-secondaire text-sm">
                              {lecon.description ? capitalize(lecon.description) : ''}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <p className="text-bleu-secondaire flex text-md">
                            {lecon.types.length > 0 ? lecon.types.join(" · ") : 'Pas de contenu'}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-bleu-secondaire">
                          Exercices: {lecon.exercices}
                        </p>
                        <input
                          type="submit"
                          value="Ajouter Exercice"
                          className="text-orange-cuivre text-md font-semibold cursor-pointer hover:text-orange-cuivre/75 transition duration-300 ease-in-out"
                          onClick={() => navigate(`${location.pathname}?create=true&coursId=${lecon.cours_id}&leconId=${lecon.id}`)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 px-5 py-2 mb-3">
                <h3 className="font-titres text-bleu-principal font-semibold text-xl">Étudiants inscrits</h3>
                <TableData
                  columns={ etudiantsInscritsColumns }
                  rows={ inscriptions }
                  edit={false} />
              </div>
            </div>
          ) : (
            <div className="border-2 border-gris-clair rounded-2xl p-12 flex flex-col items-center gap-3 text-center m-5">
              <div className="w-14 h-14 rounded-full bg-gris-fonce/10 flex items-center justify-center mb-2">
                <FileX className="text-gris-fonce" size={26} />
              </div>
              <h3 className="text-bleu-principal font-titres font-semibold text-lg">Cours introuvable</h3>
              <p className="text-gris-fonce text-sm max-w-sm">Ce cours n'existe pas ou a été supprimé. Vérifiez le lien ou retournez à la liste des cours.</p>
              <button 
                onClick={() => navigate('/admin/cours')} 
                className="mt-3 bg-bleu-secondaire text-white rounded-xl px-5 py-2 text-sm font-semibold hover:bg-bleu-secondaire/90 transition duration-300 ease-in-out cursor-pointer"
              >
                Retour aux cours
              </button>
            </div>
          )
        )}

      </div>
    </div>
  );
};

export default CoursDetails;
