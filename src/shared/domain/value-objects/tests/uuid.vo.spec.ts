import { validate } from "uuid";
import { InvalidUUIDError, UUID } from "../uuid.vo";

describe("UUID Value Object Unit Tests", () => {
  const validateSpy = jest.spyOn(UUID.prototype as any, "validate");

  it("should throw error when uuid is invalid", () => {
    expect(() => {
      new UUID("invalid-uuid");
    }).toThrow(InvalidUUIDError);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it("should create a valid uuid", () => {
    const uuid = new UUID();
    expect(uuid.id).toBeDefined();
    expect(uuid.id).not.toBeNull();
    expect(validate(uuid.id)).toBe(true);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it("should create a valid uuid when provided", () => {
    const uuid = new UUID("123e4567-e89b-12d3-a456-426614174000");
    expect(uuid.id).toBe("123e4567-e89b-12d3-a456-426614174000");
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});
