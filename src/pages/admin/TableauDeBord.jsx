import React, { useState } from 'react'
import StateBox from '../../components/shared/PageComponents/StateBox'
import RecentActivities from '../../components/shared/PageComponents/RecentActivities'
import QuickAccess from '../../components/shared/PageComponents/QuickAccess'
import { fakeActivites, fakeUsers, fakeCours, fakeAcces } from '../../fakeData'
import { GraduationCap, Presentation, Book , KeyRound} from 'lucide-react'


const TableauDeBord = () => {
  const [allActivities, setAllActivities] = useState(false)

  const filteredActivities = allActivities ? fakeActivites : fakeActivites.slice(0, 5)
  
    const students =  fakeUsers.filter(user => user.role === 'Etudiant')
    const formateur =  fakeUsers.filter(user => user.role === 'Formateur')

  const numberOfStudents = students.length
  const numberOfFormateur = formateur.length
  const numberOfCours = fakeCours.length
  const numberOfAccess = fakeAcces.length

  const now = new Date()

  const studentsThisMonth = students.filter(s => {
    const d = new Date(s.creeLe)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length

  const formateurThisMonth = formateur.filter(f => {
  const d = new Date(f.creeLe)
    return d.getMonth() === now.getMonth() && d.getFullYear === now.getFullYear()
  }).length

  const coursThisMonth = fakeCours.filter(c => {
    const d = new Date(c.creeLe)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length

  const accessThisMonth = fakeAcces.filter(a => {
  const d = new Date(a.date)
    return d.getMonth() === now.getMonth() && d.getFullYear === now.getFullYear()
  }).length

  return (
    <div className='flex flex-col justify-start'>
      <div className="flex justify-between p-2 mx-5">
        <StateBox icon={GraduationCap} titre={ numberOfStudents } label={'Étudiants'} footer={`+${ studentsThisMonth } ce mois-ci`} />
        <StateBox icon={Presentation} titre={ numberOfFormateur } label={'Formateur'} footer={`+${ formateurThisMonth } ce mois-ci`} />
        <StateBox icon={Book} titre={ numberOfCours } label={'Cours'} footer={`+${ coursThisMonth } ce mois-ci`} />
        <StateBox icon={KeyRound} titre={ numberOfAccess } label={'Accès aux cours'} footer={`+${ accessThisMonth } ce mois-ci`} />
      </div>
      <div className='flex gap-1 mx-6'>
        <div className='w-4/5'>
          <div className='border-2 border-gris-clair rounded-2xl p-2 mx-5 my-1 flex flex-col'>
            <h2 className='font-titres font-semibold text-bleu-principal text-xl px-3 mb-1'>Activité récente</h2>
            {filteredActivities.map(activity => (
              <RecentActivities badge={ activity.bagde } text={ activity.text } date={ activity.date } to={ activity.to }  />
            ))}
            <button className='font-semibold text-orange-cuivre text-lg cursor-pointer hover:text-orange-cuivre/75 hover:underline transition duration-300 ease-in-out' onClick={() => setAllActivities(activity => !activity)}>{allActivities ? 'Voir moins' : 'Voir plus'}</button>
          </div>
        </div>
        <div className='w-1/3'>
          <div className='border-2 border-gris-clair rounded-2xl p-3 mx-5 my-1 flex flex-col gap-2'>
            <h2 className='font-titres font-semibold text-bleu-principal text-xl'>Accès rapide</h2>
            <QuickAccess link={'Gérer les utilisateurs'} portail={'admin'} direction={'utilisateurs'} />
            <QuickAccess link={'Gérer les cours' } portail={'admin'} direction={'cours'} />
            <QuickAccess link={'Gérer les catégories' } portail={'admin'} direction={'categorie'} />
            <QuickAccess link={'Accorder un accès' } portail={'admin'} direction={'acces'} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TableauDeBord