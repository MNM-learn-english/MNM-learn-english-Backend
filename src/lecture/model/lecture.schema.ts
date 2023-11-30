import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "src/libs/database";
import { UserLevelEnum } from "src/user/dto/user-level-interface";


@Schema({timestamps: true})
export class LectureDocument extends AbstractDocument {
    @Prop()
    title: string;

    @Prop({enum: UserLevelEnum, require:true})
    level: UserLevelEnum;

    @Prop()
    description: string;

    @Prop()
    avatar: string;
};


export const LectureSchema = SchemaFactory.createForClass(LectureDocument);

