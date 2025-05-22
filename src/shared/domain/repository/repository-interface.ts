import { Entity } from "../entity";
import { ValueObject } from "../value-object";

export interface IRepository<E extends Entity, EntityId extends ValueObject> {
  findAll(): Promise<E[]>;
  findById(id: EntityId): Promise<E | null>;
  create(entity: E): Promise<void>;
  createMany(entities: E[]): Promise<void>;
  update(entity: E): Promise<void>;
  delete(id: EntityId): Promise<void>;


  getEntity(): new (...args: any[]) => E;
}