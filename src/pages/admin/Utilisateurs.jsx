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
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users`);
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

  

  const addUser = async (submittedUser) => {
    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submittedUser),
      });

      setNewUserName(`${submittedUser.prenom} ${submittedUser.nom}`);
      getUsers();
    } catch (error) {
      toast.error("Impossible de créer le compte");
    }
  };

  const editUser = async (id, submittedUser) => {
    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submittedUser)  
      })
      
      toast.success(`${selectedUser.prenom + " " + selectedUser.nom} modifier`);
      getUsers()
    } catch (error) {
      toast.error("Impossible de modifier le compte");
    }
  }

  const removeUser = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}/users/${id}`, {
        method: 'DELETE'
      })

      toast.success(`${selectedUser.prenom + " " + selectedUser.nom} supprimer`);
      getUsers()
    } catch (error) {
      toast.error("Impossible de supprimer le compte");
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
        <SuccessModal type={"Compte"} content={ newUserName } create={true} />
      )}
      {showEdit && (
        <FormModal
          type={"un compte"}
          fields={userFields}
          initialData={selectedUser}
          editFunction={(data) => editUser(selectedUser.id, data)}
        />
      )}
      {showReset && (
        <SuccessModal
          type={"Compte"}
          content={selectedUser.prenom + " " + selectedUser.nom}
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
            className={activeClass(filter === "étudiant")}
            onClick={() => setFilter("étudiant")}
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
