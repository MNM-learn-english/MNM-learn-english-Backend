import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AbstractRepository } from "src/libs/database";
import { LectureDocument } from "./model/lecture.schema";






export class LectureRepository extends AbstractRepository<LectureDocument>{
    constructor(
        @InjectModel(LectureDocument.name) 
        lectureModel: Model<LectureDocument>,
    ){
        super(lectureModel)
    }
}