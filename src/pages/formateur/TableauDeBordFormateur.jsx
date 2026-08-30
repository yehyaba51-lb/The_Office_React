import React, { useEffect, useState } from 'react'
import StateBox from '../../components/shared/PageComponents/StateBox'
import RecentActivities from '../../components/shared/PageComponents/RecentActivities'
import QuickAccess from '../../components/shared/PageComponents/QuickAccess'
import { GraduationCap, ChartSpline, Book , NotebookPen} from 'lucide-react'
import { fakeActivitesFormateur, fakeEtudiantsInscrits, fakeUsers, fakeCours, fakeSoumissions } from '../../fakeData'
import Spinner from '../../components/shared/Spinner'
import FetchError from '../../components/shared/FetchError'

const TableauDeBordFormateur = () => {
    const [showAll, setshowAll] = useState(false)
    const [users, setUsers] = useState([])
    const [soumissions, setSoumissions] = useState([])
    const [cours, setCours] = useState([])
    const [inscriptions, setInscriptions] = useState([])
    const [hasError, setHasError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState(true)

    const getUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/users')
        const data = await response.json()

        setUsers(data)
        return true
      } catch (error) {
        setUsers('')
        return false
      }
    }

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

    const getSoumissions = async () => {
      try {
        const response = await fetch('http://localhost:8000/soumissions')
        const data = await response.json()

        setSoumissions(data)
        return true
      } catch (error) {
        setSoumissions('')
        return false
      }
    }

    useEffect(() => {
      const loadEverything = async () => {
        const results = await Promise.all([getCours(), getInscriptions(), getSoumissions(), getUsers()])
        setHasError(results.includes(false))

        setLoading(false)
      }

      loadEverything()
      setCurrentUser(JSON.parse(localStorage.getItem('user')))
    }, [])
  
    console.log('currentUser', currentUser);
    console.log('inscriptions', inscriptions);
    
    
    
    const formateurCours = cours ? cours.filter(c => c.formateur.toLowerCase() === currentUser.prenom.toLowerCase() + ' ' + currentUser.nom.toLowerCase()) : ''
    const etudiantInscriptions = inscriptions ? inscriptions.filter(i => formateurCours.some(c => c.titre.toLowerCase() === i.cours.toLowerCase())) : ''

    
    const filteredActivitesFormateur = showAll ? fakeActivitesFormateur : fakeActivitesFormateur.slice(0, 5)

    const numberOfCours = formateurCours.length

    const enrolledStudents = etudiantInscriptions.length

    const formateurSoumissions = soumissions ? soumissions.filter(s => formateurCours.some(c => c.titre.toLowerCase() === s.cours.toLowerCase())) : ''

    const numberOfsoumission = formateurSoumissions.length

    const percentage = etudiantInscriptions ? etudiantInscriptions.map(i => {
      const [current, total] = i.progression.split('/').map(Number)
      return (current * 100) / total
    }) : ''

    const completionMoyenne = percentage.length > 0 ? Math.round(percentage.reduce((sum, p) => sum + p, 0)/ percentage.length) : ''
    
    const now = new Date();

    const studetsnThisMonth = etudiantInscriptions ? etudiantInscriptions.filter(s => {
      const d = new Date(s.inscritLe)
      return (
        d.getMonth() === now.getMonth() && 
        d.getFullYear() === now.getFullYear()
      )
    }).length : ''

    const coursThisMonth = formateurCours ? formateurCours.filter(c => {
      const d = new Date(c.creeLe)

      return (
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      )
    }).length : ''

    const soumissionsThisMonth = formateurSoumissions ? formateurSoumissions.filter(s => {
      const d = new Date(s.soumisLe)

      return(
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      )
    }).length : ''


  return (
    <div className={`flex flex-col justify-center items-center ${loading && "mt-25"}`}>
      {loading ? (
        <Spinner />
      ) : hasError ? (
        <FetchError />
      ) : (
        <div className='w-full'>
          <div className="flex justify-between p-2 mx-5">
            <StateBox icon={GraduationCap} titre={ enrolledStudents } label={'Étudiants'} footer={`+${studetsnThisMonth} ce mois-ci`} />
            <StateBox icon={Book} titre={ numberOfCours } label={'Cours'} footer={`+${coursThisMonth} ce mois-ci`} />
            <StateBox icon={ChartSpline} titre={ `${completionMoyenne}%` } label={'Complétion moyen'} />
            <StateBox icon={NotebookPen} titre={ numberOfsoumission } label={'Soumissions à corriger'} footer={`+${soumissionsThisMonth} ce mois-ci`} />
          </div>
          <div className='flex gap-1 mx-6'>
            <div className='w-4/5'>
              <div className='border-2 border-gris-clair rounded-2xl p-2 mx-5 my-1 flex flex-col'>
                <h2 className='font-titres font-semibold text-bleu-principal text-xl px-3 mb-1'>Activité récente</h2>
                {filteredActivitesFormateur.map((activity, i) => (
                  <RecentActivities key={i} badge={ activity.bagde } text={ activity.text } date={ activity.date } to={ activity.to }  />
                ))}
                <button className='font-semibold text-orange-cuivre text-lg cursor-pointer hover:text-orange-cuivre/75 hover:underline transition duration-300 ease-in-out' onClick={() => setshowAll(activity => !activity)}>{showAll ? 'Voir moins' : 'Voir plus'}</button>
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
      )}
    </div>
  )
}

export default TableauDeBordFormateur