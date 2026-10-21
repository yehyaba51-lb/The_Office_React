import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import ProgressBar from '../../shared/ProgressBar'
import { Pencil, Trash2 } from "lucide-react";
import { translations } from "../../../translations";

const TableData = ({ columns, rows, onClickRow, admin=true, type=null, edit=true, deleting=true }) => {
  const location = useLocation();
  const navigate = useNavigate();
    const { currentUser, lang } = useOutletContext()


  const capitalize = (str) => str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  
  return (
    <div className="w-full border-2 border-gris-clair rounded-2xl px-2 py-1 overflow-x-auto">
      <table className="w-full table-fixed min-w-250">
        <thead>
          <tr className="font-titres text-bleu-secondaire font-semibold text-xs">
            {columns.map((col) => (
              <th className="px-4 py-2 text-left truncate" key={col.key}>
                {translations[lang][col.label]}
              </th>
            ))}
            <th className="w-12"></th>
            <th className="w-12"></th>
          </tr>
        </thead>
        <tbody>
          {onClickRow
            ? rows.length === 0 ? '' : rows.map((row) => (
                <tr
                  onClick={() => {
                    if(type === 'formateur') {
                      navigate(`${location.pathname}?correct=true&id=${row.id}`)
                    } else {
                      navigate(`${location.pathname}/${row.id}`)
                    }
                  }}
                  key={row.id}
                  className="text-bleu-principal text-md border-t-2 border-gris-clair cursor-pointer"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-2">
                      {col.key === 'progression' ? (
                        (() => {
                          return <ProgressBar current={ row.current } total={ row.total } />
                        })()
                      ) : col.key === 'statut' ? (
                        <span className={row.corrige_le  === null 
                          ? 'bg-orange-cuivre/20 text-orange-cuivre px-3 py-1 rounded-full text-xs font-semibold truncate' 
                          : 'bg-bleu-secondaire/20 text-bleu-secondaire px-3 py-1 rounded-full text-xs font-semibold truncate'
                        }>
                          {row.corrige_le  === null ? translations[lang]['aCorriger'] : translations[lang]['corrigee']}
                        </span>
                      ) : col.key === 'texte_question' ? (
                        row[col.key].slice(0, 20) + '...'
                      ) : col.key === 'note' ? (
                        <span className={row.note === null ? 'bg-gris-clair text-orange-cuivre/70 px-3 py-1 rounded-full text-xs font-semibold'
                          : row.note >= 10 ? 'text-vert-reussite bg-vert-reussite/20 px-3 py-1 rounded-full text-xs font-semibold truncate' 
                          : 'text-rouge-echec bg-rouge-echec/20 px-3 py-1 rounded-full text-xs font-semibold truncate'
                        }>
                            {row.note === null ? translations[lang]['enCorrection'] : row.note}
                        </span>
                      ) : col.key === 'note_finale' ? (
                        row.note_finale === null ? '—' : row.note_finale
                      ) : col.key === 'description' ? (
                        row[col.key] ? (
                          <p className="truncate w-full">{capitalize(row[col.key].slice(0, 40)) + '...'}</p>
                        ) : (
                          <p className="truncate w-full">{translations[lang]['pasDeDescription']}</p>
                        )
                      ) : col.key === 'categorie' ? (
                        row[col.key] ? (
                          <p className="truncate w-full">{capitalize(row[col.key].slice(0, 40)) + '...'}</p>
                        ) : (
                          <p className="truncate w-full">{translations[lang]['pasDeCategorie']}</p>
                        )
                      ) : col.key === 'formateur' ? (
                        row[col.key] ? (
                          <p className="truncate w-full">{capitalize(row[col.key])}</p>
                        ) : (
                          <p className="truncate w-full">{translations[lang]['aucunFormateurAssigne']}</p>
                        )
                      ) : col.key === 'lecons' ? (
                          row[col.key] ?? 0 
                      ) : col.key === 'email' ? (
                        <div className="truncate w-full">
                          {row[col.key]}
                        </div>
                      ) : col.key === 'texte_question'? (
                        <p>{row[col.key].slice(0, 35) + '...'}</p>
                      ) : (
                        <div className="truncate w-full">
                          {typeof row[col.key] === 'string' ? capitalize(row[col.key]) : row[col.key]}
                        </div>
                      )}
                    </td>
                  ))}
                  {admin && (
                    row.role === "Administrateur" ? (
                      ""
                    ) : edit && (
                      <td className="px-4 py-2 w-12">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`${location.pathname}?edit=true&id=${row.id}`)
                          }
                          }
                          className="cursor-pointer text-gris-fonce/50 hover:text-orange-cuivre/80 transition duration-300 ease-in-out"
                          title={translations[lang]['modifier']}
                        >
                          {<Pencil size={18} />}
                        </button>
                      </td>
                    ))}
                    {admin && (
                      row.role === "Administrateur" ? (
                        ""
                      ) : deleting && (
                        <td className="px-4 py-2 w-12">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              navigate(`${location.pathname}?delete=true&id=${row.id}`)
                            }
                            }
                            className="cursor-pointer text-gris-fonce/50 hover:text-orange-cuivre/80 transition duration-300 ease-in-out"
                            title={translations[lang]['supprimer']}
                          >
                            {<Trash2 size={18} />}
                          </button>
                        </td>
                      )
                    )}
                </tr>
                
              )
            ) : rows.length === 0 ? (
              null
            ) : rows.map((row) => (
                <tr
                  key={row.id}
                  className="text-bleu-principal text-md border-t-2 border-gris-clair"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-2">
                      {col.key === 'progression' ? (
                        (() => {
                          return <ProgressBar current={ row.current } total={ row.total } />
                        })()
                      ) : col.key === 'statut' ? (
                        <span className={row.corrige_le  === null 
                          ? 'bg-orange-cuivre/20 text-orange-cuivre px-3 py-1 rounded-full text-xs font-semibold w-full truncate' 
                          : 'bg-bleu-secondaire/20 text-bleu-secondaire px-3 py-1 rounded-full text-xs font-semibold w-full truncate'
                        }>
                          {row.corrige_le  === null ? translations[lang]['aCorriger'] : translations[lang]['corrigee']}
                        </span>
                      ) : col.key === 'note' ? (
                        <span className={row.note >= 10 
                          ? 'text-vert-reussite bg-vert-reussite/20 px-5 py-1 rounded-full text-sm font-semibold' 
                          : 'text-rouge-echec bg-rouge-echec/20 px-5 py-1 rounded-full text-sm font-semibold'
                        }>
                          <div className="truncate w-full">
                            {row.note}
                          </div>
                        </span>
                      ) : col.key === 'note_finale' ? (
                        row.note_finale === null ? '—' : row.note_finale
                      ) : col.key === 'coursCount' ? (
                        row[col.key] ?? 0 
                      ) : col.key === 'email' ? (
                        <div className="truncate w-full">
                          {row[col.key]}
                        </div>
                      ) : (
                        <div className="truncate w-full">
                          {typeof row[col.key] === 'string' ? capitalize(row[col.key]) : row[col.key]}
                        </div>
                      )}
                    </td>
                  ))}
                  {admin && (
                    row.role === "Administrateur" ? (
                      ""
                    ) : edit && (
                      <td className="px-4 py-2 w-12">
                        <button
                          onClick={() =>
                            navigate(`${location.pathname}?edit=true&id=${row.id}`)
                          }
                          className="cursor-pointer text-gris-fonce/50 hover:text-orange-cuivre/80 transition duration-300 ease-in-out"
                          title={translations[lang]['modifier']}
                        >
                          {<Pencil size={18} />}
                        </button>
                      </td>
                    ))}
                    {admin && (
                      row.role === "Administrateur" ? (
                        ""
                      ) : deleting && (
                        <td className="px-4 py-2 w-12">
                          <button
                            onClick={() =>
                              navigate(`${location.pathname}?delete=true&id=${row.id}`)
                            }
                            className="cursor-pointer text-gris-fonce/50 hover:text-orange-cuivre/80 transition duration-300 ease-in-out"
                            title={translations[lang]['supprimer']}
                          >
                            {<Trash2 size={18} />}
                          </button>
                        </td>
                      )
                    )}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
