import { ValueObject } from "../value-object";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";

export class UUID extends ValueObject {
  readonly id: string;

  constructor(id?: string) {
    super();
    this.id = id || uuidv4();
    this.validate(this.id);
  }

  private validate(id?: string) {
    const isValid = uuidValidate(id);
    if (!isValid) {
      throw new InvalidUUIDError();
    }
  }
}

export class InvalidUUIDError extends Error {
  constructor(message?: string) {
    super(message ?? "Invalid UUID");
    this.name = "InvalidUUIDError";
  }
}
