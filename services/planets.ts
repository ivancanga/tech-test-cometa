import { Planet } from "@/types/Planet";

const BASE_URL = "https://swapi.py4e.com/api/planets/";

export interface PlanetsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
}

export async function fetchPlanets(page: number): Promise<PlanetsResponse> {
  const res = await fetch(`${BASE_URL}?page=${page}`);

  if (!res.ok) {
    throw new Error("Error fetching planets");
  }

  return res.json();
}
