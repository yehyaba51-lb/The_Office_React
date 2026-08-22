import React, { useState } from "react";
import { CircleX } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const LessonBuilderModal = ({ lecon }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [steps, setSteps] = useState(1);
  const [pdfs, setPdfs] = useState([{ filename: "", ordre: "" }]);
  const [videos, setVideos] = useState([{ filename: "", ordre: "" }]);
  const [titre, setTitre] = useState("");
  const [ordre, setOrdre] = useState("");
  const [contenu, setContenu] = useState("");
  const canProceed =
    steps === 1
      ? titre !== "" && ordre !== ""
      : steps === 2
        ? contenu !== ""
        : steps === 3
          ? pdfs.every((pdf) => pdf.filename !== "" && pdf.ordre !== "")
          : steps === 4
            ? videos.every(
                (video) => video.filename !== "" && video.ordre !== "",
              )
            : true;
  const usedOrdersPdf = pdfs.map((pdf) => pdf.ordre).filter((o) => o !== "");
  const usedOrdersVideo = videos
    .map((video) => video.ordre)
    .filter((o) => o !== "");

  console.log(usedOrdersPdf);

  return (
    <>
      <div className="fixed bg-bleu-secondaire/20 backdrop-blur-xs inset-0"></div>
      <div
        className="fixed inset-0 flex justify-center items-start p-22 z-10"
        onClick={() => navigate(location.pathname)}
      >
        <div
          className="bg-white rounded-2xl px-12 py-8 w-160 flex flex-col gap-5"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex w-full justify-between items-center">
            <h3 className="font-titres text-bleu-primaire text-xl">
              {steps === 1
                ? "Créer un leçon"
                : steps === 2
                  ? "Ajouter leçon contenu"
                  : steps === 3
                    ? "Ajouter un PDF"
                    : "Ajouter un Video"}
            </h3>
            <button
              title="Fermer"
              className="text-gris-fonce cursor-pointer hover:text-gris-fonce/50 transition duration-300 ease-in-out"
              onClick={() => navigate(location.pathname)}
            >
              <CircleX size={22} />
            </button>
          </div>
          <form action="" method="post" className="flex flex-col">
            {steps === 1 && (
              <>
                <div className="flex flex-col gap-1 mb-2">
                  <label htmlFor="titre" className="text-gris-fonce text-sm">
                    Titre
                  </label>
                  <input
                    type="text"
                    name="titre"
                    id="titre"
                    value={titre}
                    onChange={(e) => setTitre(e.target.value)}
                    className="border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition"
                    placeholder={`Entrez titre de la leçon...`}
                  />
                </div>
                <div className="flex flex-col gap-1 mb-2">
                  <label htmlFor="ordre" className="text-gris-fonce text-sm">
                    Ordre
                  </label>
                  <select
                    type="text"
                    name="ordre"
                    id="ordre"
                    value={ordre}
                    onChange={(e) => setOrdre(e.target.value)}
                    className="border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition"
                    placeholder={`Entrez titre de la leçon...`}
                  >
                    <option value=""></option>
                    {[...Array(lecon.length + 1)].map((_, i) => (
                      <option
                        key={i + 1}
                        className="text-bleu-principal"
                        value={i + 1}
                      >
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
            {steps === 2 && (
              <>
                <div className="flex flex-col gap-1 mb-2">
                  <label htmlFor="contenu" className="text-gris-fonce text-sm">
                    Contenu
                  </label>
                  <textarea
                    type="text"
                    name="contenu"
                    id="contenu"
                    value={contenu}
                    onChange={(e) => setContenu(e.target.value)}
                    rows="6"
                    className="border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire resize-none outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition"
                    placeholder={`Entrez titre de la leçon...`}
                  ></textarea>
                </div>
              </>
            )}
            {steps === 3 && (
              <>
                {pdfs.map((pdf, index) => {
                  return (
                    <>
                      <div className="flex flex-col gap-1 my-2" key={index}>
                        <label
                          htmlFor="ordre"
                          className="text-gris-fonce text-sm"
                        >
                          Ordre
                        </label>
                        <select
                          type="text"
                          name="ordre"
                          id="ordre"
                          value={pdf.ordre}
                          onChange={(e) => {
                            const updated = [...pdfs];
                            updated[index].ordre = e.target.value;
                            setPdfs(updated);
                          }}
                          className="border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition"
                          placeholder={`Entrez titre de la leçon...`}
                        >
                          <option value=""></option>
                          {[...Array(pdfs.length)].map((_, i) => {
                            const value = String(i + 1);
                            const isOwnValue = pdf.ordre === value;
                            return (
                              (!usedOrdersPdf.includes(value) ||
                                isOwnValue) && (
                                <option
                                  key={i}
                                  className="text-bleu-principal"
                                  value={value}
                                >
                                  {value}
                                </option>
                              )
                            );
                          })}
                        </select>
                      </div>
                      <div
                        key={index}
                        className="border-2 border-gris-clair rounded-xl flex justify-between items-center px-4 py-2"
                      >
                        <p className="text-sm text-bleu-secondaire">
                          {pdf.filename || "Choisir un fichier PDF"}
                        </p>
                        <input
                          type="file"
                          onChange={(e) => {
                            const updated = [...pdfs];
                            updated[index].filename =
                              e.target.files[0]?.name || "";
                            setPdfs(updated);
                          }}
                          className="hidden"
                          id={`thumbnail-upload-${index}`}
                        />
                        <label
                          htmlFor={`thumbnail-upload-${index}`}
                          className="bg-bleu-secondaire text-white rounded-xl px-10 py-1.5 cursor-pointer hover:bg-bleu-secondaire/90 transition duration-300 ease-in-out"
                        >
                          Parcourir
                        </label>
                      </div>
                    </>
                  );
                })}
                <input
                  onClick={() =>
                    setPdfs([...pdfs, { filename: "", ordre: "" }])
                  }
                  type="button"
                  className="text-orange-cuivre text-end cursor-pointer hover:text-orange-cuivre/55 transition duration-500 ease-in-out"
                  value="Ajouter un autre PDF"
                />
              </>
            )}
            {steps === 4 && (
              <>
                {videos.map((video, index) => {
                  return (
                    <>
                      <div className="flex flex-col gap-1 my-2" key={index}>
                        <label
                          htmlFor="ordre"
                          className="text-gris-fonce text-sm"
                        >
                          Ordre
                        </label>
                        <select
                          type="text"
                          name="ordre"
                          id="ordre"
                          value={video.ordre}
                          onChange={(e) => {
                            const updated = [...videos];
                            updated[index].ordre = e.target.value;
                            setVideos(updated);
                          }}
                          className="border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition"
                        >
                          <option value=""></option>
                          {[...Array(videos.length)].map((_, i) => {
                            const value = String(i + 1);
                            const isOwnValue = video.ordre === value;
                            return (
                              (!usedOrdersVideo.includes(value) ||
                                isOwnValue) && (
                                <option
                                  key={i}
                                  className="text-bleu-principal"
                                  value={value}
                                >
                                  {value}
                                </option>
                              )
                            );
                          })}
                        </select>
                      </div>
                      <div
                        key={index}
                        className="border-2 border-gris-clair rounded-xl flex justify-between items-center px-4 py-2"
                      >
                        <p className="text-sm text-bleu-secondaire">
                          {video.filename || "Choisir un video"}
                        </p>
                        <input
                          type="file"
                          onChange={(e) => {
                            const updated = [...videos];
                            updated[index].filename =
                              e.target.files[0]?.name || "";
                            setVideos(updated);
                          }}
                          className="hidden"
                          id={`thumbnail-upload-${index}`}
                        />
                        <label
                          htmlFor={`thumbnail-upload-${index}`}
                          className="bg-bleu-secondaire text-white rounded-xl px-10 py-1.5 cursor-pointer hover:bg-bleu-secondaire/90 transition duration-300 ease-in-out"
                        >
                          Parcourir
                        </label>
                      </div>
                    </>
                  );
                })}
                <input
                  onClick={() =>
                    setVideos([...videos, { filename: "", ordre: "" }])
                  }
                  type="button"
                  className="text-orange-cuivre text-end cursor-pointer hover:text-orange-cuivre/55 transition duration-500 ease-in-out"
                  value="Ajouter un autre video"
                />
              </>
            )}
            <div className="flex items-center justify-between mt-5">
              <input
                onClick={() => setSteps((prev) => prev - 1)}
                type="button"
                value={`${steps !== 1 ? "Retour" : ""}`}
                className="text-bleu-secondaire cursor-pointer hover:text-bleu-secondaire/75 transition duration-300 ease-in-out"
              />
              <div className={`w-1/2 gap-3 flex`}>
                <input
                  onClick={
                    steps === 1
                      ? () => {
                          navigate(location.pathname);
                        }
                      : steps !== 4
                        ? () => setSteps((prev) => prev + 1)
                        : () => navigate(`${location.pathname}?success=true`)
                  }
                  type="button"
                  value={steps === 1 ? "Annule" : `Passer`}
                  className="text-sm w-5/6 bg-white border-2 border-gris-clair rounded-xl p-2 cursor-pointer text-bleu-secondaire font-semibold hover:bg-gray-100 transition duration-300 ease-in-out"
                />
                <input
                  type="button"
                  onClick={
                    steps !== 4
                      ? () => setSteps((prev) => prev + 1)
                      : () => navigate(`${location.pathname}?success=true`)
                  }
                  value={steps === 4 ? `Terminer` : "Suivant"}
                  className={`text-sm w-5/6 ${canProceed ? "bg-orange-cuivre" : "bg-orange-cuivre/20"} rounded-xl p-2 text-white font-semibold ${canProceed ? "cursor-pointer hover:bg-orange-cuivre/90 transition duration-300 ease-in-out" : "cursor-not-allowed"} `}
                  disabled={!canProceed}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LessonBuilderModal;
