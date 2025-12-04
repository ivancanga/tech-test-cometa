"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Planet } from "@/types/Planet";
import { TerrainBadge } from "./TerrainBadge";
import { BooleanBadge } from "./BooleanBadge";
import { formatNumber, formatPopulation, capitalize } from "@/utils/format";
import { WeatherBadge } from "./WeatherBadge";

const selectionColumn: ColumnDef<Planet> = {
  id: "select",
  header: ({ table }) => (
    <input
      type="checkbox"
      checked={table.getIsAllPageRowsSelected()}
      onChange={table.getToggleAllPageRowsSelectedHandler()}
    />
  ),
  cell: ({ row }) => (
    <input
      type="checkbox"
      checked={row.getIsSelected()}
      onChange={row.getToggleSelectedHandler()}
    />
  ),
  enableSorting: false,
  enableHiding: false,
};

export const columns: ColumnDef<Planet>[] = [
  selectionColumn,
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "climate",
    header: "Clima",
    cell: ({ getValue }) => (
      <WeatherBadge>{capitalize(String(getValue()))}</WeatherBadge>
    ),
  },
  {
    accessorKey: "terrain",
    header: "Terreno",
    cell: ({ getValue }) => (
      <TerrainBadge>{capitalize(String(getValue()))}</TerrainBadge>
    ),
  },
  {
    accessorKey: "gravity",
    header: "Gravedad",
  },
  {
    accessorKey: "diameter",
    header: "Diámetro (km)",
    cell: ({ getValue }) => formatNumber(String(getValue()), "km"),
  },
  {
    accessorKey: "rotation_period",
    header: "Período de rotación",
  },
  {
    accessorKey: "surface_water",
    header: "Agua superficial",
    cell: ({ row }) => <BooleanBadge value={row.original.surface_water} />,
  },
  {
    accessorKey: "population",
    header: "Población",
    cell: ({ getValue }) => formatPopulation(String(getValue())),
  },
  {
    accessorKey: "residents",
    header: "Residentes",
    cell: ({ row }) => row.original.residents.length,
  },
  {
    accessorKey: "films",
    header: "Películas",
    cell: ({ row }) => row.original.films.length,
  },
];
