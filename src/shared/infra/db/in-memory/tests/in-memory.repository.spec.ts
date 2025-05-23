import { Entity } from "../../../../domain/entity";
import { ValueObject } from "../../../../domain/value-object";
import { UUIDCustom } from "../../../../domain/value-objects/uuid.vo";
import { NotFoundError } from "../../../../errors/not-found.error";
import { InMemoryRepository } from "../in-memory.repository";

type StubEntityConstructor = {
  entityId: UUIDCustom;
  name: string;
  price: number;
};

class StubEntity extends Entity {
  entityId: UUIDCustom;
  name: string;
  price: number;

  constructor(props: StubEntityConstructor) {
    super();
    this.entityId = props.entityId || new UUIDCustom();
    this.name = props.name;
    this.price = props.price;
  }

  getEntityId(): ValueObject {
    return this.entityId;
  }

  toJSON() {
    return {
      id: this.entityId.id,
      name: this.name,
      price: this.price,
    };
  }
}

class StubInMemoryRepository extends InMemoryRepository<
  StubEntity,
  UUIDCustom
> {
  getEntity(): new (...args: any[]) => StubEntity {
    return StubEntity;
  }
}

describe("InMemoryRepository Unit Tests", () => {
  let repository: StubInMemoryRepository;

  beforeEach(() => {
    repository = new StubInMemoryRepository();
  });

  it("should insert a new entity", async () => {
    const entity = new StubEntity({
      entityId: new UUIDCustom(),
      name: "name value",
      price: 1,
    });

    await repository.create(entity);

    expect(repository.items[0]).toStrictEqual(entity);
    expect(repository.items[0].entityId).toStrictEqual(entity.entityId);
    expect(repository.items.length).toBe(1);
  });

  it("should bulk insert entities", async () => {
    const entities = [
      new StubEntity({
        entityId: new UUIDCustom(),
        name: "name value 1",
        price: 1,
      }),
      new StubEntity({
        entityId: new UUIDCustom(),
        name: "name value 2",
        price: 2,
      }),
    ];

    await repository.createMany(entities);

    expect(repository.items[0]).toStrictEqual(entities[0]);
    expect(repository.items[1]).toStrictEqual(entities[1]);
    expect(repository.items.length).toBe(2);
  });

  it("should return all items", async () => {
    const entities = [
      new StubEntity({
        entityId: new UUIDCustom(),
        name: "name value 1",
        price: 1,
      }),
      new StubEntity({
        entityId: new UUIDCustom(),
        name: "name value 2",
        price: 2,
      }),
    ];

    await repository.createMany(entities);

    const items = await repository.findAll();

    expect(items.length).toBe(2);
    expect(items[0]).toStrictEqual(entities[0]);
    expect(items[1]).toStrictEqual(entities[1]);
  });

  it("should update a entity", async () => {
    const entity = new StubEntity({
      entityId: new UUIDCustom(),
      name: "name value",
      price: 1,
    });

    await repository.create(entity);
  });

  it("should throw error when entity not found", async () => {
    const entity = new StubEntity({
      entityId: new UUIDCustom(),
      name: "name value",
      price: 1,
    });

    await expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(entity.entityId, StubEntity)
    );
  });

  it("should throw error when delete entity not found", async () => {
    const uuid = new UUIDCustom();

    await expect(repository.delete(uuid)).rejects.toThrow(
      new NotFoundError(uuid, StubEntity)
    );
  });

  it("should delete a entity", async () => {
    const entity = new StubEntity({
      entityId: new UUIDCustom(),
      name: "name value",
      price: 1,
    });

    await repository.create(entity);

    await repository.delete(entity.entityId);

    expect(repository.items.length).toBe(0);
    expect(repository.items[0]).toBeUndefined();
    expect(repository.items[1]).toBeUndefined();
  });
});
