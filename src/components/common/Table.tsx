import React from 'react';
import type { TableColumn } from '../../types';

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onView?: (item: T) => void;
  onDelete?: (item: T) => void;
}

export function Table<T>({ data, columns, onView, onDelete }: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-emerald-50">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.accessor)}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
            {(onView || onDelete) && (
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td
                  key={String(column.accessor)}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {column.render
                    ? column.render(item[column.accessor], item)
                    : String(item[column.accessor])}
                </td>
              ))}
              {(onView || onDelete) && (
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {onView && (
                    <button
                      onClick={() => onView(item)}
                      className="text-emerald-600 hover:text-emerald-900 mr-4"
                    >
                      View
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(item)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}