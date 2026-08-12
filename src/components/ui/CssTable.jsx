import StatusChip from "./StatusChip"

export default function CssTable({ rows = [], headers = [], demo = true }) {
  const cols = headers.length ? headers : ["Cliente", "Producto", "Fecha", "Estado"]
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-xs">
        <thead>
          <tr className="border-b border-outline font-mono text-[10px] uppercase tracking-wider text-text-4">
            {cols.map((h, i) => (
              <th key={i} className="px-3 py-2 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-outline/60 last:border-0">
              {row.map((cell, j) => {
                const isLast = j === row.length - 1
                return (
                  <td key={j} className="px-3 py-2.5 text-text-2">
                    {isLast ? (
                      <StatusChip label={cell} tone={toneFor(cell)} dot={false} />
                    ) : (
                      cell
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {demo && (
        <p className="mt-2 px-3 pb-1 font-mono text-[10px] uppercase tracking-wider text-text-4">Datos ilustrativos</p>
      )}
    </div>
  )
}

function toneFor(status) {
  const s = String(status).toLowerCase()
  if (s.includes("pago") || s.includes("complet")) return "success"
  if (s.includes("pend") || s.includes("proceso")) return "warning"
  if (s.includes("cancel") || s.includes("fall")) return "error"
  return "info"
}
