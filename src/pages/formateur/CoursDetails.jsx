import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import StateBox from "../../components/shared/PageComponents/StateBox";
import LessonBuilderModal from "../../components/modals/LessonBuilderModal";
import SuccessModal from "../../components/modals/SuccessModal";
import TableData from "../../components/shared/PageComponents/TableData";
import { etudiantsInscritsColumns } from "../../fakeData";
import { FileX } from "lucide-react";
import Spinner from "../../components/shared/Spinner";
import FetchError from "../../components/shared/FetchError";

const CoursDetails = () => {
  const [fileName, setFileName] = useState("");
  const [cours, setCours] = useState([]);
  const [lecons, setLecons] = useState([]);
  const [exercices, setExercices] = useState([]);
  const [inscriptions, setInscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasErrors, setHasErrors] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditSpec, setIsEditSpec] = useState(false);
  const [description, setDescription] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const getCours = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/cours/${id}`);
      const data = await response.json();

      setCours(data);
      return true;
    } catch (error) {
      setCours([]);
      return false;
    }
  };

  const getLecons = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/lecons`);
      const data = await response.json();

      setLecons(data);
      return true;
    } catch (error) {
      setLecons([]);
      return false;
    }
  };

  const getExercices = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/exercices`);
      const data = await response.json();

      setExercices(data);
      return true;
    } catch (error) {
      setExercices([]);
      return false;
    }
  };

  const getInscriptions = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/inscriptions`);
      const data = await response.json();

      setInscriptions(data);
      return true;
    } catch (error) {
      setInscriptions([]);
      return false;
    }
  };

  useEffect(() => {
    const loadEverything = async () => {
      const results = await Promise.all([
        getCours(id),
        getExercices(),
        getInscriptions(),
        getLecons(),
      ]);
      setHasErrors(results.includes(false));

      setLoading(false);
    };

    loadEverything();
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const selectedLecons = lecons
    ? lecons.filter((lecon) => lecon.coursId === Number(id))
    : [];

  const exos = (lecon) => {
    const selectedExos = exercices
        ? exercices.filter(
            (exo) => exo.leconId === Number(lecon.id) && exo.coursId === Number(id),
          )
        : []
      return selectedExos
  };

  const [searchParams] = useSearchParams();
  const showModal = searchParams.get("create") === "true";
  const showSuccess = searchParams.get("success") === "true";

  const enrolledStudentsNumber = cours
    ? inscriptions
      ? inscriptions.filter(
          (i) => i.cours.toLowerCase() === cours?.titre?.toLowerCase(),
        ).length
      : ""
    : 0;

  const numberOfExercices = exercices
    ? exercices.filter((e) => e.coursId === Number(id)).length
    : 0;

  useEffect(() => {
    setDescription(cours ? cours.description : "");
  }, [cours]);

  

  const etudiantInscrits = inscriptions ? inscriptions.filter(i => i.coursId === Number(id)) : [] 

  return (
    <div className={`flex flex-col gap-4 justify-center items-center ${loading && "mt-25"}`}>
      {showModal && <LessonBuilderModal lecon={selectedLecons} />}
      {showSuccess && (
        <SuccessModal
          type={"Leçon"}
          content={cours?.titre}
          create={true}
          lecon={true}
        />
      )}
      {loading ? (
        <Spinner />
      ) : hasErrors ? (
        <FetchError />
      ) : (
        <div className="w-full">
          {cours && cours.lecons > 0 ? (
            <>
              <div className="flex justify-between">
                <StateBox
                  titre={"Étudiants inscrits"}
                  label={enrolledStudentsNumber}
                />
                <StateBox titre={"Leçons"} label={cours.lecons} />
                <StateBox titre={"Exercices"} label={numberOfExercices} />
              </div>
              <div className="border-2 border-gris-clair rounded-xl flex justify-between items-center px-4 py-2 mx-5">
                <p className="text-sm text-bleu-secondaire">
                  {fileName || "Aucun fichier sélectionné"}
                </p>
                <input
                  type="file"
                  onChange={(e) => setFileName(e.target.files[0]?.name || "")}
                  className="hidden"
                  id="thumbnail-upload"
                />
                <label
                  htmlFor="thumbnail-upload"
                  className="bg-bleu-secondaire text-white rounded-xl px-6 py-2 cursor-pointer hover:bg-bleu-secondaire/90 transition duration-300 ease-in-out"
                >
                  Parcourir
                </label>
              </div>
              <div className="m-5 border-2 border-gris-clair rounded-2xl px-5 py-2 flex flex-col gap-2 items-start justify-between">
                <h3 className="font-titres text-gris-fonce/80 text-xl">
                  Description
                </h3>
                {isEditSpec ? (
                  <>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="text-bleu-principal text-md w-full min-h-32 resize-none outline-none"
                    />
                  </>
                ) : (
                  <p
                    onClick={() => setIsEditSpec(true)}
                    className="w-full whitespace-pre-line text-bleu-principal text-md hover:text-bleu-principal/90 cursor-pointer"
                    title="Modifier"
                  >
                    {description}
                  </p>
                )}
              </div>
              {isEditSpec && (
                <button
                  onClick={() => setIsEditSpec(false)}
                  className="self-end mx-5 bg-bleu-secondaire px-4 py-2 text-white font-semibold text-center rounded-lg hover:bg-bleu-secondaire/95 transition duration-300 ease-in-out cursor-pointer"
                >
                  Enregistrer
                </button>
              )}
              <div className="flex flex-col gap-3 px-5 py-2">
                <h3 className="font-titres text-bleu-principal font-semibold text-xl">
                  Leçons
                </h3>
                <div className="w-full border-2 border-gris-clair rounded-2xl p-1 flex flex-col gap-2 justify-between">
                  {selectedLecons.map((lecon) => (
                    <Link
                      key={`${lecon.id}-${lecon.coursId}`}
                      to={`${location.pathname}/lecons/${lecon.id}`}
                      className={`flex flex-col  border-t-${lecon.id === '1' ? "0" : "2"} border-gris-clair p-4 gap-3 items-center`}
                    >
                      <div className="flex justify-between w-full">
                        <div className="flex gap-4">
                          <div className="bg-orange-cuivre/30 w-12 h-12 rounded flex items-center justify-center text-orange-cuivre text-2xl font-bold">
                            {String(lecon.ordre).padStart(2, "0")}
                          </div>
                          <div className="flex flex-col items-start">
                            <h3 className="font-titres text-bleu-principal font-semibold text-lg">
                              {lecon.titre}
                            </h3>
                            <p className="text-bleu-secondaire text-sm">
                              {lecon.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <p className="text-bleu-secondaire flex text-md">
                            {lecon.types.join(" · ")}
                          </p>
                        </div>
                      </div>
                      <hr className={`w-7/8 text-gris-clair border-2 my-2`} />
                      <div className="w-7/8 flex gap-5">
                        {exos(lecon).map((exo) => (
                          <Link
                            to={`/formateur/cours/${id}/exercices/${exo.id}`}
                            key={exo.id}
                            className="font-semibold px-8 py-2 border-2 border-gris-clair rounded-xl text-bleu-secondaire"
                          >
                            {exo.titre}
                          </Link>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 px-5 py-2 mb-3">
                <h3 className="font-titres text-bleu-principal font-semibold text-xl">
                  Étudiants inscrits
                </h3>
                <TableData
                  columns={etudiantsInscritsColumns}
                  rows={etudiantInscrits}
                  admin={false}
                />
              </div>
            </>
          ) : cours && cours.lecons === 0 ? (
            <>
              <div className="flex justify-between">
                <StateBox
                  titre={"Étudiants inscrits"}
                  label={enrolledStudentsNumber}
                />
                <StateBox titre={"Leçons"} label={cours.lecons} />
                <StateBox titre={"Exercices"} label={numberOfExercices} />
              </div>
              <div className="border-2 border-gris-clair rounded-xl flex justify-between items-center px-4 py-2 mx-5">
                <p className="text-sm text-bleu-secondaire">
                  {fileName || "Aucun fichier sélectionné"}
                </p>
                <input
                  type="file"
                  onChange={(e) => setFileName(e.target.files[0]?.name || "")}
                  className="hidden"
                  id="thumbnail-upload"
                />
                <label
                  htmlFor="thumbnail-upload"
                  className="bg-bleu-secondaire text-white rounded-xl px-6 py-2 cursor-pointer hover:bg-bleu-secondaire/90 transition duration-300 ease-in-out"
                >
                  Parcourir
                </label>
              </div>
              <div className="m-5 border-2 border-gris-clair rounded-2xl px-5 py-2 flex flex-col gap-2 items-start justify-between">
                <h3 className="font-titres text-gris-fonce/80 text-xl">
                  Description
                </h3>
                {isEditSpec ? (
                  <>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="text-bleu-principal text-md w-full min-h-32 resize-none outline-none"
                    />
                  </>
                ) : (
                  <p
                    onClick={() => setIsEditSpec(true)}
                    className="w-full whitespace-pre-line text-bleu-principal text-md hover:text-bleu-principal/90 cursor-pointer"
                    title="Modifier"
                  >
                    Pas de description
                  </p>
                )}
              </div>
              {isEditSpec && (
                <button
                  onClick={() => setIsEditSpec(false)}
                  className="self-end mx-5 bg-bleu-secondaire px-4 py-2 text-white font-semibold text-center rounded-lg hover:bg-bleu-secondaire/95 transition duration-300 ease-in-out cursor-pointer"
                >
                  Enregistrer
                </button>
              )}
              <div className="flex flex-col gap-3 px-5 py-2">
                <h3 className="font-titres text-bleu-principal font-semibold text-xl">
                  Leçons
                </h3>
                <div className="w-full border-2 border-gris-clair rounded-2xl p-1 flex flex-col gap-2 justify-between">
                  <p className="text-bleu-secondaire self-center p-4">
                    Pas de leçons
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 px-5 py-2 mb-3">
                <h3 className="font-titres text-bleu-principal font-semibold text-xl">
                  Étudiants inscrits
                </h3>
                <TableData
                  columns={etudiantsInscritsColumns}
                  rows={[]}
                  admin={false}
                />
              </div>
            </>
          ) : (
            !cours && (
              <div className="border-2 border-gris-clair rounded-2xl p-12 flex flex-col items-center gap-3 text-center m-5">
                <div className="w-14 h-14 rounded-full bg-gris-fonce/10 flex items-center justify-center mb-2">
                  <FileX className="text-gris-fonce" size={26} />
                </div>
                <h3 className="text-bleu-principal font-titres font-semibold text-lg">
                  Cours introuvable
                </h3>
                <p className="text-gris-fonce text-sm max-w-sm">
                  Ce cours n'existe pas ou a été supprimé. Vérifiez le lien ou
                  retournez à la liste des cours.
                </p>
                <button
                  onClick={() => navigate("/formateur/cours")}
                  className="mt-3 bg-bleu-secondaire text-white rounded-xl px-5 py-2 text-sm font-semibold hover:bg-bleu-secondaire/90 transition duration-300 ease-in-out cursor-pointer"
                >
                  Retour aux cours
                </button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default CoursDetails;
