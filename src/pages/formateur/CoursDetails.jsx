import React, { useState } from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fakeCoursDetail, fakeLecons, fakeExercices, fakeEtudiantsInscrits } from "../../fakeData";
import StateBox from "../../components/shared/PageComponents/StateBox";
import FormModal from "../../components/modals/FormModal";
import SuccessModal from "../../components/modals/SuccessModal";
import ConfirmModal from "../../components/modals/ConfirmModal";
import { exerciceFields } from '../../formModalsData'
import TableData from "../../components/shared/PageComponents/TableData";
import { etudiantsInscritsColumns } from "../../fakeData";
import { toast } from 'react-toastify'

const CoursDetails = () => {
  const [fileName, setFileName] = useState('')
  const navigate = useNavigate()
    const location = useLocation()
    const { id } = useParams();
    const selectedCours = fakeCoursDetail.find(
      (cours) => cours.id === Number(id),
    );
    const selectedLecons = fakeLecons.filter(
      (lecon) => lecon.coursId === Number(id),
    );
    
  
    const exerciceCount = (lecon) => {
      return fakeExercices.filter((exo) => exo.leconId === lecon.id && exo.coursId === Number(id)).length;
    };
  
    const [searchParams] = useSearchParams()
    const showModal = searchParams.get('create')=== 'true'
    const showSuccess = searchParams.get('success')=== 'true'
    const showDelete = searchParams.get('delete')=== 'true'
    const etudiantId = searchParams.get('id')
  
    const selectedEtudiant = fakeEtudiantsInscrits.find(etudiant => etudiant.id === Number(etudiantId))
  
    const leconId = searchParams.get('leconId')
    const selectedLecon = fakeLecons.find((lecon) => lecon.coursId === Number(id) && lecon.id === Number(leconId))
  
    const enrolledStudentsNumber = fakeEtudiantsInscrits.filter(e => e.cours === selectedCours.titre).length
    const numberOfExercices = fakeExercices.filter(e => e.coursId === Number(id)).length
    
    const supprimerCours = () => {
      toast.success("Inscription supprimer");
    }

  const [isEditSpec, setIsEditSpec] = useState(false)
  const [description, setDescription] = useState(selectedCours.description)


  return (
    <div className="flex flex-col gap-3 mt-5">
      {showModal && (
        <FormModal type={ 'un leçon' } fields={ exerciceFields } />
      )}
      {showSuccess && (
        <SuccessModal type={ 'Lecçon' } content = { selectedLecon?.titre } create={ true } lecon={ true } />
      )}
      {showDelete && (
        <ConfirmModal name={ 'hello' } type={ "l'inscription" } inscriptionEtudiant={ selectedEtudiant.etudiant } deleteFunction={ supprimerCours } irreversible={ false } />
      )}
      <div className="flex justify-between">
        <StateBox
          titre={"Étudiants inscrits"}
          label={ enrolledStudentsNumber }
        />
        <StateBox titre={"Leçons"} label={selectedCours.lecons} />
        <StateBox titre={"Exercices"} label={numberOfExercices} />
      </div>
      <div className="border-2 border-gris-clair rounded-xl flex justify-between items-center px-4 py-2 mx-5">
        <p className="text-sm text-bleu-secondaire">{fileName || 'Aucun fichier sélectionné'}</p>
        <input 
          type="file" 
          onChange={(e) => setFileName(e.target.files[0]?.name || '')}
          className="hidden" 
          id="thumbnail-upload"
        />
        <label 
          htmlFor="thumbnail-upload" 
          className="bg-bleu-secondaire text-white rounded-xl px-6 py-2 cursor-pointer hover:bg-bleu-secondaire/90 transition duration-300 ease-in-out"
        >
          Parcourir
        </label>
      </div>
      <div className="m-5 border-2 border-gris-clair rounded-2xl px-5 py-2 flex flex-col gap-2 items-start justify-between">
        <h3 className="text-gris-fonce/80 text-xl">Description</h3>
        {isEditSpec ? (
          <>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="text-bleu-principal text-md w-full min-h-32 resize-none outline-none" />
          </>
        ) : (
        <p onClick={() =>setIsEditSpec(true)} className="text-bleu-principal text-md hover:text-bleu-principal/90 cursor-pointer" title='Modifier'>
          {selectedCours.description}
        </p>
        )}
      </div>
      {isEditSpec && <button onClick={() => setIsEditSpec(false)} className='self-end mx-5 bg-bleu-secondaire px-4 py-2 text-white font-semibold text-center rounded-lg hover:bg-bleu-secondaire/95 transition duration-300 ease-in-out cursor-pointer'>Enregistrer</button> }
      <div className="flex flex-col gap-3 px-5 py-2">
        <h3 className="text-bleu-principal font-semibold text-xl">Leçons</h3>
        <div className="w-full border-2 border-gris-clair rounded-2xl p-1 flex flex-col gap-2 justify-between">
          {selectedLecons.map((lecon) => (
            <div
              key={`${lecon.id}-${lecon.coursId}`}
              className={`flex flex-col  border-t-${lecon.id === 1 ? '0' : '2'} border-gris-clair p-4 gap-3`}
            >
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <div className="bg-orange-cuivre/30 w-12 h-12 rounded flex items-center justify-center text-orange-cuivre text-2xl font-bold">
                    {String(lecon.ordre).padStart(2, "0")}
                  </div>
                  <div className="flex flex-col items-start">
                    <h3 className="text-bleu-principal font-semibold text-lg">
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
                  className="text-orange-cuivre texts-md font-semibold cursor-pointer hover:text-orange-cuivre/75 transition duration-300 ease-in-out"
                  onClick={() => navigate(`${location.pathname}?create=true&leconId=${lecon.id}`)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 px-5 py-2 mb-3">
        <h3 className="text-bleu-principal font-semibold text-xl">Étudiants inscrits</h3>
        <TableData columns={ etudiantsInscritsColumns } rows={ fakeEtudiantsInscrits.filter(e => e.cours === selectedCours.titre) } />
      </div>
    </div>
  )
}

export default CoursDetails