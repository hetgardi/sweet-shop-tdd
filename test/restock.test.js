const {sweetShop} = require("../src/sweetShop");

describe("Restock Sweets", () => {
  beforeEach(() => {
    sweetShop.reset(); // Clear data before each test
  });

  test("increases quantity when restocked with valid amount", () => {
    const sweet = {
      id: 1,
      name: "Rasgulla",
      category: "Milk-Based",
      price: 30,
      quantity: 10,
    };

    sweetShop.addSweet(sweet);
    sweetShop.restockSweet(1, 5);

    const updated = sweetShop.getAllSweets().find((s) => s.id === 1);
    expect(updated.quantity).toBe(15);
  });

  test("throws error if sweet ID does not exist", () => {
    expect(() => sweetShop.restockSweet(999, 10)).toThrow("Sweet not found");
  });

  test("throws error for zero restock amount", () => {
    const sweet = {
      id: 2,
      name: "Kaju Katli",
      category: "Dry Fruit",
      price: 50,
      quantity: 20,
    };

    sweetShop.addSweet(sweet);
    expect(() => sweetShop.restockSweet(2, 0)).toThrow(
      "Invalid restock amount"
    );
  });

  test("throws error for negative restock amount", () => {
    const sweet = {
      id: 3,
      name: "Barfi",
      category: "Milk-Based",
      price: 25,
      quantity: 15,
    };

    sweetShop.addSweet(sweet);
    expect(() => sweetShop.restockSweet(3, -3)).toThrow(
      "Invalid restock amount"
    );
  });

  test("throws error for non-numeric restock amount", () => {
    const sweet = {
      id: 4,
      name: "Peda",
      category: "Milk",
      price: 20,
      quantity: 5,
    };

    sweetShop.addSweet(sweet);
    expect(() => sweetShop.restockSweet(4, "ten")).toThrow(
      "Invalid restock amount"
    );
  });

  test("allows restocking with boundary amount of 1", () => {
    const sweet = {
      id: 5,
      name: "Jalebi",
      category: "Fried",
      price: 15,
      quantity: 9,
    };

    sweetShop.addSweet(sweet);
    sweetShop.restockSweet(5, 1);

    const updated = sweetShop.getAllSweets().find((s) => s.id === 5);
    expect(updated.quantity).toBe(10);
  });

  test("restocks large quantity successfully", () => {
    const sweet = {
      id: 6,
      name: "Imarti",
      category: "Fried",
      price: 18,
      quantity: 5,
    };

    sweetShop.addSweet(sweet);
    sweetShop.restockSweet(6, 1000);

    const updated = sweetShop.getAllSweets().find((s) => s.id === 6);
    expect(updated.quantity).toBe(1005);
  });
});
