import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { FileX } from "lucide-react";
import { toast } from "react-toastify";
import Spinner from "../../components/shared/Spinner";
import FetchError from "../../components/shared/FetchError";
import { translations } from "../../translations";

const NotesDetailsPage = () => {
  const capitalize = (str) => str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  const [note, setNote] = useState([])
  const [loading, setLoading] = useState(true)
  const [hasErrors, setHasErrors] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [accessDenied, setAccessDenied] = useState(false)
  const { id } = useParams();
  const { currentUser, lang } = useOutletContext();
  const navigate = useNavigate()

  const getNote = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/soumissions.php?id=${id}&singleSoumission=true`, {
        credentials: 'include'
      })
      const data = await response.json()

      if(response.status === 404){
        setNotFound(true)
        return true
      }

      if(response.status === 403){
        setAccessDenied(true)
        return 
      } else if(!response.ok){
        toast.error(data.error)
        return false
      }

      setNote(data)
      return true
    } catch (error) {
      setNote([])
      return false
    }
  }

  useEffect(() =>{
    const loadEverything = async () => {
      const result = await Promise.all([
        getNote()
      ])

      setHasErrors(result.includes(false))

      setLoading(false)
    }

    loadEverything()
  }, [])

  return (
    <div className={`flex flex-col px-5 gap-4 items-center ${loading ? "mt-25" : "my-8"}`}>
      {loading ? <Spinner /> : accessDenied ? <FetchError accessDenied={true} /> : hasErrors ? <FetchError /> : notFound ? (
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
      ) : (
        !note ? (
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
        ): (
        <div className="px-8 py-5 mx-auto w-full sm:w-5/8 border-2 border-gris-clair rounded-2xl flex flex-col h-fit gap-3">
          <div className="flex flex-col-reverse sm:flex-row justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2 justify-start">
                <h3 className="text-bleu-principal font-titres font-bold text-xl">
                  {translations[lang]['colCours']}
                </h3>
                <p className="text-sm text-bleu-secondaire">
                  {capitalize(note.cours)}
                </p>
              </div>
              <div className="flex flex-col gap-2 justify-start">
                <h3 className="text-bleu-principal font-titres font-bold text-xl">
                  {translations[lang]['colExercice']}
                </h3>
                <p className="text-sm text-bleu-secondaire">
                  {capitalize(note.exercice)}
                </p>
              </div>
              <div className="flex flex-col gap-2 justify-start">
                <h3 className="text-bleu-principal font-titres font-bold text-xl">
                  {translations[lang]['colQuestion']}
                </h3>
                <p className="text-sm text-bleu-secondaire">
                  {capitalize(note.question)}
                </p>
              </div>
              <div className="flex flex-col gap-2 justify-start">
                <h3 className="text-bleu-principal font-titres font-bold text-xl">
                  {translations[lang]['colSoumisLe']}
                </h3>
                <p className="text-sm text-bleu-secondaire">
                  {note.soumis_le}
                </p>
              </div>
            </div>
            <div className="mx-auto sm:mx-0 mb-4 border-2 gap-3 text-bleu-principal border-gris-clair rounded-2xl flex flex-col h-40 w-40 p-5 items-center justify-center">
              <h3 className="font-titres text-xl font-semibold">{translations[lang]['note']}</h3>
              <h1
                className={`font-titres ${note.note ? 'text-4xl' : 'text-xl text-center'} font-semibold ${note.note === null ? 'text-orange-cuivre' : note.note >= 10 ? "text-vert-reussite" : "text-rouge-echec"}`}
              >
                {note.note ? `${note.note}/20` : translations[lang]['enCorrection']}
              </h1>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2 justify-start">
              <h3 className="text-bleu-principal font-titres font-bold text-xl">
                {translations[lang]['corrigeLe']}
              </h3>
              <p className={`text-sm ${note.corrige_le ? 'text-bleu-secondaire' : 'text-gris-fonce/50'}`}>
                {note.corrige_le ? note.corrige_le : translations[lang]['pasEncoreCorrige']}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-start">
              <h3 className="text-bleu-principal font-titres font-bold text-xl">
                {translations[lang]['commentaire']}
              </h3>
              <p className={`text-sm ${note.commentaire ? 'text-bleu-secondaire' : 'text-gris-fonce/50'}`}>
                {note.commentaire ? capitalize(note.commentaire) : translations[lang]['pasDeCommentaire']}
              </p>
            </div>
          </div>
        </div>
        )
      )}
    </div>
  );
};

export default NotesDetailsPage;
