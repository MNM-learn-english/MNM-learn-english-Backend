import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    avatar: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);