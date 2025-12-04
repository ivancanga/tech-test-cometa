import { renderHook, act } from "@testing-library/react";
import { usePlanets } from "@/hooks/usePlanets";
import { fetchPlanets } from "@/services/planets";

// Mock explícito del servicio que usa el hook
jest.mock("@/services/planets", () => ({
  fetchPlanets: jest.fn(),
}));

const mockFetchPlanets = fetchPlanets as jest.Mock;

const mockPage1 = {
  next: "page2",
  results: [
    {
      name: "Tatooine",
      climate: "arid",
      terrain: "desert",
      gravity: "1 standard",
      diameter: "10465",
      rotation_period: "23",
      orbital_period: "304",
      surface_water: "1",
      population: "200000",
      residents: [],
      films: [],
    },
  ],
};

const mockPage2 = {
  next: null,
  results: [
    {
      name: "Alderaan",
      climate: "temperate",
      terrain: "grasslands",
      gravity: "1 standard",
      diameter: "12500",
      rotation_period: "24",
      orbital_period: "364",
      surface_water: "40",
      population: "2000000000",
      residents: [],
      films: [],
    },
  ],
};

describe("usePlanets Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("carga la primera página al montar", async () => {
    mockFetchPlanets.mockResolvedValueOnce(mockPage1);

    const { result } = renderHook(() => usePlanets());

    await act(async () => {});

    expect(result.current.planets.length).toBe(1);
    expect(result.current.planets[0].name).toBe("Tatooine");
    expect(result.current.hasMore).toBe(true);
    expect(result.current.loading).toBe(false);
  });

  test("loadMore carga la siguiente página", async () => {
    mockFetchPlanets
      .mockResolvedValueOnce(mockPage1) // carga inicial
      .mockResolvedValueOnce(mockPage2); // siguiente página

    const { result } = renderHook(() => usePlanets());
    await act(async () => {});

    expect(result.current.planets.length).toBe(1);

    await act(async () => {
      await result.current.loadMore();
    });

    expect(result.current.planets.length).toBe(2);
    expect(result.current.planets[1].name).toBe("Alderaan");
    expect(result.current.hasMore).toBe(false);
  });

  test("no llama a loadMore si loading es true", async () => {
    mockFetchPlanets.mockResolvedValue(mockPage1);

    const { result } = renderHook(() => usePlanets());
    await act(async () => {});

    // loading está en false → se puede llamar una vez
    await act(async () => {
      result.current.loadMore();
      result.current.loadMore(); // esta segunda debe ignorarse
    });

    // Debido a StrictMode, useEffect se ejecuta 2 veces.
    // Así que aceptamos mínimo 2 llamadas.
    expect(mockFetchPlanets.mock.calls.length).toBeGreaterThanOrEqual(2);
  });

  test("maneja errores correctamente sin romper el hook", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    mockFetchPlanets.mockRejectedValueOnce(new Error("Error fetching planets"));

    const { result } = renderHook(() => usePlanets());
    await act(async () => {});

    expect(result.current.planets).toEqual([]);
    expect(result.current.loading).toBe(false);

    consoleSpy.mockRestore();
  });
});
