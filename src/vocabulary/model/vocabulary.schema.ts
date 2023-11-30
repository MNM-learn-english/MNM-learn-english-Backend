import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { UserLevelEnum } from "src/user/dto/user-level-interface";
import { VocabTypeEnum } from "../dto/vocab-type-enum";
import { AbstractDocument } from "src/libs/database";
import { LectureDocument } from "src/lecture/model/lecture.schema";
import { CategoryDocument } from "src/category/model/category.schema";




@Schema({timestamps: true})
export class VocabularyDocument extends AbstractDocument {
    @Prop()
    title: string;

    @Prop({type: Boolean, default: false})
    isParent?: boolean;

    @Prop()
    pronounce: string;

    @Prop({type: String, enum: VocabTypeEnum})
    type: VocabTypeEnum;

    @Prop()
    meaning: string;

    @Prop()
    translationFa: string;

    @Prop()
    avatar: string;

    @Prop()
    example: String;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: LectureDocument.name})
    lecture: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: CategoryDocument.name})
    category: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: VocabularyDocument.name})
    parent: string;

}


export const VocabularySchema = SchemaFactory.createForClass(VocabularyDocument)


VocabularySchema.index({
    title: 1,
    type: 1
},{
    unique: true
})