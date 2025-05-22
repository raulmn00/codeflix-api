import { Category } from "./category.entity";
import { IRepository } from "../../shared/domain/repository/repository-interface";
import { UUIDCustom } from "../../shared/domain/value-objects/uuid.vo";

export interface ICategoryRepository extends IRepository<Category, UUIDCustom> {
  
}