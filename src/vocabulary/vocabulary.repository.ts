import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AbstractRepository } from "src/libs/database";
import { VocabularyDocument } from "./model/vocabulary.schema";






export class VocabularyRepository extends AbstractRepository<VocabularyDocument>{
    constructor(
        @InjectModel(VocabularyDocument.name) 
        vocabularyModel: Model<VocabularyDocument>,
    ){
        super(vocabularyModel)
    }
}