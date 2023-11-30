import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { LectureDocument } from "src/lecture/model/lecture.schema";
import { AbstractDocument } from "src/libs/database";
import { UserLevelEnum } from "src/user/dto/user-level-interface";



@Schema({timestamps: true})
export class CategoryDocument extends AbstractDocument {
    @Prop()
    title: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: LectureDocument.name})
    lecture: string;
};


export const CategorySchema = SchemaFactory.createForClass(CategoryDocument);