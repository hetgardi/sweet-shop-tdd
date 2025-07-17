const { sweetShop } = require("../src/sweetShop");

describe("Search Sweet", () => {
  beforeEach(() => {
    sweetShop.reset();
  });

  const sampleSweets = [
    {
      id: 1,
      name: "Kaju Katli",
      category: "Dry Fruit",
      price: 50,
      quantity: 10,
    },
    {
      id: 2,
      name: "Gulab Jamun",
      category: "Milk-Based",
      price: 30,
      quantity: 15,
    },
    {
      id: 3,
      name: "Rasgulla",
      category: "Milk-Based",
      price: 25,
      quantity: 12,
    },
    { id: 4, name: "Soan Papdi", category: "Flaky", price: 20, quantity: 18 },
  ];

  test("search by name (case-insensitive, partial match)", () => {
    sampleSweets.forEach((s) => sweetShop.addSweet(s));
    const results = sweetShop.searchSweets({ name: "gulab" });

    expect(results).toHaveLength(1);
    expect(results[0].name).toBe("Gulab Jamun");
  });

  test("search by category (case-insensitive, partial match)", () => {
    sampleSweets.forEach((s) => sweetShop.addSweet(s));
    const results = sweetShop.searchSweets({ category: "milk" });

    expect(results).toHaveLength(2);
    expect(results.map((s) => s.name)).toEqual(
      expect.arrayContaining(["Gulab Jamun", "Rasgulla"])
    );
  });

  test("search by price range (min and max)", () => {
    sampleSweets.forEach((s) => sweetShop.addSweet(s));
    const results = sweetShop.searchSweets({ minPrice: 25, maxPrice: 35 });

    expect(results.map((s) => s.id)).toEqual(expect.arrayContaining([2, 3]));
  });

  test("search returns empty array if no match found", () => {
    sampleSweets.forEach((s) => sweetShop.addSweet(s));
    const results = sweetShop.searchSweets({ name: "Ladoo" });

    expect(results).toEqual([]);
  });

  test("search with multiple criteria (name + category)", () => {
    sampleSweets.forEach((s) => sweetShop.addSweet(s));
    const results = sweetShop.searchSweets({ name: "Rasg", category: "milk" });

    expect(results).toHaveLength(1);
    expect(results[0].name).toBe("Rasgulla");
  });

  test("search with no filters returns all sweets", () => {
    sampleSweets.forEach((s) => sweetShop.addSweet(s));
    const results = sweetShop.searchSweets({});
    expect(results).toHaveLength(4);
  });
});
