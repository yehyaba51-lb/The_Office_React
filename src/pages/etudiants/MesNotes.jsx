import { useEffect, useState } from "react";
import TableData from "../../components/shared/PageComponents/TableData";
import { mesNotesColumns } from "../../fakeData";
import { toast } from "react-toastify";
import Spinner from "../../components/shared/Spinner";
import FetchError from "../../components/shared/FetchError";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Inbox, FileX } from "lucide-react";
import { translations } from "../../translations";

const MesNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasErrors, setHasErrors] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const { currentUser, lang } = useOutletContext();
  const navigate = useNavigate();

  const getNotes = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/soumissions.php?id=${currentUser.utilisateur_id}&notes=true`,
        {
          credentials: "include",
        },
      );
      const data = await response.json();

      if (response.status === 404) {
        setNotFound(true);
        return true;
      }

      if (response.status === 403) {
        setAccessDenied(true);
        return;
      } else if (!response.ok) {
        toast.error(data.error);
        return false;
      }

      setNotes(data);
      return true;
    } catch (error) {
      setNotes([]);
      return false;
    }
  };

  useEffect(() => {
    const loadEverything = async () => {
      const results = await Promise.all([getNotes()]);
      setHasErrors(results.includes(false));

      setLoading(false);
    };

    loadEverything();
  }, []);

  return (
    <div
      className={`flex flex-col px-5 gap-4 items-center ${loading ? "mt-25" : "my-8"}`}
    >
      {loading ? (
        <Spinner />
      ) : accessDenied ? (
        <FetchError accessDenied={true} language={lang} />
      ) : hasErrors ? (
        <FetchError language={lang} />
      ) : notFound ? (
        <div className="border-2 border-gris-clair rounded-2xl p-12 flex flex-col items-center gap-3 text-center m-5">
          <div className="w-14 h-14 rounded-full bg-gris-fonce/10 flex items-center justify-center mb-2">
            <FileX className="text-gris-fonce" size={26} />
          </div>
          <h3 className="text-bleu-principal font-titres font-semibold text-lg">
            {translations[lang]['noteIntrouvable']}
          </h3>
          <p className="text-gris-fonce text-sm max-w-sm">
            {translations[lang]['noteIntrouvableTexte']}
          </p>
          <button
            onClick={() => navigate("/etudiant/notes")}
            className="mt-3 bg-bleu-secondaire text-white rounded-xl px-5 py-2 text-sm font-semibold hover:bg-bleu-secondaire/90 transition duration-300 ease-in-out cursor-pointer"
          >
            {translations[lang]['retourAuxNotes']}
          </button>
        </div>
      ) : notes.length === 0 ? (
        <>
          <div className="rounded-full bg-gris-clair w-16 h-16 flex items-center justify-center mt-10">
            <Inbox size={28} className="text-bleu-secondaire" />
          </div>
          <p className="text-bleu-principal font-semibold">
            {translations[lang]['aucuneSoumissionSoumise']}
          </p>
        </>
      ) : (
        <TableData
          columns={mesNotesColumns}
          rows={notes}
          onClickRow={true}
          admin={false}
        />
      )}
    </div>
  );
};

export default MesNotes;
