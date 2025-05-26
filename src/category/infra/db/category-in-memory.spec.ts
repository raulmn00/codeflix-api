import { CategoryFakeBuilder } from "../../domain/category-fake.builder";
import { Category } from "../../domain/category.entity";
import { CategoryInMemoryRepository } from "./category-in-memory.repository";

describe("CategoryInMemoryRepository Unit Tests", () => {
  let repository: CategoryInMemoryRepository;

  beforeEach(() => (repository = new CategoryInMemoryRepository()));

  it("should no filter items when filter param is null", async () => {
    const items = [
      CategoryFakeBuilder.oneCategory().build(),
      CategoryFakeBuilder.oneCategory().build(),
    ];

    const spyFilterMethod = jest.spyOn(items, "filter" as any);

    const itemsFiltered = await repository["applyFilter"](items, null);

    expect(itemsFiltered).toStrictEqual(items);
    expect(spyFilterMethod).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(items);
  });

  it("should filter items using filter param", async () => {
    const items = [
      CategoryFakeBuilder.oneCategory().withName("test").build(),
      CategoryFakeBuilder.oneCategory()
        .withName("TEST")
        .withCreatedAt(new Date())
        .build(),
    ];

    const filterSpy = jest.spyOn(items, "filter");

    const itemsFiltered = await repository["applyFilter"](items, "TEST");

    expect(filterSpy).toHaveBeenCalledTimes(1);
    expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
  });
});
