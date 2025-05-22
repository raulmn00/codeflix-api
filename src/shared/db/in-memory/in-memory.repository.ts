import { Entity } from "../../domain/entity";
import { IRepository } from "../../domain/repository/repository-interface";
import { ValueObject } from "../../domain/value-object";
import { NotFoundError } from "../../errors/not-found.error";

export abstract class InMemoryRepository<
  E extends Entity,
  EntityId extends ValueObject
> implements IRepository<E, EntityId>
{
  items: E[] = [];

  async findAll(): Promise<E[]> {
    return this.items;
  }

  async findById(id: EntityId): Promise<E | null> {
    const item = this.items.find((item) => item.entityId.equals(id));
    return typeof item === "undefined" ? null : item;
  }

  async create(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async createMany(entities: E[]): Promise<void> {
    this.items.push(...entities);
  }

  async update(entity: E): Promise<void> {
    const indexFound = this.items.findIndex((item) =>
      item.entityId.equals(entity.entityId)
    );
    if (indexFound === -1) {
      throw new NotFoundError(entity.entityId, this.getEntity());
    }
    this.items[indexFound] = entity;
  }

  async delete(id: EntityId): Promise<void> {
    const indexFound = this.items.findIndex((item) => item.entityId.equals(id));
    if (indexFound === -1) {
      throw new NotFoundError(id, this.getEntity());
    }
    this.items.splice(indexFound, 1);
  }

  abstract getEntity(): new (...args: any[]) => E;
}
