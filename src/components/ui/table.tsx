import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Reusable table components for consistent layout and styling across the app.
 *
 * Data-driven API: Use <DataTable columns={...} data={...} keyExtractor={...} />
 * Low-level API: Compose Table, TableHeader, TableBody, TableRow, TableHead, TableCell.
 */

// ----- Data-driven table types -----
export interface DataTableColumn<T = unknown> {
  key: string;
  header: string;
  headerClassName?: string;
  cellClassName?: string;
  align?: "left" | "right";
  /** Custom cell render. Receives value at row[key] and full row. */
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  keyExtractor: (row: T) => string | number;
  tableClassName?: string;
  containerClassName?: string;
  /** Optional footer (e.g. pagination) */
  footer?: React.ReactNode;
  /** Optional header row className */
  headerRowClassName?: string;
  /** Optional body row className */
  bodyRowClassName?: string;
  /** Optional table body className */
  bodyClassName?: string;
}

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <table
    ref={ref}
    className={cn("w-full border-collapse text-left", className)}
    {...props}
  />
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("bg-slate-50 dark:bg-slate-800/50", className)}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("divide-y divide-slate-100 dark:divide-slate-800", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/30",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("px-6 py-4 text-sm", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

/** Wraps table in overflow-x-auto for horizontal scroll on small screens */
function TableContainer({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("overflow-x-auto", className)} {...props}>
      {children}
    </div>
  );
}

// ----- Data-driven table component -----
function DataTableInner<T>({
  columns,
  data,
  keyExtractor,
  tableClassName,
  containerClassName,
  footer,
  headerRowClassName,
  bodyRowClassName,
  bodyClassName,
}: DataTableProps<T>) {
  return (
    <>
      <TableContainer className={containerClassName}>
        <Table className={tableClassName}>
          <TableHeader>
            <TableRow className={cn("border-b border-slate-200 dark:border-slate-800", headerRowClassName)}>
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className={cn(
                    col.align === "right" && "text-right",
                    col.headerClassName
                  )}
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className={bodyClassName}>
            {data.map((row) => (
              <TableRow key={String(keyExtractor(row))} className={bodyRowClassName}>
                {columns.map((col) => {
                  const value = (row as Record<string, unknown>)[col.key];
                  const content = col.render
                    ? col.render(value, row)
                    : (value as React.ReactNode);
                  return (
                    <TableCell
                      key={col.key}
                      className={cn(
                        col.align === "right" && "text-right",
                        col.cellClassName
                      )}
                    >
                      {content}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {footer != null ? footer : null}
    </>
  );
}

function DataTable<T>(props: DataTableProps<T>) {
  return <DataTableInner {...props} />;
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableContainer,
  DataTable,
};
