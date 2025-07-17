const { sweetShop } = require("../src/sweetShop");

describe("Add Sweet", () => {
  beforeEach(() => {
    sweetShop.reset(); // Ensures clean state before each test
  });

  test("should add a sweet with valid fields", () => {
    const sweet = {
      id: 1,
      name: "Kaju Katli",
      category: "Dry Fruit",
      price: 50,
      quantity: 20,
    };

    sweetShop.addSweet(sweet);
    const sweets = sweetShop.getAllSweets();

    expect(sweets).toHaveLength(1);
    expect(sweets[0]).toMatchObject(sweet);
  });

  test("should throw error for duplicate ID", () => {
    const sweet = {
      id: 1,
      name: "Rasgulla",
      category: "Milk",
      price: 30,
      quantity: 15,
    };

    sweetShop.addSweet(sweet);
    expect(() => sweetShop.addSweet(sweet)).toThrow(
      "Sweet with this ID already exists"
    );
  });

  test("should throw error if ID is not a number", () => {
    const sweet = {
      id: "abc",
      name: "Jalebi",
      category: "Fried",
      price: 20,
      quantity: 10,
    };

    expect(() => sweetShop.addSweet(sweet)).toThrow("ID must be a number");
  });

  test("should throw error if name is empty or not a string", () => {
    const sweet1 = {
      id: 2,
      name: "",
      category: "Fried",
      price: 10,
      quantity: 5,
    };
    const sweet2 = {
      id: 3,
      name: 123,
      category: "Candy",
      price: 10,
      quantity: 5,
    };

    expect(() => sweetShop.addSweet(sweet1)).toThrow("Name is required");
    expect(() => sweetShop.addSweet(sweet2)).toThrow("Name is required");
  });

  test("should throw error if category is empty or not a string", () => {
    const sweet1 = {
      id: 4,
      name: "Peda",
      category: "",
      price: 10,
      quantity: 5,
    };
    const sweet2 = {
      id: 5,
      name: "Peda",
      category: 123,
      price: 10,
      quantity: 5,
    };

    expect(() => sweetShop.addSweet(sweet1)).toThrow("Category is required");
    expect(() => sweetShop.addSweet(sweet2)).toThrow("Category is required");
  });

  test("should throw error if price is negative or not a number", () => {
    const sweet1 = {
      id: 6,
      name: "Barfi",
      category: "Milk",
      price: -5,
      quantity: 5,
    };
    const sweet2 = {
      id: 7,
      name: "Barfi",
      category: "Milk",
      price: "free",
      quantity: 5,
    };

    expect(() => sweetShop.addSweet(sweet1)).toThrow("Invalid price");
    expect(() => sweetShop.addSweet(sweet2)).toThrow("Invalid price");
  });

  test("should throw error if quantity is negative or not a number", () => {
    const sweet1 = {
      id: 8,
      name: "Ladoo",
      category: "Gram",
      price: 10,
      quantity: -1,
    };
    const sweet2 = {
      id: 9,
      name: "Ladoo",
      category: "Gram",
      price: 10,
      quantity: "ten",
    };

    expect(() => sweetShop.addSweet(sweet1)).toThrow("Invalid quantity");
    expect(() => sweetShop.addSweet(sweet2)).toThrow("Invalid quantity");
  });

  test("should allow adding multiple sweets with different IDs", () => {
    const sweet1 = {
      id: 10,
      name: "Halwa",
      category: "Wheat",
      price: 20,
      quantity: 10,
    };
    const sweet2 = {
      id: 11,
      name: "Imarti",
      category: "Fried",
      price: 15,
      quantity: 7,
    };

    sweetShop.addSweet(sweet1);
    sweetShop.addSweet(sweet2);

    const sweets = sweetShop.getAllSweets();
    expect(sweets).toHaveLength(2);
  });

  test("should not mutate input object", () => {
    const sweet = {
      id: 12,
      name: "Chikki",
      category: "Peanut",
      price: 25,
      quantity: 10,
    };

    const original = { ...sweet };
    sweetShop.addSweet(sweet);
    expect(sweet).toEqual(original);
  });
});
