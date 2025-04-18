import { FieldsErrors } from "./validator-fields-interface";

export class EntityValidationError extends Error {
  constructor(
    public errors: FieldsErrors,
    public message = "Validation Error"
  ) {
    super(message);
  }

  count() {
    return Object.keys(this.errors).length;
  }
}
