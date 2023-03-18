import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Category } from "src/category/entities/category.entity";
import { Lecture } from "src/lecture/entities/lecture.entity";
import { UserLevelEnum } from "src/user/dto/user-level-interface";
import { VocabStatus } from "../dto/vocab-status-enum";
import { VocabTypeEnum } from "../dto/vocab-type-enum";



export type vocabularyDocument = HydratedDocument<Vocabulary>

@Schema()
export class Vocabulary {
    @Prop()
    title: string;

    @Prop()
    pronounce: string;

    @Prop()
    type: VocabTypeEnum;

    @Prop()
    meaning: string;

    @Prop()
    translationFa: string;

    @Prop()
    avatar: string;

    @Prop()
    example: string;

    @Prop({enum: UserLevelEnum})
    level: UserLevelEnum

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Lecture"})
    lecture: Lecture

    @Prop([{type: mongoose.Schema.Types.ObjectId, ref: "Category"}])
    category: Category[]

}


export const VocabularySchema = SchemaFactory.createForClass(Vocabulary)