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

const Categorie = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [hasErrors, setHasErrors] = useState(false);
  const [searchParams] = useSearchParams();
  const showModal = searchParams.get("create") === "true";
  const showEdit = searchParams.get("edit") === "true";
  const showDelete = searchParams.get("delete") === "true";
  const showSuccess = searchParams.get("success") === "true";

  const getCategories = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/categories`,
      );
      const data = await response.json();

      setCategories(data);
      setLoading(false);
    } catch (error) {
      setCategories([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadFunction = async () => {
      const results = await getCategories();
      
    }

    loadFunction()
  }, []);

  const addCategorie = async (newCategory) => {
    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });

      setNewCategoryName(newCategory.nom);
      getCategories();
    } catch (error) {
      toast.error("Impossible de créer la catégorie");
    }
  };

  const id = searchParams.get("id");
  const selectedCategory = categories
    ? categories.find((categorie) => categorie.id === id)
    : "";

  const editCategoty = async (id, initialData) => {
    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(initialData),
      });

      toast.success(`${selectedCategory.nom} modifier`);
      getCategories();
    } catch (error) {
      toast.error("Impossible de modifier la catégorie");
    }
  };

  const removeCategoty = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}/categories/${id}`, {
        method: "DELETE",
      });

      toast.success(`${selectedCategory.nom} supprimé`);
      getCategories();
    } catch (error) {
      toast.error("Impossible de supprimer la catégorie");
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
          name={selectedCategory.nom}
          deleteFunction={() => removeCategoty(id)}
        />
      )}
      <div
        className={`px-5 py-3 flex flex-col items-center justify-center ${loading && "mt-25"}`}
      >
        {loading ? (
          <Spinner />
        ) : categories === "" ? (
          <FetchError />
        ) : (
          <TableData columns={categorieColumns} rows={categories} />
        )}
      </div>
    </div>
  );
};

export default Categorie;
