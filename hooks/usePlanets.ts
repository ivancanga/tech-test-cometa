"use client";

import { useEffect, useState } from "react";

import { Planet } from "@/types/Planet";

const BASE_URL = "https://swapi.py4e.com/api/planets/";

export function usePlanets() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  async function loadMore() {
    if (loading || !hasMore) return;

    setLoading(true);

    const res = await fetch(`${BASE_URL}?page=${page}`);
    const data = await res.json();

    setPlanets((prev) => [...prev, ...data.results]);
    setPage((prev) => prev + 1);
    setHasMore(Boolean(data.next));

    setLoading(false);
  }

  useEffect(() => {
    loadMore();
  }, []);

  return { planets, loadMore, hasMore, loading };
}
