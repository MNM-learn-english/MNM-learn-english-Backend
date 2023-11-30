import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AbstractRepository } from "src/libs/database";
import { CategoryDocument } from "./model/category.schema";






export class CategoryRepository extends AbstractRepository<CategoryDocument>{
    constructor(
        @InjectModel(CategoryDocument.name) 
        categoryModel: Model<CategoryDocument>,
    ){
        super(categoryModel)
    }
}