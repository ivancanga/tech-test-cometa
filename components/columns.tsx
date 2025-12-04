"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Planet } from "@/types/Planet";
import { TerrainBadge } from "./TerrainBadge";
import { BooleanBadge } from "./BooleanBadge";
import { formatNumber, formatPopulation, capitalize } from "@/utils/format";
import { WeatherBadge } from "./WeatherBadge";

export const columns: ColumnDef<Planet>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "climate",
    header: "Clima",
    cell: ({ getValue }) => <WeatherBadge>{capitalize(String(getValue()))}</WeatherBadge>,
  },
  {
    accessorKey: "terrain",
    header: "Terreno",
    cell: ({ getValue }) => <TerrainBadge>{capitalize(String(getValue()))}</TerrainBadge>,
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
    header: "Rotación (hs)",
  },
  {
    accessorKey: "orbital_period",
    header: "Orbital (días)",
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
