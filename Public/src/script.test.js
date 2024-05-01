const createObject = require("../src/create");

describe("createObject", () => {
  test("should create an object with the provided values", () => {
    const name = "John";
    const surname = "Doe";
    const price = 234234234;
    const residence = "3 rooms";
    const city = "City";

    const result = createObject(name, surname, price, residence, city);

    expect(result).toEqual({
      name: "John",
      surname: "Doe",
      price: 234234234,
      residence: "3 rooms",
      city: "City",
    });
  });
});
