import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, Paper, Checkbox } from '@mui/material';

interface TableColumn {
  id: string;
  label: string;
  align?: 'center' | 'left' | 'right';
  disableSorting?: boolean;
  width?: string | number; // Width can be string or number (px, %, etc.)
}

interface TableProps<T> {
  columns: TableColumn[];
  data: T[];
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

function TableComponent<T>({
  columns,
  data,
  rowsPerPageOptions = [5, 10, 25],
  defaultRowsPerPage = 5,
  selectable = false,
  onRowSelect,
}: TableProps<T>) {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('');
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(defaultRowsPerPage);
  const [page, setPage] = useState<number>(0);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedRows(data);
      onRowSelect?.(data);
    } else {
      setSelectedRows([]);
      onRowSelect?.([]);
    }
  };

  const handleRowClick = (row: T) => {
    const selectedIndex = selectedRows.indexOf(row);
    let newSelected: T[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1));
    } else {
      newSelected = newSelected.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1)
      );
    }

    setSelectedRows(newSelected);
    onRowSelect?.(newSelected);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortData = (array: T[], comparator: (a: T, b: T) => number): T[] => {
    return array.sort(comparator);
  };

  const comparator = (a: T, b: T): number => {
    if (orderBy) {
      if (a[orderBy] < b[orderBy]) {
        return order === 'asc' ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return order === 'asc' ? 1 : -1;
      }
    }
    return 0;
  };

  const sortedData = sortData(data, comparator);

  return (
    <Paper>
      <TableContainer>
        <Table aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              {selectable && (
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
                    checked={data.length > 0 && selectedRows.length === data.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  sortDirection={orderBy === column.id ? order : false}
                  style={{ width: column.width || 'auto' }} // Apply dynamic width here
                >
                  {!column.disableSorting ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleRequestSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isSelected = selectedRows.indexOf(row) !== -1;
                return (
                  <TableRow
                    hover
                    onClick={() => handleRowClick(row)}
                    role="checkbox"
                    aria-checked={isSelected}
                    key={index}
                    selected={isSelected}
                  >
                    {selectable && (
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                    )}
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ width: column.width || 'auto' }} // Apply dynamic width here too
                      >
                        {row[column.id as keyof T]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default TableComponent;
