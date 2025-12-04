import { fetchPlanets } from "@/services/planets";

global.fetch = jest.fn();

describe("fetchPlanets", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("hace fetch a la URL correcta", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          count: 61,
          next: "next-url",
          previous: null,
          results: [],
        }),
    });

    await fetchPlanets(1);

    expect(fetch).toHaveBeenCalledWith(
      "https://swapi.py4e.com/api/planets/?page=1"
    );
  });

  test("retorna datos correctamente parseados", async () => {
    const mockData = {
      count: 61,
      next: "https://swapi.py4e.com/api/planets/?page=2",
      previous: null,
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

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await fetchPlanets(1);

    expect(result).toEqual(mockData);
  });

  test("lanza error si fetch retorna ok = false", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({}),
    });

    await expect(fetchPlanets(1)).rejects.toThrow("Error fetching planets");
  });
});
