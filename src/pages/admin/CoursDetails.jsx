import React, { useEffect, useState } from "react";
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
  const [cours, setCours] = useState([])
  const [lecons, setLecons] = useState([])
  const [exercices, setExercices] = useState([])
  const [inscriptions, setInscriptions] = useState([])
  const [hasErrors, setHasErrors] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  const getCours = async () => {
    try {
      const response = await fetch('http://localhost:8000/cours')
      const data = await response.json()

      setCours(data)
      return true
    } catch (error) {
      setCours('')
      return false
    }
  }

  const getCoursDetail = async () => {
    try {
      const response = await fetch('http://localhost:8000/lecons')
      const data = await response.json()
      
      setLecons(data)
      return true
    } catch (error) {
      setLecons('')
      return false
    }
  }

  const getExercices = async () => {
    try {
      const response = await fetch('http://localhost:8000/exercices')
      const data = await response.json()

      setExercices(data)
      return true
    } catch (error) {
      setExercices('')
      return false
    }
  }

  const getInscriptions = async () => {
    try {
      const response = await fetch('http://localhost:8000/inscriptions')
      const data = await response.json()

      setInscriptions(data)
      
      return true
    } catch (error) {
      setInscriptions('')
      return false
    }
  }

  useEffect(() => {
    const loadEverything = async () => {
      const results = await Promise.all([getCours(), getCoursDetail(), getExercices(), getInscriptions()])
      setHasErrors(results.includes(false))

      setLoading(false)
    }

    loadEverything()
  }, [])

  const { id } = useParams();
  const selectedCours = cours ? cours.find(
    (cours) => cours.id === id,
  ) : ''
  const selectedLecons = lecons ? lecons.filter(
    (lecon) => lecon.coursId === Number(id),
  ) : ''
  
  
  
  const exerciceCount = (lecon) => {
    return exercices ? exercices.filter(exo => exo.leconId === Number(lecon.id) && exo.coursId === Number(id)).length : "Pas d'exercices"
  };

  const [searchParams] = useSearchParams()
  const showModal = searchParams.get('create')=== 'true'
  const showSuccess = searchParams.get('success')=== 'true'
  const showDelete = searchParams.get('delete')=== 'true'
  const etudiantId = searchParams.get('id')


  const leconId = Number(searchParams.get('leconId'))
  const coursId = Number(searchParams.get('coursId'))
  const selectedLecon = lecons ? lecons.find((lecon) => lecon.coursId === Number(id) && Number(lecon.id) === leconId) : ''

  
  const enrolledStudentsNumber = selectedCours && inscriptions.filter(e => e.coursId === Number(selectedCours.id)).length
  const numberOfExercices = exercices ? exercices.filter(e => e.coursId === Number(id)).length : 0
  
  const selectedInscription = inscriptions ? inscriptions.find(i => i.id === etudiantId) : '';
  console.log(selectedInscription);
  
  const addExercice = async (submittedExercice) => {
    try {
      await fetch('http://localhost:8000/exercices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...submittedExercice,
          coursId: coursId,
          leconId: leconId
        })
      })

      getExercices()
    } catch (error) {
      toast.error("Impossible de créer l'exercice");
    }
  }

  const supprimerInscription = async (id) => {
    try {
      await fetch(`http://localhost:8000/inscriptions/${id}`, {
        method: 'DELETE'
      })

      toast.success(`Inscription de ${selectedInscription.etudiant} supprimé`);
      getInscriptions()
    } catch (error) {
      toast.error("Impossible de supprimer l'inscription");
    }
  }
  return (
    <div  className="flex flex-col justify-center">
      {showModal && (
        <FormModal type={ 'un exercice' } fields={ exerciceFields } submitFunction={ addExercice } />
      )}
      {showSuccess && (
        <SuccessModal type={ 'Exercice' } content = { selectedLecon.titre } create={ true } lecon={ true } />
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
          selectedCours ? (
            <div className="w-full">
              <div className="flex justify-between w-full">
                <StateBox titre={"Formateur"} label={selectedCours.formateur} />
                <StateBox
                  titre={"Étudiants inscrits"}
                  label={ enrolledStudentsNumber }
                />
                <StateBox titre={"Leçons"} label={selectedCours.lecons} />
                <StateBox titre={"Exercices"} label={numberOfExercices} />
              </div>
              <div className="m-5 border-2 border-gris-clair rounded-2xl px-5 py-2 flex flex-col gap-2 items-start justify-between">
                <h3 className="font-titres text-gris-fonce/80 text-xl">Description</h3>
                <p className="text-bleu-principal text-md">
                  {selectedCours.description ? selectedCours.description : 'Pas de description'}
                </p>
              </div>
              <div className="flex flex-col gap-3 px-5 py-2 w-full mb-5">
                <h3 className="font-titres text-bleu-principal font-semibold text-xl">Leçons</h3>
                <div className="border-2 border-gris-clair rounded-2xl p-1 flex flex-col gap-2 justify-between">
                  {selectedCours && selectedLecons.length === 0 ? (
                      <p className="text-bleu-secondaire self-center p-4">Pas de leçons</p>
                  ) : selectedLecons.map((lecon) => (
                    <div
                      key={`${lecon.id}-${lecon.coursId}`}
                      className={`flex flex-col border-t-${lecon.id === '1' ? '0' : '2'} border-gris-clair p-4 gap-3`}
                    >
                      <div className="flex justify-between">
                        <div className="flex gap-4">
                          <div className="bg-orange-cuivre/30 w-12 h-12 rounded flex items-center justify-center text-orange-cuivre text-2xl font-bold">
                            {String(lecon.ordre).padStart(2, "0")}
                          </div>
                          <div className="flex flex-col items-start">
                            <h3 className="font-titres text-bleu-principal font-semibold text-lg">
                              {lecon.titre}
                            </h3>
                            <p className="text-bleu-secondaire text-sm">
                              {lecon.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <p className="text-bleu-secondaire flex text-md">
                            {lecon.types.join(" · ")}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-bleu-secondaire">
                          Exercices: {exerciceCount(lecon)}
                        </p>
                        <input
                          type="submit"
                          value="Ajouter Exercice"
                          className="text-orange-cuivre text-md font-semibold cursor-pointer hover:text-orange-cuivre/75 transition duration-300 ease-in-out"
                          onClick={() => navigate(`${location.pathname}?create=true&coursId=${lecon.coursId}&leconId=${lecon.id}`)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 px-5 py-2 mb-3">
                <h3 className="font-titres text-bleu-principal font-semibold text-xl">Étudiants inscrits</h3>
                <TableData columns={ etudiantsInscritsColumns } rows={ inscriptions.filter(e => e.cours === selectedCours.titre) }  edit={false} />
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
                onClick={() => navigate('/formateur/cours')} 
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
