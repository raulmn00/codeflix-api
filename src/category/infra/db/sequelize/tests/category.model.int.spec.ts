import { CategoryFakeBuilder } from "../../../../domain/category-fake.builder";
import { CategoryModel } from "../category.model";
import { Sequelize } from "sequelize-typescript";

describe("CategoryModel Integration Tests", () => {
  let sequelize: Sequelize;

  it("should create a category", async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      models: [CategoryModel],
    });
    await sequelize.sync({ force: true });

    const category = CategoryFakeBuilder.oneCategory().build();

    await CategoryModel.create({
      category_id: category.category_id.id,
      name: category.name,
      description: category.description,
      is_active: category.is_active,
      created_at: new Date(),
    });
  });
});
