import { Chance } from "chance";
import { Category } from "../category.entity";
import { CategoryFakeBuilder } from "../category-fake.builder";
import { UUIDCustom } from "../../../shared/domain/value-objects/uuid.vo";

describe("CategoryFakeBuilder Unit Tests", () => {
  describe("oneCategory method", () => {
    test("should create a CategoryFakeBuilder instance", () => {
      const builder = CategoryFakeBuilder.oneCategory();
      expect(builder).toBeInstanceOf(CategoryFakeBuilder);
    });

    test("should build a single category with default values", () => {
      const category = CategoryFakeBuilder.oneCategory().build();

      expect(category).toBeInstanceOf(Category);
      expect(category.categoryId).toBeInstanceOf(UUIDCustom);
      expect(typeof category.name).toBe("string");
      expect(category.name.length).toBeGreaterThan(0);
      expect(typeof category.description).toBe("string");
      expect(category.description.length).toBeGreaterThan(0);
      expect(category.isActive).toBe(true);
      expect(category.createdAt).toBeInstanceOf(Date);
    });

    test("should build category with custom name", () => {
      const customName = "Custom Movie Category";
      const category = CategoryFakeBuilder.oneCategory()
        .withName(customName)
        .build();

      expect(category.name).toBe(customName);
    });

    test("should build category with custom description", () => {
      const customDescription = "Custom description for testing";
      const category = CategoryFakeBuilder.oneCategory()
        .withDescription(customDescription)
        .build();

      expect(category.description).toBe(customDescription);
    });

    test("should build category with null description", () => {
      const category = CategoryFakeBuilder.oneCategory()
        .withDescription(null)
        .build();

      expect(category.description).toBeNull();
    });

    test("should build category with custom UUID", () => {
      const customUUID = new UUIDCustom();
      const category = CategoryFakeBuilder.oneCategory()
        .withUUIDCustom(customUUID)
        .build();

      expect(category.categoryId).toBe(customUUID);
    });

    test("should build category with custom createdAt", () => {
      const customDate = new Date("2023-01-01");
      const category = CategoryFakeBuilder.oneCategory()
        .withCreatedAt(customDate)
        .build();

      expect(category.createdAt).toBe(customDate);
    });

    test("should build activated category", () => {
      const category = CategoryFakeBuilder.oneCategory().activate().build();

      expect(category.isActive).toBe(true);
    });

    test("should build deactivated category", () => {
      const category = CategoryFakeBuilder.oneCategory().deactivate().build();

      expect(category.isActive).toBe(false);
    });

    test("should build category with invalid name too long", () => {
      const category = CategoryFakeBuilder.oneCategory()
        .withInvalidNameTooLong()
        .build();

      expect(category.name.length).toBe(256);
    });

    test("should build category with custom invalid name", () => {
      const customInvalidName = "a".repeat(300);
      const category = CategoryFakeBuilder.oneCategory()
        .withInvalidNameTooLong(customInvalidName)
        .build();

      expect(category.name).toBe(customInvalidName);
    });
  });

  describe("manyCategories method", () => {
    test("should create a CategoryFakeBuilder instance for multiple categories", () => {
      const builder = CategoryFakeBuilder.manyCategories(3);
      expect(builder).toBeInstanceOf(CategoryFakeBuilder);
    });

    test("should build multiple categories with default values", () => {
      const categories = CategoryFakeBuilder.manyCategories(3).build();

      expect(Array.isArray(categories)).toBe(true);
      expect(categories).toHaveLength(3);

      categories.forEach((category) => {
        expect(category).toBeInstanceOf(Category);
        expect(category.categoryId).toBeInstanceOf(UUIDCustom);
        expect(typeof category.name).toBe("string");
        expect(category.name.length).toBeGreaterThan(0);
        expect(typeof category.description).toBe("string");
        expect(category.description.length).toBeGreaterThan(0);
        expect(category.isActive).toBe(true);
        expect(category.createdAt).toBeInstanceOf(Date);
      });
    });

    test("should build multiple categories with different values using factory functions", () => {
      const categories = CategoryFakeBuilder.manyCategories(3)
        .withName((index) => `Category ${index}`)
        .withDescription((index) => `Description ${index}`)
        .build();

      expect(categories).toHaveLength(3);

      categories.forEach((category, index) => {
        expect(category.name).toBe(`Category ${index}`);
        expect(category.description).toBe(`Description ${index}`);
      });
    });

    test("should build multiple categories with same custom values", () => {
      const customName = "Same Name";
      const customDescription = "Same Description";

      const categories = CategoryFakeBuilder.manyCategories(2)
        .withName(customName)
        .withDescription(customDescription)
        .build();

      expect(categories).toHaveLength(2);

      categories.forEach((category) => {
        expect(category.name).toBe(customName);
        expect(category.description).toBe(customDescription);
      });
    });
  });

  describe("factory functions", () => {
    test("should apply factory function for name", () => {
      const categories = CategoryFakeBuilder.manyCategories(3)
        .withName((index) => `Generated Name ${index + 1}`)
        .build();

      expect(categories[0].name).toBe("Generated Name 1");
      expect(categories[1].name).toBe("Generated Name 2");
      expect(categories[2].name).toBe("Generated Name 3");
    });

    test("should apply factory function for description", () => {
      const categories = CategoryFakeBuilder.manyCategories(2)
        .withDescription((index) =>
          index % 2 === 0 ? "Even description" : "Odd description"
        )
        .build();

      expect(categories[0].description).toBe("Even description");
      expect(categories[1].description).toBe("Odd description");
    });

    test("should apply factory function for isActive", () => {
      const categories = CategoryFakeBuilder.manyCategories(3)
        .withName("Test")
        .withDescription("Test description")
        .build();

      // By default, all should be active
      categories.forEach((category) => {
        expect(category.isActive).toBe(true);
      });
    });

    test("should apply factory function for UUID", () => {
      const uuids = [new UUIDCustom(), new UUIDCustom()];
      const categories = CategoryFakeBuilder.manyCategories(2)
        .withUUIDCustom((index) => uuids[index])
        .build();

      expect(categories[0].categoryId).toBe(uuids[0]);
      expect(categories[1].categoryId).toBe(uuids[1]);
    });

    test("should apply factory function for createdAt", () => {
      const dates = [new Date("2023-01-01"), new Date("2023-01-02")];
      const categories = CategoryFakeBuilder.manyCategories(2)
        .withCreatedAt((index) => dates[index])
        .build();

      expect(categories[0].createdAt).toBe(dates[0]);
      expect(categories[1].createdAt).toBe(dates[1]);
    });
  });

  describe("getters", () => {
    test("should get name value", () => {
      const customName = "Custom Name";
      const builder = CategoryFakeBuilder.oneCategory().withName(customName);

      expect(builder.name).toBe(customName);
    });

    test("should get description value", () => {
      const customDescription = "Custom Description";
      const builder =
        CategoryFakeBuilder.oneCategory().withDescription(customDescription);

      expect(builder.description).toBe(customDescription);
    });

    test("should get isActive value when activated", () => {
      const builder = CategoryFakeBuilder.oneCategory().activate();

      expect(builder.isActive).toBe(true);
    });

    test("should get isActive value when deactivated", () => {
      const builder = CategoryFakeBuilder.oneCategory().deactivate();

      expect(builder.isActive).toBe(false);
    });

    test("should get categoryId value", () => {
      const customUUID = new UUIDCustom();
      const builder =
        CategoryFakeBuilder.oneCategory().withUUIDCustom(customUUID);

      expect(builder.categoryId).toBe(customUUID);
    });

    test("should get createdAt value", () => {
      const customDate = new Date("2023-01-01");
      const builder =
        CategoryFakeBuilder.oneCategory().withCreatedAt(customDate);

      expect(builder.createdAt).toBe(customDate);
    });

    test("should throw error when trying to get categoryId without setting it", () => {
      const builder = CategoryFakeBuilder.oneCategory();

      expect(() => builder.categoryId).toThrow(
        "Property categoryId not have a factory, use 'with' methods"
      );
    });

    test("should throw error when trying to get createdAt without setting it", () => {
      const builder = CategoryFakeBuilder.oneCategory();

      expect(() => builder.createdAt).toThrow(
        "Property createdAt not have a factory, use 'with' methods"
      );
    });
  });

  describe("method chaining", () => {
    test("should allow method chaining", () => {
      const customUUID = new UUIDCustom();
      const customDate = new Date("2023-01-01");

      const category = CategoryFakeBuilder.oneCategory()
        .withUUIDCustom(customUUID)
        .withName("Chained Name")
        .withDescription("Chained Description")
        .activate()
        .withCreatedAt(customDate)
        .build();

      expect(category.categoryId).toBe(customUUID);
      expect(category.name).toBe("Chained Name");
      expect(category.description).toBe("Chained Description");
      expect(category.isActive).toBe(true);
      expect(category.createdAt).toBe(customDate);
    });

    test("should allow overriding isActive state", () => {
      const category = CategoryFakeBuilder.oneCategory()
        .activate()
        .deactivate()
        .build();

      expect(category.isActive).toBe(false);
    });
  });

  describe("random generation", () => {
    test("should generate different names for multiple builds", () => {
      const category1 = CategoryFakeBuilder.oneCategory().build();
      const category2 = CategoryFakeBuilder.oneCategory().build();

      // Names should be different (very high probability)
      expect(category1.name).not.toBe(category2.name);
    });

    test("should generate different descriptions for multiple builds", () => {
      const category1 = CategoryFakeBuilder.oneCategory().build();
      const category2 = CategoryFakeBuilder.oneCategory().build();

      // Descriptions should be different (very high probability)
      expect(category1.description).not.toBe(category2.description);
    });

    test("should generate different UUIDs for multiple builds", () => {
      const category1 = CategoryFakeBuilder.oneCategory().build();
      const category2 = CategoryFakeBuilder.oneCategory().build();

      expect(category1.categoryId.id).not.toBe(category2.categoryId.id);
    });
    it("should throw error when any with methods is called", () => {
      const builder = CategoryFakeBuilder.oneCategory();
      expect(() => builder.categoryId).toThrow(
        "Property categoryId not have a factory, use 'with' methods"
      );
      expect(() => builder.createdAt).toThrow(
        "Property createdAt not have a factory, use 'with' methods"
      );
    });
  });
});
