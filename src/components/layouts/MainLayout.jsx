import { useEffect, useState } from "react";
import SideBar from '../shared/SideBar'
import TopBar from '../shared/TopBar'
import PasDeSession from '../shared/PasDeSession'
import { Outlet, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { toast } from "react-toastify";
import Spinner from "../shared/Spinner";

const MainLayout = ({ role }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const verifierSession = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth.php`, {
        credentials: 'include'
      })
      const data = await response.json()

      if(!response.ok){
        setLoading(false)
        return false
      }

      if(role !== data.role){
        if(data.role === 'Administrateur'){
          navigate('/admin')
        } else if(data.role === 'Formateur') {
          navigate('/formateur')
        } else {
          navigate('/etudiant')
        }
        
        return false
      }
      setCurrentUser(data)
      setLoading(false)
      return 
    } catch (error) {
      toast.error('Impossible de charger les données')
      setLoading(false)
      return false
    }
  }

  useEffect(() => {
    verifierSession()
  }, [role])

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <div className='flex w-full h-screen'>
      {loading
        ? 
        <div className="flex flex-col w-full items-center pt-50 gap-3 text-center py-10">
          <Spinner />
          <p className="text-bleu-principal font-semibold">Veuillez patientez</p>
        </div>
        :currentUser === null
        ? <PasDeSession />
        : <>
            <SideBar role={role} currentUser={currentUser} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
            <div className="flex flex-col flex-1 overflow-y-auto h-screen">
              <TopBar currentUser={currentUser} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
              <Outlet context={ currentUser } />
            </div>
            <ToastContainer />
          </>
      }
    </div>
  )
}

export default MainLayout