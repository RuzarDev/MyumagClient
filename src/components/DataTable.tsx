import React, { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Column<T> {
  header: string;
  accessor: keyof T;
  cell?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  onDelete?: (row: T) => void;
  onModal?: (row: T) => void;
  renderSubRow?: (row: T) => React.ReactNode; // новая пропса
}

function DataTable<T extends Record<string, any>>({
                                                    columns,
                                                    data,
                                                    onRowClick,
                                                    onDelete,
                                                    onModal,
                                                    renderSubRow
                                                  }: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: 'asc' | 'desc' | null;
  }>({ key: null, direction: null });

  const [expandedRowKey, setExpandedRowKey] = useState<any>(null);

  const handleSort = (key: keyof T) => {
    let direction: 'asc' | 'desc' | null = 'asc';

    if (sortConfig.key === key) {
      direction = sortConfig.direction === 'asc' ? 'desc' : sortConfig.direction === 'desc' ? null : 'asc';
    }

    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T];
      const bValue = b[sortConfig.key as keyof T];
      return sortConfig.direction === 'asc'
          ? aValue > bValue ? 1 : -1
          : aValue < bValue ? 1 : -1;
    });
  }, [data, sortConfig]);

  return (
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
            <tr>
              {columns.map((column, index) => (
                  <th
                      key={index}
                      className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => column.sortable !== false && handleSort(column.accessor)}
                  >
                    <div className="flex items-center gap-1">
                      {column.header}
                      {column.sortable !== false && (
                          <div className="flex flex-col">
                            <ChevronUp
                                size={12}
                                className={`${
                                    sortConfig.key === column.accessor && sortConfig.direction === 'asc'
                                        ? 'text-blue-600'
                                        : 'text-slate-400'
                                }`}
                            />
                            <ChevronDown
                                size={12}
                                className={`${
                                    sortConfig.key === column.accessor && sortConfig.direction === 'desc'
                                        ? 'text-blue-600'
                                        : 'text-slate-400'
                                }`}
                            />
                          </div>
                      )}
                    </div>
                  </th>
              ))}
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Действия</th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
            {sortedData.map((row, rowIndex) => {
              const rowKey = row.id ?? rowIndex; // поддержка `id` как ключ
              const isExpanded = expandedRowKey === rowKey;

              return (
                  <React.Fragment key={rowKey}>
                    <tr
                        className={`${onRowClick || renderSubRow ? 'cursor-pointer hover:bg-slate-50' : ''}`}
                        onClick={() => {
                          if (onRowClick) onRowClick(row);
                          if (renderSubRow) {
                            setExpandedRowKey(isExpanded ? null : rowKey);
                          }
                        }}
                    >
                      {columns.map((column, colIndex) => (
                          <td key={colIndex} className="px-4 py-3 whitespace-nowrap">
                            {column.cell ? column.cell(row[column.accessor], row) : row[column.accessor]}
                          </td>
                      ))}
                      <td className="px-4 py-3 whitespace-nowrap space-x-2">
                        {onDelete && (
                            <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDelete(row);
                                }}
                                className="text-red-500 hover:text-red-700"
                            >
                              Delete
                            </button>
                        )}
                        {onModal && (
                            <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onModal(row);
                                }}
                                className="text-blue-500 hover:text-blue-700"
                            >
                              Show more
                            </button>
                        )}
                      </td>
                    </tr>

                    {renderSubRow && isExpanded && (
                        <tr className="bg-slate-50">
                          <td colSpan={columns.length + 1} className="px-4 py-3">
                            {renderSubRow(row)}
                          </td>
                        </tr>
                    )}
                  </React.Fragment>
              );
            })}
            </tbody>
          </table>
        </div>
      </div>
  );
}

export default DataTable;
