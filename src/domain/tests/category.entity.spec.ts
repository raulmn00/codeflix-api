import { Category } from "../category.entity";

// TRIPLE AAA - Arrange, Act, Assert

describe("Category Entity Unit Tests", () => {
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
      expect(category.categoryId).not.toBeDefined();
    });

    test("should test the constructor with default values", () => {
      const category = new Category({
        categoryId: "123",
        name: "Movie 123",
        description: "Movie Description 123",
        isActive: false,
        createdAt: new Date(),
      });

      expect(category.name).toBe("Movie 123");
      expect(category.description).toBe("Movie Description 123");
      expect(category.isActive).toBeFalsy();
      expect(category.createdAt).toBeInstanceOf(Date);
      expect(category.categoryId).toBe("123");
    });
  });
});
