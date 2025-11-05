"use client";
import { useCallback, useEffect, useState } from "react";
import type { Donacion, DonacionesResponse } from "../types";

export function useDonaciones() {
  const [data, setData] = useState<Donacion[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setIsError(null);
    try {
      const res = await fetch("/donar/api");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: DonacionesResponse = await res.json();
      setData(json.data ?? []);
    } catch (err) {
      setIsError(err as Error);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    isError,
    refetch: fetchData,
  } as const;
}
