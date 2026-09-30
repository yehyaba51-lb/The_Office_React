import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProgressBar from '../../shared/ProgressBar'
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const TableData = ({ columns, rows, onClickRow, admin=true, type=null, edit=true, deleting=true }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([])

  const capitalize = (str) => str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  const getQuestions = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/questions.php?`, {
        credentials: 'include',
      })
      const data = await response.json()

      if(!response.ok){
        toast.error(data.error)
        return false
      }
      setQuestions(data)
    } catch (error) {
      setQuestions([])
    }
  }

  useEffect(() => {
    if(!columns.some(col => col.key === 'question')) return
    getQuestions()
  }, [])
  const trimQuestion = (row) => {
    const value = questions
      ? questions.find(q => q.question_id === row.question_id)?.texte_question ?? ''
      : ''
    return value.slice(0, 30) + '...'
  }
  
  return (
    <div className="border-2 border-gris-clair rounded-2xl px-2 py-1">
      <table className="w-full table-fixed">
        <thead>
          <tr className="font-titres text-bleu-secondaire font-semibold text-xs">
            {columns.map((col) => (
              <th className="px-4 py-2 text-left" key={col.key}>
                {col.label}
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
                          ? 'bg-orange-cuivre/20 text-orange-cuivre px-3 py-1 rounded-full text-xs font-semibold' 
                          : 'bg-bleu-secondaire/20 text-bleu-secondaire px-3 py-1 rounded-full text-xs font-semibold'
                        }>
                          {row.corrige_le  === null ? 'À corriger' : 'Corrigée'}
                        </span>
                      ) : col.key === 'question' ? (
                        trimQuestion(row)
                      ) : col.key === 'note' ? (
                        <span className={row.note === null ? 'bg-gris-clair text-orange-cuivre/70 px-3 py-1 rounded-full text-xs font-semibold'
                          : row.note >= 10 ? 'text-vert-reussite bg-vert-reussite/20 px-3 py-1 rounded-full text-xs font-semibold' 
                          : 'text-rouge-echec bg-rouge-echec/20 px-3 py-1 rounded-full text-xs font-semibold'
                        }>
                          {row.note === null ? 'En correction' : row.note}
                        </span>
                      ) : col.key === 'note_finale' ? (
                        row.note_finale === null ? '—' : row.note_finale
                      ) : col.key === 'description' ? (
                        row[col.key] ? (
                          <p>{capitalize(row[col.key].slice(0, 40)) + '...'}</p>
                        ) : (
                          <p>Pas de description</p>
                        )
                      ) : col.key === 'lecons' ? (
                          row[col.key] ?? 0 
                      ) : col.key === 'email' ? (
                        row[col.key]
                      ) : col.key === 'texte_question'? (
                        <p>{row[col.key].slice(0, 35) + '...'}</p>
                      ) : (
                        typeof row[col.key] === 'string' ? capitalize(row[col.key]) : row[col.key]
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
                          title="Modifier"
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
                            title="Supprimer"
                          >
                            {<Trash2 size={18} />}
                          </button>
                        </td>
                      )
                    )}
                </tr>
                
              )
            )
            : rows.length === 0 ? '' : rows.map((row) => (
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
                          ? 'bg-orange-cuivre/20 text-orange-cuivre px-3 py-1 rounded-full text-xs font-semibold' 
                          : 'bg-bleu-secondaire/20 text-bleu-secondaire px-3 py-1 rounded-full text-xs font-semibold'
                        }>
                          {row.corrige_le  === null ? 'À corriger' : 'Corrigée'}
                        </span>
                      ) : col.key === 'note' ? (
                        <span className={row.note >= 10 
                          ? 'text-vert-reussite bg-vert-reussite/20 px-5 py-1 rounded-full text-sm font-semibold' 
                          : 'text-rouge-echec bg-rouge-echec/20 px-5 py-1 rounded-full text-sm font-semibold'
                        }>
                          {row.note}
                        </span>
                      ) : col.key === 'note_finale' ? (
                        row.note_finale === null ? '—' : row.note_finale
                      ) : col.key === 'coursCount' ? (
                        row[col.key] ?? 0 
                      ) : col.key === 'email' ? (
                        row[col.key]
                      ) : (
                        typeof row[col.key] === 'string' ? capitalize(row[col.key]) : row[col.key]
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
                          title="Modifier"
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
                            title="Supprimer"
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
