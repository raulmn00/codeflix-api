import { ClassValidatorFields } from "../../domain/validators/class-validator-fields";
import { EntityValidationError } from "../../domain/validators/validation-error";
import { FieldsErrors } from "../../domain/validators/validator-fields-interface";

type Expected =
  | {
      validator: ClassValidatorFields<any>;
      data: any;
    }
  | (() => any);

expect.extend({
  constainsMessagesError(expect: Expected, received: FieldsErrors) {
    if (typeof expect === "function") {
      try {
        expect();
        return isValid();
      } catch (e) {
        const error = e as EntityValidationError;
        return assertContainsErrorMessages(error.errors, received);
      }
    } else {
      const { validator, data } = expect;
      const validated = validator.validate(data);

      if (validated) {
        return isValid();
      }
      return assertContainsErrorMessages(validator.errors, received);
    }
  },
});

function assertContainsErrorMessages(
  expected: FieldsErrors,
  received: FieldsErrors
) {
  const isMatch = expect.objectContaining(received).asymmetricMatch(expected);

  return isMatch
    ? isValid()
    : {
        pass: false,
        message: () =>
          `The validation errors ${JSON.stringify(
            received
          )} should contain ${JSON.stringify(expected)}`,
      };
}

function isValid() {
  return {
    pass: true,
    message: () => "Valid",
  };
}
