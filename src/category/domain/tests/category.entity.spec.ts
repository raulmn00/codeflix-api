import { EntityValidationError } from "../../../shared/domain/validators/validation-error";
import { UUIDCustom } from "../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../category.entity";

// TRIPLE AAA - Arrange, Act, Assert

describe("Category Entity Unit Tests", () => {
  let validateSpy: any;
  beforeEach(() => {
    validateSpy = jest.spyOn(Category, "validate");
  });
  describe("constructor with default values", () => {
    test("should test the constructor", () => {
      const category = new Category({
        name: "Movie",
        description: "Movie Description",
        is_active: true,
      });

      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie Description");
      expect(category.is_active).toBe(true);
      expect(category.created_at).toBeInstanceOf(Date);
      expect(category.category_id).toBeInstanceOf(UUIDCustom);
    });

    test("should test the constructor with default values", () => {
      const category = new Category({
        category_id: new UUIDCustom(),
        name: "Movie 123",
        description: "Movie Description 123",
        is_active: false,
        created_at: new Date(),
      });

      expect(category.name).toBe("Movie 123");
      expect(category.description).toBe("Movie Description 123");
      expect(category.is_active).toBeFalsy();
      expect(category.created_at).toBeInstanceOf(Date);
      expect(category.category_id).toBeInstanceOf(UUIDCustom);
    });

    test("should change a category name", () => {
      const category = new Category({
        category_id: new UUIDCustom(),
        name: "Movie",
        description: "Movie Description",
        is_active: true,
      });

      category.changeName("New Name");

      expect(category.name).toBe("New Name");
      expect(category.created_at).toBeInstanceOf(Date);
      expect(category.category_id).toBeInstanceOf(UUIDCustom);
      expect(category.description).toBe("Movie Description");
      expect(category.is_active).toBeTruthy();
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test("should change a category description", () => {
      const category = new Category({
        category_id: new UUIDCustom(),
        name: "Movie",
        description: "Movie Description",
        is_active: true,
      });

      category.changeDescription("New Description");

      expect(category.description).toBe("New Description");
      expect(category.created_at).toBeInstanceOf(Date);
      expect(category.category_id).toBeInstanceOf(UUIDCustom);
      expect(category.name).toBe("Movie");
      expect(category.is_active).toBeTruthy();
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test("should activate a category", () => {
      const category = new Category({
        name: "Movie",
        description: "Movie Description",
        is_active: false,
      });

      category.activate();

      expect(category.is_active).toBe(true);
      expect(category.created_at).toBeInstanceOf(Date);
      expect(category.category_id).toBeInstanceOf(UUIDCustom);
      expect(category.description).toBe("Movie Description");
      expect(category.name).toBe("Movie");
    });

    test("should deactivate a category", () => {
      const category = new Category({
        name: "Movie",
        description: "Movie Description",
        is_active: true,
      });

      category.deactivate();

      expect(category.is_active).toBeFalsy();
      expect(category.created_at).toBeInstanceOf(Date);
      expect(category.category_id).toBeInstanceOf(UUIDCustom);
      expect(category.description).toBe("Movie Description");
      expect(category.name).toBe("Movie");
    });
  });

  describe("category_id field", () => {
    const arrange = [
      { category_id: null },
      { category_id: undefined },
      { category_id: new UUIDCustom() },
    ];

    test.each(arrange)("id = %j", ({ category_id }) => {
      const category = new Category({
        category_id: category_id as any,
        name: "Movie",
        description: "Movie Description",
        is_active: true,
      });

      expect(category.category_id).toBeInstanceOf(UUIDCustom);

      if (category_id instanceof UUIDCustom) {
        expect(category.category_id).toBe(category_id);
      }
    });
  });
});

describe("Category Validator", () => {
  describe("create command", () => {
    // maneira nao convencional de fazer
    it("should validate create command", () => {
      expect(() => {
        Category.create({
          name: null,
        });
      }).toThrow(
        new EntityValidationError({
          name: ["name should not be empty"],
        })
      );
    });

    it("should validate create command", () => {
      expect(() => {
        Category.create({
          name: "",
        });
      }).toThrow(
        new EntityValidationError({
          name: ["name should not be empty"],
          description: ["description should not be empty"],
        })
      );
    });

    it("should an invalid category with name property", () => {
      expect(() => Category.create({ name: null })).constainsMessagesError({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });
    });

    it("should an invalid category with name property", () => {
      expect(() => Category.create({ name: "" })).constainsMessagesError({
        name: ["name should not be empty"],
      });
    });

    it("should an invalid category with name property", () => {
      expect(() => Category.create({ name: 5 as any })).constainsMessagesError({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });
    });

    it("should an invalid category with name property", () => {
      expect(() =>
        Category.create({ name: "t".repeat(256) })
      ).constainsMessagesError({
        name: ["name must be shorter than or equal to 255 characters"],
      });
    });

    it("should an invalid category with description property", () => {
      expect(() =>
        Category.create({ name: "teste", description: 5 as any })
      ).constainsMessagesError({
        description: ["description must be a string"],
      });
    });

    it("should an invalid category with description property", () => {
      expect(() =>
        Category.create({ name: "teste", is_active: 5 as any })
      ).constainsMessagesError({
        is_active: ["is_active must be a boolean value"],
      });
    });

    it("should an invalid change category name", () => {
      const category = Category.create({ name: "teste" });
      expect(() => category.changeName(5 as any)).constainsMessagesError({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });
    });

    it("should an invalid change category name", () => {
      const category = Category.create({ name: "teste" });
      expect(() => category.changeName("t".repeat(256))).constainsMessagesError(
        {
          name: ["name must be shorter than or equal to 255 characters"],
        }
      );
    });
  });
});
