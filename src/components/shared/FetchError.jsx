import { WifiOff, LockKeyhole } from "lucide-react";
import { translations } from "../../translations";

const FetchError = ({ accessDenied, language }) => {
  return (
    <div className="flex flex-col items-center gap-3 text-center py-10">
      <div className="rounded-full bg-gris-clair w-16 h-16 flex items-center justify-center">
        {accessDenied ? (
            <LockKeyhole size={28} className="text-bleu-secondaire" />
          ) : (
            <WifiOff size={28} className="text-bleu-secondaire" />
          )}
      </div>
      <h3 className="font-titres text-bleu-principal font-semibold text-lg">
        {accessDenied ? translations[language]['accesRefuse'] : translations[language]['impossibleChargerDonnees']}
      </h3>
      <p className="text-gris-fonce text-sm">
        {accessDenied ? translations[language]['pasLaPermissionAcceder'] : translations[language]['verifiezConnexionReessayez']}
      </p>
    </div>
  );
};

export default FetchError;
