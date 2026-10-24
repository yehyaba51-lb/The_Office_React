import { useEffect, useState } from "react";
import SearchBar from "../../components/shared/SearchBar";
import TableData from "../../components/shared/PageComponents/TableData";
import { correctionsColumns } from "../../fakeData";
import { useOutletContext, useSearchParams } from "react-router-dom";
import CorrectionModal from "../../components/modals/CorrectionModal";
import { toast } from "react-toastify";
import Spinner from "../../components/shared/Spinner";
import FetchError from "../../components/shared/FetchError";
import { Inbox } from "lucide-react";
import { translations } from "../../translations";

const Corrections = () => {
  const [searchParams] = useSearchParams();
  const [soumissions, setSoumissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const { currentUser, lang } = useOutletContext();
  const showCorrecting = searchParams.get("correct") === "true";
  const id = searchParams.get("id");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const getSoumissions = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/soumissions.php?id=${currentUser.utilisateur_id}`,
        {
          credentials: "include",
        },
      );
      const data = await response.json();

      if (response.status === 403) {
        setAccessDenied(true);
        return;
      } else if (!response.ok) {
        toast.error(data.error);
        return false;
      }

      setSoumissions(data);
      return true;
    } catch (error) {
      setSoumissions([]);
      return false;
    }
  };

  useEffect(() => {
    const loadEverything = async () => {
      const results = await Promise.all([getSoumissions()]);
      setHasError(results.includes(false));

      setLoading(false);
    };

    loadEverything();
  }, [currentUser]);

  const selectedSoumission = soumissions
    ? soumissions.filter((s) => s.id === Number(id))
    : [];

  const activeClass = (isActive) =>
    `${isActive ? "bg-orange-cuivre text-sm rounded px-3 py-1 flex justify-center items-center text-white font-semibold" : "flex justify-center items-center text-sm text-bleu-secondaire font-medium cursor-pointer hover:underline hover:text-orange-cuivre"}`;

  const filteredSoumissions = soumissions
    ? soumissions.filter((s) => {
        if (filter === "all") return true;
        return (s.corrige_le === null ? "pending" : "corrige") === filter;
      })
    : "";

  const soumisFunction = async (id, updatedSoumission) => {
    const numberRegex = /^(\d+(\.\d+)?|\.\d+)$/;
    if (
      updatedSoumission.note === null ||
      updatedSoumission.note === undefined ||
      updatedSoumission.note === ""
    ) {
      toast.error("Note pas soumis");
      return false;
    }

    if (!numberRegex.test(updatedSoumission.note)) {
      toast.error("Note doit etre que des chiffres et etre que entre 0 et 20");
      return false;
    }

    if (updatedSoumission.note < 0 || updatedSoumission.note > 20) {
      toast.error("Note doit etre que entre 0 et 20");
      return false;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/soumissions.php?id=${id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedSoumission),
        },
      );
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error);
        return false;
      }

      toast.success("Soumission corrigé");

      await getSoumissions();
      return true;
    } catch (error) {
      toast.error("Soumission ne peut pas etre modifier");
      return false;
    }
  };

  const allFilteredSearch = filteredSoumissions
    ? filteredSoumissions.filter(
        (s) =>
          `${s.etudiant}`.toLowerCase().includes(search.toLowerCase()) ||
          `${s.texte_question}`.toLowerCase().includes(search.toLowerCase()) ||
          `${s.cours_titre}`.toLowerCase().includes(search.toLowerCase()),
      )
    : [];

  return (
    <>
      {showCorrecting && (
        <CorrectionModal
          initialData={selectedSoumission}
          submitFunction={(data) => soumisFunction(id, data)}
          language={lang}
        />
      )}
      <div className={`px-0 md:px-5 mx-5 py-3 flex flex-col sm:flex-row gap-4`}>
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          lang={lang}
        />
        <div className="w-fit mx-auto sm:mx-0 py-1 px-2 border-2 border-gris-clair rounded-xl flex text-md justify-center gap-5">
          <button
            className={activeClass(filter === "all")}
            onClick={() => setFilter("all")}
          >
            {translations[lang]['toutesLesCorrections']}
          </button>
          <button
            className={activeClass(filter === "pending")}
            onClick={() => setFilter("pending")}
          >
            {translations[lang]['aCorriger']}
          </button>
          <button
            className={activeClass(filter === "corrige")}
            onClick={() => setFilter("corrige")}
          >
            {translations[lang]['corrigees']}
          </button>
        </div>
      </div>
      <div
        className={`px-0 md:px-5 mx-4 py-3 flex flex-col items-center justify-center ${loading && "mt-25"}`}
      >
        {loading ? (
          <Spinner />
        ) : accessDenied ? (
          <FetchError accessDenied={true} language={lang} />
        ) : hasError ? (
          <FetchError language={lang} />
        ) : soumissions.length === 0 ? (
          <>
            <div className="rounded-full bg-gris-clair w-16 h-16 flex items-center justify-center mt-10">
              <Inbox size={28} className="text-bleu-secondaire" />
            </div>
            <p className="mt-2 text-bleu-principal font-semibold">
              {translations[lang]['aucuneSoumissionSoumise']}
            </p>
          </>
        ) : (
          <TableData
            columns={correctionsColumns}
            rows={allFilteredSearch}
            onClickRow={true}
            type={"formateur"}
            edit={false}
            deleting={false}
          />
        )}
      </div>
    
    </>
  );
};

export default Corrections;
