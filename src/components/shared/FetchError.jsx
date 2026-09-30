import { WifiOff, LockKeyhole } from "lucide-react";

const FetchError = ({ accessDenied }) => {
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
        {accessDenied ? 'Accès refusé' : 'Impossible de charger les données.'}
      </h3>
      <p className="text-gris-fonce text-sm">
        {accessDenied ? "Vous n'avez pas la permission d'accéder à cette page" : 'Vérifiez votre connexion et réessayez.'}
      </p>
    </div>
  );
};

export default FetchError;
