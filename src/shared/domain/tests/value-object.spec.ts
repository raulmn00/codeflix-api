import { ValueObject } from "../value-object";

class StringValueObject extends ValueObject {
  constructor(public readonly value: string) {
    super();
  }
}

class ComplexValueObject extends ValueObject {
  constructor(public readonly value1: string, public readonly value2: number) {
    super();
  }
}

describe("ValueObject Unit Tests", () => {
  it("should be equal", () => {
    const valueObject1 = new StringValueObject("test");
    const valueObject2 = new StringValueObject("test");
    expect(valueObject1.equals(valueObject2)).toBe(true);
  });

  it("should be equal", () => {
    const complexObject = new ComplexValueObject("test", 1);
    const complexObject2 = new ComplexValueObject("test", 1);
    expect(complexObject.equals(complexObject2)).toBe(true);
  });

  it("should not be equal", () => {
    const complexObject = new ComplexValueObject("test", 1);
    const complexObject2 = new ComplexValueObject("test", 2);
    expect(complexObject.equals(complexObject2)).toBe(false);

    const stringValueObject = new StringValueObject("test");
    const stringValueObject2 = new StringValueObject("test2");
    expect(stringValueObject.equals(stringValueObject2)).toBe(false);
  });
});
