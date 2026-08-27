const ACCENT = "#7c8cf5";
const FK_COLOR = "#a855f7";

interface SchemaColumn {
  name: string;
  type: string;
  key?: "PK" | "FK";
}

interface SchemaTableData {
  name: string;
  kind: "fact" | "dim";
  columns: SchemaColumn[];
}

const goldCustomers: SchemaTableData = {
  name: "gold.customers",
  kind: "dim",
  columns: [
    { name: "customer_key", type: "int", key: "PK" },
    { name: "customer_id", type: "int" },
    { name: "customer_number", type: "nvarchar" },
    { name: "first_name", type: "nvarchar" },
    { name: "last_name", type: "nvarchar" },
    { name: "country", type: "nvarchar" },
    { name: "marital_status", type: "nvarchar" },
    { name: "gender", type: "nvarchar" },
    { name: "birthdate", type: "date" },
    { name: "create_date", type: "date" },
  ],
};

const goldProducts: SchemaTableData = {
  name: "gold.products",
  kind: "dim",
  columns: [
    { name: "product_key", type: "int", key: "PK" },
    { name: "product_number", type: "nvarchar" },
    { name: "product_name", type: "nvarchar" },
    { name: "category", type: "nvarchar" },
    { name: "subcategory", type: "nvarchar" },
    { name: "cost", type: "int" },
    { name: "product_line", type: "nvarchar" },
    { name: "start_date", type: "date" },
  ],
};

const goldSales: SchemaTableData = {
  name: "gold.sales",
  kind: "fact",
  columns: [
    { name: "order_number", type: "nvarchar" },
    { name: "product_key", type: "int", key: "FK" },
    { name: "customer_key", type: "int", key: "FK" },
    { name: "order_date", type: "date" },
    { name: "shipping_date", type: "date" },
    { name: "due_date", type: "date" },
    { name: "sales_amount", type: "int" },
    { name: "quantity", type: "int" },
    { name: "price", type: "int" },
  ],
};

function TableCard({ table }: { table: SchemaTableData }) {
  return (
    <div className="w-full sm:w-52 shrink-0 rounded-lg border border-border bg-surface overflow-hidden">
      <div
        className={`px-3 py-2 border-b border-border flex items-center justify-between ${
          table.kind === "fact" ? "bg-accent/[0.12]" : "bg-surface-light"
        }`}
      >
        <span className="font-mono text-xs font-semibold text-foreground">{table.name}</span>
        <span className="text-[9px] uppercase tracking-wide text-subtle">{table.kind}</span>
      </div>
      <div className="divide-y divide-border">
        {table.columns.map((col) => (
          <div key={col.name} className="flex items-center justify-between gap-2 px-3 py-1 text-[11px]">
            <span
              className={`font-mono truncate ${
                col.key ? "text-foreground font-medium" : "text-foreground-muted"
              }`}
            >
              {col.name}
              {col.key && (
                <span
                  className="ml-1.5 text-[9px] font-semibold"
                  style={{ color: col.key === "PK" ? ACCENT : FK_COLOR }}
                >
                  {col.key}
                </span>
              )}
            </span>
            <span className="text-subtle font-mono shrink-0">{col.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`w-5 h-5 shrink-0 text-subtle ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg className="w-5 h-5 shrink-0 text-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

/** gold.customers / gold.products (dimensions) joining into gold.sales (fact) via surrogate keys. */
export default function StarSchemaDiagram() {
  return (
    <div className="rounded-lg border border-border bg-background p-5 sm:p-6 overflow-x-auto">
      {/* Tablet / desktop — dimensions flanking the fact table */}
      <div className="hidden sm:flex items-start justify-center gap-3">
        <TableCard table={goldCustomers} />
        <div className="flex flex-col items-center gap-1 pt-16 text-[10px] font-mono text-subtle">
          <ArrowRight />
          customer_key
        </div>
        <TableCard table={goldSales} />
        <div className="flex flex-col items-center gap-1 pt-16 text-[10px] font-mono text-subtle">
          <ArrowRight className="rotate-180" />
          product_key
        </div>
        <TableCard table={goldProducts} />
      </div>

      {/* Mobile — stacked vertically */}
      <div className="flex sm:hidden flex-col items-center gap-3">
        <TableCard table={goldCustomers} />
        <ArrowDown />
        <TableCard table={goldProducts} />
        <ArrowDown />
        <TableCard table={goldSales} />
      </div>
    </div>
  );
}
