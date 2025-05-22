import { ValueObject } from "./value-object";

export abstract class Entity {
  readonly entityId: ValueObject;
  abstract toJSON(): any;
  abstract getEntityId(): ValueObject;
}
