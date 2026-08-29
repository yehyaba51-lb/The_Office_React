import React, { useState } from 'react'
import StateBox from '../../components/shared/PageComponents/StateBox'
import RecentActivities from '../../components/shared/PageComponents/RecentActivities'
import QuickAccess from '../../components/shared/PageComponents/QuickAccess'
import { GraduationCap, ChartSpline, Book , NotebookPen} from 'lucide-react'
import { fakeActivitesFormateur, fakeEtudiantsInscrits, fakeUsers, fakeCours, fakeSoumissions } from '../../fakeData'

const TableauDeBordFormateur = () => {
    const [allActivities, setAllActivities] = useState(false)
  
    const filteredActivitesFormateur = allActivities ? fakeActivitesFormateur : fakeActivitesFormateur.slice(0, 5)

    const formateur = fakeUsers.find(user => user.id === 3);
    const coursSelected = fakeCours.filter(c => c.formateur === `${formateur.prenom} ${formateur.nom}`);

    const numberOfCours = coursSelected.length

    const enrolledStudents = fakeEtudiantsInscrits.filter(s => 
      coursSelected.some(c => c.titre === s.cours)
    ).length

    const numberOfsoumission = fakeSoumissions.filter(s => s.cours === coursSelected[0].titre).length

    

  return (
    <div className='flex flex-col justify-start'>
      <div className="flex justify-between p-2 mx-5">
        <StateBox icon={GraduationCap} titre={ enrolledStudents } label={'Étudiants'} footer={'+2 ce mois-ci'} />
        <StateBox icon={Book} titre={ numberOfCours } label={'Cours'} footer={'+1 ce mois-ci'} />
        <StateBox icon={ChartSpline} titre={'76%'} label={'Complétion moyen'} />
        <StateBox icon={NotebookPen} titre={ numberOfsoumission } label={'Soumissions à corriger'} footer={'+2 ce mois-ci'} />
      </div>
      <div className='flex gap-1 mx-6'>
        <div className='w-4/5'>
          <div className='border-2 border-gris-clair rounded-2xl p-2 mx-5 my-1 flex flex-col'>
            <h2 className='font-titres font-semibold text-bleu-principal text-xl px-3 mb-1'>Activité récente</h2>
            {filteredActivitesFormateur.map(activity => (
              <RecentActivities badge={ activity.bagde } text={ activity.text } date={ activity.date } to={ activity.to }  />
            ))}
            <button className='font-semibold text-orange-cuivre text-lg cursor-pointer hover:text-orange-cuivre/75 hover:underline transition duration-300 ease-in-out' onClick={() => setAllActivities(activity => !activity)}>{allActivities ? 'Voir moins' : 'Voir plus'}</button>
          </div>
        </div>
        <div className='w-1/3'>
          <div className='border-2 border-gris-clair rounded-xl p-3 mx-5 my-1 flex flex-col gap-2'>
            <h2 className='font-titres font-semibold text-bleu-principal text-xl'>Accès rapide</h2>
            <QuickAccess link={'Gérer mes cours'} portail={'formateur'} direction={'cours'} />
            <QuickAccess link={'Corriger les exercices' } portail={'formateur'} direction={'categorie'} />
            <QuickAccess link={'Voir mes étudiants' } portail={'formateur'} direction={'acces'} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TableauDeBordFormateur