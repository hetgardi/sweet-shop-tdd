const { sweetShop } = require("../src/sweetShop");

describe("Sort Sweets", () => {
  beforeEach(() => {
    sweetShop.reset();
  });

  const sampleSweets = [
    { id: 1, name: "Ladoo", category: "Gram", price: 40, quantity: 5 },
    { id: 2, name: "Barfi", category: "Milk", price: 20, quantity: 15 },
    { id: 3, name: "Kaju Roll", category: "Dry Fruit", price: 60, quantity: 8 },
  ];

  test("sort by price: low to high", () => {
    sampleSweets.forEach((s) => sweetShop.addSweet(s));

    const result = sweetShop.sortSweets("PRICE_LOW_TO_HIGH");

    const prices = result.map((s) => s.price);
    expect(prices).toEqual([20, 40, 60]);
  });

  test("sort by price: high to low", () => {
    sampleSweets.forEach((s) => sweetShop.addSweet(s));

    const result = sweetShop.sortSweets("PRICE_HIGH_TO_LOW");

    const prices = result.map((s) => s.price);
    expect(prices).toEqual([60, 40, 20]);
  });

  test("sort by quantity: low to high", () => {
    sampleSweets.forEach((s) => sweetShop.addSweet(s));

    const result = sweetShop.sortSweets("QUANTITY_LOW_TO_HIGH");

    const quantities = result.map((s) => s.quantity);
    expect(quantities).toEqual([5, 8, 15]);
  });

  test("sort by quantity: high to low", () => {
    sampleSweets.forEach((s) => sweetShop.addSweet(s));

    const result = sweetShop.sortSweets("QUANTITY_HIGH_TO_LOW");

    const quantities = result.map((s) => s.quantity);
    expect(quantities).toEqual([15, 8, 5]);
  });

  test("returns unsorted array if sort condition is unknown", () => {
    sampleSweets.forEach((s) => sweetShop.addSweet(s));
    const result = sweetShop.sortSweets("UNKNOWN");

    expect(result).toEqual(expect.any(Array));
    expect(result).toHaveLength(3); // still returns all sweets
  });
});
