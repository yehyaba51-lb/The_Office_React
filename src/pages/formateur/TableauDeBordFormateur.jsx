import { useEffect, useState } from 'react'
import StateBox from '../../components/shared/PageComponents/StateBox'
import RecentActivities from '../../components/shared/PageComponents/RecentActivities'
import QuickAccess from '../../components/shared/PageComponents/QuickAccess'
import { GraduationCap, ChartSpline, Book , NotebookPen} from 'lucide-react'
import Spinner from '../../components/shared/Spinner'
import FetchError from '../../components/shared/FetchError'
import { useOutletContext } from 'react-router-dom'
import { toast } from 'react-toastify'

const TableauDeBordFormateur = () => {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
    const [showAll, setshowAll] = useState(false)
    const [soumissions, setSoumissions] = useState([])
    const [statistics, setStatistics] = useState([])
    const [inscriptions, setInscriptions] = useState([])
    const [hasError, setHasError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [activities, setActivities] = useState([])
    const currentUser = useOutletContext()
    
    
    const getStatistics = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/cours.php?id=${currentUser.utilisateur_id}&formateur=true`, {
          credentials: 'include',
        })
        const data = await response.json()
        
        if(!response.ok){
          toast.error(data.error)
          return false
        }

        setStatistics(data)
        return true
      } catch (error) {
        setStatistics([])
        toast.error('fetching failed')
        return false
      }
    }

    
    

    const getInscriptions = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/inscriptions.php?id=${currentUser.utilisateur_id}&formateur=true`, {
          credentials: 'include',
        })
        const data = await response.json()

        if(!response.ok){
          toast.error(data.error)
          return false
        }

        setInscriptions(data)
        return true
      } catch (error) {
        setInscriptions([])
        return false
      }
    }

    const getSoumissions = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/soumissions.php?id=${currentUser.utilisateur_id}&formateur=true`, {
          credentials: 'include',
        })
        const data = await response.json()

        if(!response.ok){
          toast.error(data.error)
          return false
        }
        
        setSoumissions(data)
        return true
      } catch (error) {
        setSoumissions([])
        return false
      }
    }

    useEffect(() => {
      const loadEverything = async () => {
        const results = await Promise.all([getInscriptions(), getSoumissions(), getStatistics()])
        setHasError(results.includes(false))

        setLoading(false)
      }

      loadEverything()
    }, [currentUser])

    useEffect(() => {
      const inscriptionActivities = inscriptions ? inscriptions.map(i => ({
        badge: `admin`,
        text: `Nouvel étudiant inscrit : ${capitalize(i.etudiant)} — « ${capitalize(i.cours_titre)} »`,
        date: i.inscrit_le,
        to: `/formateur/etudiants`
      })) : ''
      
      const soumissionsActivities = soumissions ? soumissions.map(s => ({
        badge: 'admin',
        text: `Nouvelle soumission de ${capitalize(s.etudiant)} — « ${capitalize(s.exercice_titre)} »`,
        date: s.soumis_le,
        to: '/formateur/corrections'
      })) : ''


      setActivities(
        [...soumissionsActivities, ...inscriptionActivities].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        ).slice(0, 10)
      )
    }, [soumissions, inscriptions])
    

    const filteredActivitesFormateur = showAll ? activities : activities.slice(0, 5)


    const completionMoyenne = statistics?.completion?.total > 0
      ? Math.round((statistics.completion.termines * 100) / statistics.completion.total)
      : 0
  return (
    <div className={`flex flex-col justify-center items-center ${loading && "mt-25"}`}>
      {loading ? (
        <Spinner />
      ) : hasError ? (
        <FetchError />
      ) : (
        <div className='w-full'>
          <div className="flex justify-between p-2 mx-5">
            <StateBox icon={GraduationCap} titre={ statistics.etudiants.total } label={'Étudiants'} footer={statistics.etudiants.ce_mois ? `+${statistics.etudiants.ce_mois} ce mois-ci` : '0 ce mois-ci'} />
            <StateBox icon={Book} titre={ statistics.cours.total } label={'Cours'} footer={statistics.cours.ce_mois ? `+${statistics.cours.ce_mois} ce mois-ci` : '0 ce mois-ci'} />
            <StateBox icon={ChartSpline} titre={ completionMoyenne !== '' ? `${completionMoyenne}%` : '0%' } label={'Complétion moyen'} />
            <StateBox icon={NotebookPen} titre={ statistics.soumissions.total } label={'Soumissions à corriger'} footer={statistics.soumissions.ce_mois ? `+${statistics.soumissions.ce_mois} ce mois-ci`: '0 ce mois-ci'} />
          </div>
          <div className='flex gap-1 mx-6'>
            <div className='w-4/5'>
              <div className='border-2 border-gris-clair rounded-2xl p-2 mx-5 my-1 flex flex-col'>
                <h2 className='font-titres font-semibold text-bleu-principal text-xl px-3 mb-1'>Activité récente</h2>
                {filteredActivitesFormateur.length > 0 ? (
                  <>
                    {filteredActivitesFormateur.map((activity, i) => (
                      <RecentActivities key={i} badge={ activity.badge } text={ activity.text } date={ activity.date } to={ activity.to }  />
                    ))}
                  <button className='font-semibold text-orange-cuivre text-lg cursor-pointer hover:text-orange-cuivre/75 hover:underline transition duration-300 ease-in-out' onClick={() => setshowAll(activity => !activity)}>{showAll ? 'Voir moins' : 'Voir plus'}</button>

                  </>
                ) : (
                  <p className="text-center text-bleu-secondaire">Aucune activités récentes</p>
                )}
                </div>
            </div>
            <div className='w-1/3'>
              <div className='border-2 border-gris-clair rounded-xl p-3 mx-5 my-1 flex flex-col gap-2'>
                <h2 className='font-titres font-semibold text-bleu-principal text-xl'>Accès rapide</h2>
                <QuickAccess link={'Gérer mes cours'} portail={'formateur'} direction={'cours'} />
                <QuickAccess link={'Corriger les exercices' } portail={'formateur'} direction={'corrections'} />
                <QuickAccess link={'Voir mes étudiants' } portail={'formateur'} direction={'etudiants'} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TableauDeBordFormateur