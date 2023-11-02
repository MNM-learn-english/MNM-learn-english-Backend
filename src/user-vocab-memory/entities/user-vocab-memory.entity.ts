import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Category } from "src/category/entities/category.entity";
import { Lecture } from "src/lecture/entities/lecture.entity";
import { User } from "src/user/entities/user.entity";
import { VocabStatus } from "src/vocabulary/dto/vocab-status-enum";
import { Vocabulary } from "src/vocabulary/entities/vocabulary.entity";


export type userVocabMermoryDocument = HydratedDocument<UserVocabMemory>

@Schema()
export class UserVocabMemory {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User"})
    user: User;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Vocabulary"})
    vocabulary: Vocabulary;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Lecture"})
    lecture: Lecture;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Category"})
    category: Category;

    @Prop({enum:VocabStatus, default: VocabStatus.new})
    status: VocabStatus;

    @Prop({default: Date.now()})
    lastReview: Date;

    @Prop({default: 0})
    correctAnswer: number;

}


export const UserVocabMemorySchema = SchemaFactory.createForClass(UserVocabMemory)