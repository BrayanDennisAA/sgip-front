import { ReactNode } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Typography,
} from '@mui/material';

export interface DataTableColumn<T> {
  key: string;
  header: string;
  align?: 'left' | 'right' | 'center';
  render: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowKey: (row: T) => string | number;
  emptyMessage: string;
  minWidth?: number;
  maxHeight?: number;
  stickyHeader?: boolean;
}

export function DataTable<T>({
  columns,
  rows,
  getRowKey,
  emptyMessage,
  minWidth,
  maxHeight,
  stickyHeader = false,
}: DataTableProps<T>) {
  if (rows.length === 0) {
    return (
      <Paper
        variant="outlined"
        sx={{
          mt: 4,
          p: 6,
          textAlign: 'center',
          borderStyle: 'dashed',
          color: 'text.secondary',
        }}
      >
        <Typography variant="body2">{emptyMessage}</Typography>
      </Paper>
    );
  }

  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={
        maxHeight
          ? { mt: 3, overflowX: 'auto', maxHeight: maxHeight }
          : { mt: 3, overflowX: 'auto' }
      }
    >
      <Table
        stickyHeader={stickyHeader}
        sx={minWidth ? { minWidth } : undefined}
      >
        <TableHead>
          <TableRow
            sx={{
              '& th': {
                bgcolor: 'background.default',
                fontSize: 12,
                textTransform: 'uppercase',
              },
            }}
          >
            {columns.map((col) => (
              <TableCell key={col.key} align={col.align ?? 'left'}>
                {col.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={getRowKey(row)}
              hover
              sx={{ '&:last-child td': { border: 0 } }}
            >
              {columns.map((col) => (
                <TableCell key={col.key} align={col.align ?? 'left'}>
                  {col.render(row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
