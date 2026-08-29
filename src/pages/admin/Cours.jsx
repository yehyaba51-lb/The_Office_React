import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TableData from "../../components/shared/PageComponents/TableData";
import { coursColumns } from "../../fakeData";
import { coursFields } from "../../formModalsData";
import FormModal from "../../components/modals/FormModal";
import SuccessModal from "../../components/modals/SuccessModal";
import ConfirmModal from "../../components/modals/ConfirmModal";
import SearchBar from "../../components/shared/SearchBar";
import { toast } from "react-toastify";
import Spinner from "../../components/shared/Spinner";
import FetchError from "../../components/shared/FetchError";


const Cours = () => {
  const [filter, setFilter] = useState("tous");
  const [cours, setCours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newFormateur, setNewFormateur] = useState('')
  const [searchParams] = useSearchParams();
  const showModal = searchParams.get("create") === "true";
  const showEdit = searchParams.get("edit") === "true";
  const showDelete = searchParams.get("delete") === "true";
  const showSuccess = searchParams.get("success") === "true";
  const [search, setSearch] = useState('')

  const getCours = async () => {
    try {
      const response = await fetch("http://localhost:8000/cours");
      const data = await response.json();

      setCours(data);
      setLoading(false);
    } catch (error) {
      setCours("");
      setLoading(false);
    }
  };
  useEffect(() => {
    getCours();
  }, []);

  const filteredCours = cours
    ? cours.filter((c) => {
        if (filter === "tous") return true;
        return c.categorie.toLowerCase() === filter;
      })
    : "";

  const addCours = async (insertedCours) => {
    try {
      await fetch("http://localhost:8000/cours", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...insertedCours,
          description: '',
          lecons: 0,
          imageUrl: null,
          creeLe: new Date().toISOString().split('T')[0]
        }),
      })


      setNewFormateur(insertedCours.formateur)
      getCours()
    } catch (error) {
      toast.error("Impossible de créer le cours");
    }
  };

  const id = searchParams.get("id");
  const selectedCours = filteredCours
    ? filteredCours.find((cours) => cours.id === id)
    : "";


  const editCours = async(id, initialData) => {
    try {
      await fetch(`http://localhost:8000/cours/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(initialData)
      })
      toast.success(`${selectedCours.titre} modifier`);
      getCours()
    } catch (error) {
      toast.error("Impossible de modifier le cours");
    }
  }
  const removeCours = async(id) => {
    try {
      await fetch(`http://localhost:8000/cours/${id}`, {
        method: 'DELETE'
      })

      toast.success(`${selectedCours.titre} supprimée`);
      getCours()
    } catch (error) {
      toast.error("Impossible de supprimer le cours");
    }
  }

  const searchCours = filteredCours.filter(c => `${c.titre}`.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      {showModal && (
        <FormModal
          type={"un cours"}
          fields={coursFields}
          submitFunction={addCours}
        />
      )}
      {showSuccess && (
        <SuccessModal type={"Cours"} content={ newFormateur } create={true} />
      )}
      {showDelete && (
        <ConfirmModal
          type={"Cours"}
          name={selectedCours.titre}
          deleteFunction={() => removeCours(id)}
        />
      )}
      {showEdit && (
        <FormModal
          type={"un cours"}
          fields={coursFields}
          initialData={selectedCours}
          editFunction={(data) => editCours(id, data)}
        />
      )}
      <div className="flex px-5 mt-5 gap-4 items-center">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="w-75 p-2 border-2 border-gris-clair outline-none focus:border-orange-cuivre/55 focus:ring-2 focus:ring-orange-cuivre/30 rounded-xl flex text-bleu-secondaire text-md justify-center gap-5"
        >
          <option value="tous">Toutes les catégories</option>
          <option value="informatique">Informatique</option>
          <option value="soft skills">Soft skills</option>
          <option value="architecture">Architecture</option>
          <option value="management">Management</option>
        </select>
      </div>
      <div
        className={`px-5 py-3 flex flex-col items-center justify-center ${loading && "mt-25"}`}
      >
        {loading ? (
          <Spinner />
        ) : cours === "" ? (
          <FetchError />
        ) : (
          <TableData
            columns={coursColumns}
            rows={searchCours}
            onClickRow={true}
            admin={true}
          />
        )}
      </div>
    </div>
  );
};

export default Cours;
