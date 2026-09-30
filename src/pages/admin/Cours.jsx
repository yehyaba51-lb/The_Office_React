import { useEffect, useState } from "react";
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
import { Inbox } from "lucide-react";


const Cours = () => {
  const capitalize = (str) => str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  const [filter, setFilter] = useState("tous");
  const [cours, setCours] = useState([]);
  const [formateurs, setFormateurs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [hasErrors, setHasErrors] = useState(false);
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
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/cours.php`, {
        credentials: 'include',
      });
      const data = await response.json();

      setCours(data);
      return true
    } catch (error) {
      setCours([]);
      return false
    }
  };

  const getFormateurs = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/utilisateurs.php?formateur=true`, {
        credentials: 'include',
      });
      const data = await response.json();

      setFormateurs(data);
      return true
    } catch (error) {
      setFormateurs([]);
      return false
    }
  };

  const getCategories = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/categories.php`, {
        credentials: 'include',
      });
      const data = await response.json();

      setCategories(data);
      return true
    } catch (error) {
      setCategories([]);
      return false
    }
  };
  useEffect(() => {
    const loadEverything = async () => {
      const results = await Promise.all([
        getCours(),
        getFormateurs(),
        getCategories()]
      )
      setHasErrors(results.includes(false))

      setLoading(false)
    };

    loadEverything()
  }, []);

  
  const filteredCours = cours
    ? cours.filter((c) => {
        if (filter === "tous") return true;
        return c.categorie.toLowerCase() === filter;
      })
    : "";

    const dynamicCoursFields = coursFields.map(field=> {
      if(field.name === 'formateur_id'){
        return {...field, options: formateurs.map(f => ({value: f.id, label: `${capitalize(f.prenom)} ${capitalize(f.nom)}`}))}
      } else if(field.name === 'categorie_id'){
        return {...field, options: categories.map(c => ({value: c.id, label: capitalize(c.categorie_nom)}))}
      }
      return field
    })
    
  const addCours = async (insertedCours) => {
    let errors = []
    const nameRegex = /[a-zA-ZÀ-ÿ0-9' :\-]*$/
    if(!insertedCours.cours_titre || insertedCours.cours_titre.length < 5 || !nameRegex.test(insertedCours.cours_titre)){
      errors.push('Titre invalide')
    }

    if(!insertedCours.formateur_id || insertedCours.formateur_id === ''){
      errors.push('Formateur invalide')
    }

    if(!insertedCours.categorie_id || insertedCours.categorie_id === ''){
      errors.push('Categorie invalide')
    }

    if(errors.length > 0){
      errors.forEach(error => toast.error(error))
      return false;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/cours.php`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(insertedCours)
      })
      const data = await response.json()

      if(!response.ok){
        toast.error(data.error)
        return false
      }

      const formateur = formateurs.find(f => Number(f.id) === Number(insertedCours.formateur_id));
      setNewFormateur(formateur ? `${capitalize(formateur.prenom)} ${capitalize(formateur.nom)}` : '');

      getCours()
      return true
    } catch (error) {
      toast.error("Impossible de créer le cours");
      return false
    }
  };

  const id = searchParams.get("id");
  const selectedCours = filteredCours
    ? filteredCours.find((cours) => Number(cours.id) === Number(id))
    : "";
  

  const editCours = async(id, initialData) => {
    let errors = []
    const nameRegex = /[a-zA-ZÀ-ÿ0-9' :\-]*$/
    if(!initialData.cours_titre || initialData.cours_titre.length < 5 || !nameRegex.test(initialData.cours_titre)){
      errors.push('Titre invalide')
    }

    if(!initialData.formateur_id || initialData.formateur_id === ''){
      errors.push('Formateur invalide')
    }

    if(!initialData.categorie_id || initialData.categorie_id === ''){
      errors.push('Categorie invalide')
    }

    if(errors.length > 0){
      errors.forEach(error => toast.error(error))
      return false;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/cours.php?id=${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(initialData)
      })
      const data = await response.json()

      if(!response.ok){
        toast.error(data.error)
        return false
      }
      toast.success(`${selectedCours.titre} modifier`);
      getCours()
      return true
    } catch (error) {
      toast.error("Impossible de modifier le cours");
      return false
    }
  }
  const removeCours = async(id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/cours.php?id=${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      const data = await response.json()

      if(!response.ok){
        toast.error(data.error)
        return false
      }

      toast.success(`${selectedCours.titre} supprimée`);
      getCours()
      return true
    } catch (error) {
      toast.error("Impossible de supprimer le cours");
      return false
    }
  }

  const searchCours = filteredCours ? filteredCours.filter(c => `${c.titre}`.toLowerCase().includes(search.toLowerCase())) : ''

  return (
    <div>
      {showModal && (
        <FormModal
          type={"un cours"}
          fields={dynamicCoursFields}
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
          fields={dynamicCoursFields}
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
        ) : hasErrors ? (
          <FetchError />
        ) : cours.length === 0 ? (
          <>
            <div className="rounded-full bg-gris-clair w-16 h-16 flex items-center justify-center mt-10">
              <Inbox size={28} className="text-bleu-secondaire" />
            </div>
            <p className="mt-4 text-bleu-principal font-semibold">Aucun Cours créé</p>
          </>
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
