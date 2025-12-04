"use client";

import { useEffect, useState } from "react";
import { Planet } from "@/types/Planet";
import { fetchPlanets } from "@/services/planets";

export function usePlanets() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  async function loadMore() {
    if (loading || !hasMore) return;

    setLoading(true);

    const data = await fetchPlanets(page);

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
