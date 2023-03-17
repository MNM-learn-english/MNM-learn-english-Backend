import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Category } from "src/category/entities/category.entity";
import { UserLevelEnum } from "src/user/dto/user-level-interface";


@Schema()
export class Lecture {
    @Prop()
    title: string;

    @Prop({enum: UserLevelEnum, require:true})
    level: UserLevelEnum;

    @Prop()
    videos: string[];

    @Prop()
    passage: string;

    @Prop()
    avatar: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Category'})
    category: Category;

}


export const LectureSchema = SchemaFactory.createForClass(Lecture)
