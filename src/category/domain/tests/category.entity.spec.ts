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
        isActive: true,
      });

      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie Description");
      expect(category.isActive).toBe(true);
      expect(category.createdAt).toBeInstanceOf(Date);
      expect(category.categoryId).toBeInstanceOf(UUIDCustom);
    });

    test("should test the constructor with default values", () => {
      const category = new Category({
        categoryId: new UUIDCustom(),
        name: "Movie 123",
        description: "Movie Description 123",
        isActive: false,
        createdAt: new Date(),
      });

      expect(category.name).toBe("Movie 123");
      expect(category.description).toBe("Movie Description 123");
      expect(category.isActive).toBeFalsy();
      expect(category.createdAt).toBeInstanceOf(Date);
      expect(category.categoryId).toBeInstanceOf(UUIDCustom);
    });

    test("should change a category name", () => {
      const category = new Category({
        name: "Movie",
        description: "Movie Description",
        isActive: true,
      });

      category.changeName("New Name");

      expect(category.name).toBe("New Name");
      expect(category.createdAt).toBeInstanceOf(Date);
      expect(category.categoryId).toBeInstanceOf(UUIDCustom);
      expect(category.description).toBe("Movie Description");
      expect(category.isActive).toBeTruthy();
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test("should change a category description", () => {
      const category = new Category({
        name: "Movie",
        description: "Movie Description",
        isActive: true,
      });

      category.changeDescription("New Description");

      expect(category.description).toBe("New Description");
      expect(category.createdAt).toBeInstanceOf(Date);
      expect(category.categoryId).toBeInstanceOf(UUIDCustom);
      expect(category.name).toBe("Movie");
      expect(category.isActive).toBeTruthy();
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test("should activate a category", () => {
      const category = new Category({
        name: "Movie",
        description: "Movie Description",
        isActive: false,
      });

      category.activate();

      expect(category.isActive).toBe(true);
      expect(category.createdAt).toBeInstanceOf(Date);
      expect(category.categoryId).toBeInstanceOf(UUIDCustom);
      expect(category.description).toBe("Movie Description");
      expect(category.name).toBe("Movie");
    });

    test("should deactivate a category", () => {
      const category = new Category({
        name: "Movie",
        description: "Movie Description",
        isActive: true,
      });

      category.deactivate();

      expect(category.isActive).toBeFalsy();
      expect(category.createdAt).toBeInstanceOf(Date);
      expect(category.categoryId).toBeInstanceOf(UUIDCustom);
      expect(category.description).toBe("Movie Description");
      expect(category.name).toBe("Movie");
    });
  });

  describe("categoryId field", () => {
    const arrange = [
      { categoryId: null },
      { categoryId: undefined },
      { categoryId: new UUIDCustom() },
    ];

    test.each(arrange)("id = %j", ({ categoryId }) => {
      const category = new Category({
        categoryId: categoryId as any,
        name: "Movie",
        description: "Movie Description",
        isActive: true,
      });

      expect(category.categoryId).toBeInstanceOf(UUIDCustom);

      if (categoryId instanceof UUIDCustom) {
        expect(category.categoryId).toBe(categoryId);
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
      expect(() => Category.create({ name: '' })).constainsMessagesError({
        name: [
          "name should not be empty",
        ],
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
      expect(() => Category.create({ name: "t".repeat(256) })).constainsMessagesError({
        name: [
          "name must be shorter than or equal to 255 characters",
        ],
      });
    });

    it("should an invalid category with description property", () => {
      expect(() => Category.create({ name: 'teste', description: 5 as any })).constainsMessagesError({
        description: [
          "description must be a string",
        ],
      });
    });

    it("should an invalid category with description property", () => {
      expect(() => Category.create({ name: 'teste', isActive: 5 as any })).constainsMessagesError({
        isActive: [
          "isActive must be a boolean value",
        ],
      });
    });
  });
});
