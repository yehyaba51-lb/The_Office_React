import { useEffect, useState } from 'react'
import TableData from '../../components/shared/PageComponents/TableData'
import { mesNotesColumns } from '../../fakeData'
import { toast } from 'react-toastify'
import Spinner from '../../components/shared/Spinner'
import FetchError from '../../components/shared/FetchError'
import { useOutletContext } from 'react-router-dom'

const MesNotes = () => {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [hasErrors, setHasErrors] = useState(false)
  const [accessDenied, setAccessDenied] = useState(false)
  const currentUser = useOutletContext()

  const getNotes = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/soumissions.php?id=${currentUser.utilisateur_id}&notes=true`, {
        credentials: 'include'
      })
      const data = await response.json()

      if(response.status === 403){
        setAccessDenied(true)
        return 
      } else if(!response.ok){
        toast.error(data.error)
        return false
      }

      setNotes(data)
      return true
    } catch (error) {
      setNotes([])
      return false
    }
  }

  useEffect(() => {
    const loadEverything = async () => {
      const results = await Promise.all([
        getNotes(),
      ]);
      setHasErrors(results.includes(false));

      setLoading(false);
    };

    loadEverything();
  }, [])

  return (
    <div className={`flex flex-col px-5 gap-4 items-center ${loading ? "mt-25" : "my-8"}`}>
      {loading ? <Spinner /> : accessDenied ? <FetchError accessDenied={true} /> : hasErrors ? <FetchError /> : (
        <TableData columns={ mesNotesColumns } rows={ notes } onClickRow={ true } admin={ false } />
      )}
    </div>
  )
}

export default MesNotes