import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TableData from "../../components/shared/PageComponents/TableData";
import { categorieColumns } from "../../fakeData";
import { categorieFields } from "../../formModalsData";
import FormModal from "../../components/modals/FormModal";
import SuccessModal from "../../components/modals/SuccessModal";
import ConfirmModal from "../../components/modals/ConfirmModal";
import { toast } from "react-toastify";
import Spinner from "../../components/shared/Spinner";
import FetchError from "../../components/shared/FetchError";
import { Inbox } from "lucide-react";

const Categorie = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [hasErrors, setHasErrors] = useState(false)
  const [searchParams] = useSearchParams();
  const showModal = searchParams.get("create") === "true";
  const showEdit = searchParams.get("edit") === "true";
  const showDelete = searchParams.get("delete") === "true";
  const showSuccess = searchParams.get("success") === "true";

  const getCategories = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/categories.php`, {
          credentials: 'include'
        }
      );
      const data = await response.json();

      if (!response.ok) {
          toast.error(data.error);
          return false;
      }

      setCategories(data);
      return true
    } catch (error) {
      setCategories([]);
      return false
    }
  };

  useEffect(() => {
    const loadFunction = async () => {
      const results = await Promise.all([getCategories()])
   
      setHasErrors(results.includes(false));
      setLoading(false)
    }

    loadFunction()
  }, []);

  const addCategorie = async (newCategory) => {
    if(!newCategory.categorie_nom || newCategory.categorie_nom.length < 2){
      toast.error("Nom invalide")
      return false
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/categories.php`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });
      const data = await response.json()

      if (!response.ok) {
          toast.error(data.error);
          return false;
      }

      setNewCategoryName(newCategory.categorie_nom);
      getCategories();
      return true
    } catch (error) {
      toast.error("Impossible de créer la catégorie");
      return false
    }
  };

  const id = searchParams.get("id");
  const selectedCategory = categories
    ? categories.find((categorie) => categorie.id === id)
    : "";

    
  const editCategoty = async (id, initialData) => {
    if(!initialData.categorie_nom || initialData.categorie_nom.length < 2){
      toast.error("Nom invalide")
      return false
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/categories.php?id=${id}`, {
        method: "PUT",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(initialData),
      });
      const data = await response.json()
      if (!response.ok) {
          toast.error(data.error);
          return false;
      }
      
      toast.success(`${selectedCategory.categorie_nom} modifier`);
      getCategories();
      return true
    } catch (error) {
      toast.error("Impossible de modifier la catégorie");
      return false
    }
  };

  const removeCategoty = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/categories.php?id=${id}`, {
        method: "DELETE",
        credentials: 'include',
      });
      const data = await response.json()

      if (!response.ok) {
          toast.error(data.error)
          return false;
      }

      toast.success(`${selectedCategory.categorie_nom} supprimé`);
      getCategories();
      return true
    } catch (error) {
      toast.error("Impossible de supprimer la catégorie");
      return false
    }
  };

  return (
    <div className="px-5 py-3">
      {showModal && (
        <FormModal
          type={"une catégorie"}
          fields={categorieFields}
          submitFunction={addCategorie}
        />
      )}
      {showSuccess && (
        <SuccessModal
          type={"Catégorie"}
          content={newCategoryName}
          create={true}
        />
      )}
      {showEdit && (
        <FormModal
          type={"une catégorie"}
          initialData={selectedCategory}
          editFunction={(data) => editCategoty(id, data)}
          fields={categorieFields}
        />
      )}
      {showDelete && (
        <ConfirmModal
          type={"categorie"}
          name={selectedCategory.categorie_nom}
          deleteFunction={() => removeCategoty(id)}
        />
      )}
      <div
        className={`px-5 py-3 flex flex-col items-center justify-center ${loading && "mt-25"}`}
      >
        {loading ? (
          <Spinner />
        ) : hasErrors ? (
          <FetchError />
        ) : categories.length === 0 ? (
          <>
            <div className="rounded-full bg-gris-clair w-16 h-16 flex items-center justify-center">
              <Inbox size={28} className="text-bleu-secondaire" />
            </div>
            <p className="mt-4 text-bleu-principal font-semibold">Aucune Catégorie créée</p>
          </>
        ) : (
          <TableData columns={categorieColumns} rows={categories} />
        )}
      </div>
    </div>
  );
};

export default Categorie;
