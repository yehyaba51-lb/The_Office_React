import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProgressBar from '../../shared/ProgressBar'
import { fakeQuestions } from "../../../fakeData";

const TableData = ({ columns, rows, onClickRow, admin=true, type=null }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getNums = (row) => {
    const pregressionParts = row.progression.split('/')
    const current = pregressionParts[0]
    const total = pregressionParts[1]
    return [current, total]
  }

  const trimQuestion = (row) => {
    const value = fakeQuestions.find(q => q.id === row.questionId)?.texte    
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
                          const [current, total] = getNums(row);
                          return <ProgressBar current={ current } total={ total } />
                        })()
                      ) : col.key === 'statut' ? (
                        <span className={row.corrigeLe === null 
                          ? 'bg-orange-cuivre/20 text-orange-cuivre px-3 py-1 rounded-full text-xs font-semibold' 
                          : 'bg-bleu-secondaire/20 text-bleu-secondaire px-3 py-1 rounded-full text-xs font-semibold'
                        }>
                          {row.corrigeLe === null ? 'À corriger' : 'Corrigée'}
                        </span>
                      ) : col.key === 'question' ? (
                        trimQuestion(row)
                      ) : (
                        row[col.key]
                      )}
                    </td>
                  ))}
                  {row.role === "Administrateur" || type === 'formateur' ? (
                    ""
                  ) : (
                    <td className="px-4 py-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`${location.pathname}?edit=true&id=${row.id}`);
                        }}
                        className="cursor-pointer text-gris-fonce/50 hover:text-orange-cuivre/80 transition duration-300 ease-in-out"
                        title="Modifier"
                      >
                        {<row.edit size={18} />}
                      </button>
                    </td>
                  )}
                  {row.role === "Administrateur" || type === 'formateur' ? (
                    ""
                  ) : (
                    <td className="px-4 py-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`${location.pathname}?delete=true&id=${row.id}`);
                        }}
                        className="cursor-pointer text-gris-fonce/50 hover:text-orange-cuivre/80 transition duration-300 ease-in-out"
                        title="Supprimer"
                      >
                        {<row.delete size={18} />}
                      </button>
                    </td>
                  )}
                </tr>
              ))
            : rows.length === 0 ? '' : rows.map((row) => (
                <tr
                  key={row.id}
                  className="text-bleu-principal text-md border-t-2 border-gris-clair"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-2">
                      {col.key === 'progression' ? (
                        (() => {
                          const [current, total] = getNums(row);
                          return <ProgressBar current={ current } total={ total } />
                        })()
                      ) : col.key === 'statut' ? (
                        <span className={row.corrigeLe === null 
                          ? 'bg-orange-cuivre/20 text-orange-cuivre px-3 py-1 rounded-full text-xs font-semibold' 
                          : 'bg-bleu-secondaire/20 text-bleu-secondaire px-3 py-1 rounded-full text-xs font-semibold'
                        }>
                          {row.corrigeLe === null ? 'À corriger' : 'Corrigée'}
                        </span>
                      ) : (
                        row[col.key] === null ? '—' : row[col.key]
                      )}
                    </td>
                  ))}
                  {admin && (
                    row.role === "Administrateur" ? (
                      ""
                    ) : ( row.edit && (
                      <td className="px-4 py-2 w-12">
                        <button
                          onClick={() =>
                            navigate(`${location.pathname}?edit=true&id=${row.id}`)
                          }
                          className="cursor-pointer text-gris-fonce/50 hover:text-orange-cuivre/80 transition duration-300 ease-in-out"
                          title="Modifier"
                        >
                          {<row.edit size={18} />}
                        </button>
                      </td>
                    )))}
                    {admin && (
                      row.role === "Administrateur" ? (
                        ""
                      ) : ( row.delete && (
                        <td className="px-4 py-2 w-12">
                          <button
                            onClick={() =>
                              navigate(`${location.pathname}?delete=true&id=${row.id}`)
                            }
                            className="cursor-pointer text-gris-fonce/50 hover:text-orange-cuivre/80 transition duration-300 ease-in-out"
                            title="Supprimer"
                          >
                            {<row.delete size={18} />}
                          </button>
                        </td>
                      ))

                    )}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
