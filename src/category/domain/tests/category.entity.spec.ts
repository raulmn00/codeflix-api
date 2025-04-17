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

    test("should change a category name", () => {
      const category = new Category({
        name: "Movie",
        description: "Movie Description",
        isActive: true,
      });

      category.changeName("New Name");

      expect(category.name).toBe("New Name");
      expect(category.createdAt).toBeInstanceOf(Date);
      expect(category.categoryId).toBeUndefined();
      expect(category.description).toBe("Movie Description");
      expect(category.isActive).toBeTruthy();
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
      expect(category.categoryId).toBeUndefined();
      expect(category.name).toBe("Movie");
      expect(category.isActive).toBeTruthy();
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
      expect(category.categoryId).toBeUndefined();
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
      expect(category.categoryId).toBeUndefined();
      expect(category.description).toBe("Movie Description");
      expect(category.name).toBe("Movie");
    });
  });
});
