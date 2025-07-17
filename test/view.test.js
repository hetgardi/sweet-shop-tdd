const { sweetShop } = require("../src/sweetShop");

describe("View Sweets", () => {
  beforeEach(() => {
    sweetShop.reset();
  });

  test("returns all sweets currently in the store", () => {
    const sweets = [
      {
        id: 1,
        name: "Kaju Katli",
        category: "Dry Fruit",
        price: 50,
        quantity: 10,
      },
      { id: 2, name: "Peda", category: "Milk-Based", price: 25, quantity: 15 },
    ];

    sweets.forEach((sweet) => sweetShop.addSweet(sweet));

    const result = sweetShop.getAllSweets();
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("Kaju Katli");
    expect(result[1].name).toBe("Peda");
  });

  test("returns empty array when no sweets are present", () => {
    const result = sweetShop.getAllSweets();
    expect(result).toEqual([]);
  });
});
