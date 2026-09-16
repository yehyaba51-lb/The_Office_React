import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TableData from "../../components/shared/PageComponents/TableData";
import { userColumns } from "../../fakeData";
import FormModal from "../../components/modals/FormModal";
import SuccessModal from "../../components/modals/SuccessModal";
import ConfirmModal from "../../components/modals/ConfirmModal";
import SearchBar from "../../components/shared/SearchBar";
import { userFields } from "../../formModalsData";
import { toast } from "react-toastify";
import Spinner from "../../components/shared/Spinner";
import FetchError from "../../components/shared/FetchError";


const Utilisateurs = () => {
  const [filter, setFilter] = useState("all");
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState("");
  const [newDeletedUserName, setNewDeletedUserName] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('')
  const activeClass = (isActive) =>
    `${isActive ? "bg-orange-cuivre text-sm rounded px-3 py-1 flex justify-center items-center text-white font-semibold" : "flex justify-center items-center text-sm text-bleu-secondaire font-m cursor-pointer hover:underline hover:text-orange-cuivre"}`;
  const [searchParams] = useSearchParams();
  const showModal = searchParams.get("create") === "true";
  const showSuccess = searchParams.get("success") === "true";
  const showEdit = searchParams.get("edit") === "true";
  const showReset = searchParams.get("reset") === "true";
  const showDelete = searchParams.get("delete") === "true";

  const getUsers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/utilisateurs.php`);
      const data = await response.json();

      setUsers(data);
      setLoading(false);
    } catch (error) {
      setUsers("");
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = users
    ? users.filter((user) => {
        if (filter === "all") return true;
        return user.role.toLowerCase() === filter;
      })
    : "";

    
    
  const id = searchParams.get("id");
  const selectedUser = filteredUsers
    ? filteredUsers.find((user) => user.id === id)
    : "";

  console.log('selectedUser', selectedUser);

  const addUser = async (submittedUser) => {
    let errors = []
    const nameRegex = /^[a-zA-Z' -]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!submittedUser.prenom || submittedUser.prenom.length < 2 || !nameRegex.test(submittedUser.prenom)){
      errors.push("Prenom invalide")
    }

    if(!submittedUser.nom || submittedUser.nom.length < 2 || !nameRegex.test(submittedUser.nom)){
      errors.push("Nom invalide")
    }

    if(!submittedUser.email || !emailRegex.test(submittedUser.email)){
      errors.push("Email invalide")
    }

    if(!submittedUser.role || submittedUser.role === ""){
      errors.push("Role invalide")
    }

    if(errors.length > 0){
      errors.forEach(error => toast.error(error))
      return false;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/utilisateurs.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submittedUser),
      });
      const data = await response.json()

      if(!response.ok){
        toast.error(data.error)
        return false
      }

      setGeneratedPassword(data.mot_de_passe)

      setNewUserName(`${submittedUser.prenom} ${submittedUser.nom}`);
      getUsers();
      return true
    } catch (error) {
      toast.error("Impossible de créer le compte");
      return false
    }
  };

  const editUser = async (id, submittedUser) => {
    let errors = []
    const nameRegex = /^[a-zA-Z' -]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if(!submittedUser.prenom || submittedUser.prenom.length < 2 || !nameRegex.test(submittedUser.prenom)){
      errors.push("Prenom invalide")
    }

    if(!submittedUser.nom || submittedUser.nom.length < 2 || !nameRegex.test(submittedUser.nom)){
      errors.push("Nom invalide")
    }

    if(!submittedUser.email || !emailRegex.test(submittedUser.email)){
      errors.push("Email invalide")
    }

    if(!submittedUser.role || submittedUser.role === ""){
      errors.push("Role invalide")
    }

    if(errors.length > 0){
      errors.forEach(error => toast.error(error))
      return false;
    }

    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}/utilisateurs.php?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submittedUser)  
      })
      
      toast.success(`${selectedUser.prenom + " " + selectedUser.nom} modifier`);
      getUsers()
      return true
    } catch (error) {
      toast.error("Impossible de modifier le compte");
      return false
    }
  }

  const removeUser = async (id) => {
    setNewDeletedUserName(`${selectedUser.prenom + " " + selectedUser.nom}`)
    console.log('newDeletedUserName', newDeletedUserName);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/utilisateurs.php?id=${id}`, {
        method: 'DELETE'
      })
      const data = await response.json()

      if(!response.ok){
        toast.error(data.error)
        return false

      }
      toast.success(`${newDeletedUserName} à été supprimer`);
      getUsers()
      return true
    } catch (error) {
      toast.error("Impossible de supprimer le compte");
      return false
    }
  }

  const resetPassword = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/utilisateurs.php?id=${id}&action=reset`, {
        method: 'PUT'
      })
      const data = await response.json()

      if(!response.ok){
        toast.error(data.error)
        return false
      }

      setGeneratedPassword(data.mot_de_passe)

      getUsers()
      return true
    } catch (error) {
      toast.error("Impossible de modifier le mot de passe");
      return false;
    }
  }
  
  const searchUsers = filteredUsers ? filteredUsers.filter(u => `${u.nom} ${u.prenom}`.toLowerCase().includes(search.toLowerCase())) : ''
  return (
    <div>
      {showModal && (
        <FormModal
          type={"un compte"}
          fields={userFields}
          submitFunction={addUser}
        />
      )}
      {showSuccess && (
        <SuccessModal type={"Compte"} content={ newUserName } create={true} password={generatedPassword} />
      )}
      {showEdit && (
        <FormModal
          type={"un compte"}
          fields={userFields}
          initialData={selectedUser}
          editFunction={(data) => editUser(selectedUser.id, data)}
          resetPassword={() => resetPassword(selectedUser.id)}
        />
      )}
      {showReset && (
        <SuccessModal
          type={"Compte"}
          content={selectedUser.prenom + " " + selectedUser.nom}
          password={generatedPassword}
        />
      )}
      {showDelete && (
        <ConfirmModal
          type={"Compte"}
          name={selectedUser.nom + " " + selectedUser.prenom}
          deleteFunction={() => removeUser(selectedUser.id)}
        />
      )}
      <div className="flex px-5 mt-5 gap-4 items-center">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="w-75 p-1 border-2 border-gris-clair rounded-xl flex text-md justify-center gap-5">
          <button
            className={activeClass(filter === "all")}
            onClick={() => setFilter("all")}
          >
            Tous les rôles
          </button>
          <button
            className={activeClass(filter === "formateur")}
            onClick={() => setFilter("formateur")}
          >
            Formateur
          </button>
          <button
            className={activeClass(filter === "etudiant")}
            onClick={() => setFilter("etudiant")}
          >
            Etudiant
          </button>
        </div>
      </div>
      <div
        className={`px-5 py-3 flex flex-col items-center justify-center ${loading && "mt-25"}`}
      >
        {loading ? (
          <Spinner size={125} />
        ) : filteredUsers === "" ? (
          <FetchError />
        ) : (
          <TableData columns={userColumns} rows={searchUsers} admin={true} />
        )}
      </div>
    </div>
  );
};

export default Utilisateurs;
