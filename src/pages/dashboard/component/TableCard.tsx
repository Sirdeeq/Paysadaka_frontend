import type React from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

interface Column<T> {
  header: string
  accessor: keyof T | string
  cell?: (item: T) => React.ReactNode
}

interface TableCardProps<T> {
  title: string
  data: T[]
  columns: Column<T>[]
  viewAllLink?: string
  className?: string
}

export function TableCard<T extends { id: string }>({
  title,
  data,
  columns,
  viewAllLink,
  className = "",
}: TableCardProps<T>) {
  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        {viewAllLink && (
          <Link
            to={viewAllLink}
            className="text-sm text-emerald-600 font-medium hover:text-emerald-700 flex items-center"
          >
            View All
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-5 py-4 text-center text-sm text-gray-500">
                  No data available
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  {columns.map((column, columnIndex) => (
                    <td key={columnIndex} className="px-5 py-4 text-sm text-gray-600">
                      {column.cell ? column.cell(item) : String(item[column.accessor as keyof T] || "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {viewAllLink && (
        <div className="border-t border-gray-100 p-4 text-center md:hidden">
          <Link to={viewAllLink} className="text-sm text-emerald-600 font-medium hover:text-emerald-700">
            View All
          </Link>
        </div>
      )}
    </div>
  )
}
