//Tabloda kolon adını literal olarak değil, tip güvenliğiyle seçmek istiyorsun.
 //T->{ id: number; name: string; price: number; inStock: boolean }
 //T->{ id: number; name: string; email: string; active: boolean }
type Column<T> = {
  header: string;
  accessor: keyof T;  // "id" | "name" | "price" | "inStock" 
  render?: (value: T[keyof T], row: T) => React.ReactNode ;
};

type DataTableProps<T extends object> = {
  data: T[];
  columns: Column<T>[];
  // opsiyon: sortBy?: keyof T; onRowClick?: (row: T) => void; ...
};

export const DataTable = <T extends object,>({ data, columns }: DataTableProps<T>) => {
  return (
    <table>
      <thead>
        <tr>{columns.map(c => <th key={String(c.accessor)}>{c.header}</th>)}</tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map(c => {
              const value = row[c.accessor]; // tip: T[keyof T]
              return <td key={String(c.accessor)}>
                {c.render ? c.render(value, row) : String(value)}
              </td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};




