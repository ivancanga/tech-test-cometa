"use client";

import { DataTable } from "@/components/DataTable";
import { usePlanets } from "@/hooks/usePlanets";
import { columns } from "@/components/columns";

export default function Page() {
  const { planets, loadMore, hasMore, loading } = usePlanets();

  return (
    <main className="min-h-screen bg-[#2E2E2E] flex items-start justify-center py-12 px-6">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.1)] overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-800">
            Planetas y cuerpos celestes
          </h1>
        </div>

        {/* Tabla */}
        <section className="p-6">
          <DataTable data={planets} columns={columns} />

          <div className="flex justify-center mt-6">
            <button
              onClick={loadMore}
              disabled={!hasMore || loading}
              className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition disabled:opacity-50"
            >
              {loading ? "Cargando..." : hasMore ? "Cargar más" : "No hay más planetas"}
            </button>
          </div>
        </section>

        {/* Footer suma total */}
        <FooterTotal planets={planets} />
      </div>
    </main>
  );
}

function FooterTotal({ planets }: { planets: any[] }) {
  const total = planets
    .filter((p) => p.population !== "unknown")
    .reduce((acc, p) => acc + Number(p.population), 0);

  return (
    <div className="flex justify-end p-4 border-t border-gray-200 bg-gray-50">
      <span className="text-sm text-gray-700 font-medium">
        {total.toLocaleString()}
      </span>
    </div>
  );
}
