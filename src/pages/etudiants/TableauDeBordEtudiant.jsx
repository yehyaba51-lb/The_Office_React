import React from 'react'
import StateBox from '../../components/shared/PageComponents/StateBox'
import RecentActivities from '../../components/shared/PageComponents/RecentActivities'
import QuickAccess from '../../components/shared/PageComponents/QuickAccess'
import { Check, Book } from 'lucide-react'

const TableauDeBordEtudiant = () => {
  return (
    <div className='flex flex-col justify-start'>
      <div className="flex justify-between p-2 mx-5">
        <StateBox icon={Book} titre={2} label={'Cours en cours'} />
        <StateBox icon={Check} titre={0} label={'Cours terminés'} />
      </div>
      <div className='flex gap-1 mx-6'>
        <div className='w-4/5'>
          <div className='border-2 border-gris-clair rounded-xl p-2 mx-5 my-1'>
            <h2 className='font-titres font-semibold text-bleu-principal text-xl px-3 mb-2'>Activité récente</h2>
            <RecentActivities role={'student'} badge={'corrige'} text={'Soumission corrigée — "Fondations du développement web"'} note={16} date={'2026-08-02'} to={ '/etudiant/notes' } />
            <RecentActivities role={'student'} badge={'admin'} text={`Réponse soumise — "Qu'est-ce qu'un composant contrôlé ?"`} date={'2026-07-28'} to={ '/etudiant/exercices' } />
            <RecentActivities role={'student'} badge={'cours'} text={'Cours terminé — "Bases de données"'} date={'2026-07-27'} to={ '/etudiant/cours' } />
            <RecentActivities role={'student'} badge={'cours'} text={'Inscrit à "Introduction à React" — "Bases de données"'} date={'2026-07-27'} to={ '/etudiant/cours' } />
            <RecentActivities role={'student'} badge={'corrige'} text={'Soumission corrigée — "Expliquez useEffect en une phrase"'} note={8} date={'2026-07-25'} to={ '/etudiant/notes' } />
            <RecentActivities role={'student'} badge={'admin'} text={`Réponse soumise — "Qu'est-ce qu'un composant contrôlé ?"`} date={'2026-07-24'} to={ '/etudiant/exercices' } />
          </div>
        </div>
        <div className='w-1/3'>
          <div className='border-2 border-gris-clair rounded-xl p-3 mx-5 my-1 flex flex-col gap-2'>
            <h2 className='font-titres font-semibold text-bleu-principal text-xl'>Accès rapide</h2>
            <QuickAccess link={'Accéder  à mes cours'} portail={'etudiant'} direction={'cours'} />
            <QuickAccess link={'Voir mes exercices' } portail={'etudiant'} direction={'exercices'} />
            <QuickAccess link={'Mes notes' } portail={'etudiant'} direction={'notes'} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TableauDeBordEtudiant