import { Schema, Prop } from "@nestjs/mongoose";
import { Transform } from "class-transformer";
import { SchemaTypes, Types } from "mongoose";


@Schema()
export class AbstractDocument{
    @Prop({type: SchemaTypes.ObjectId})
    // @ts-ignore
    @Transform((_, from: any) => from._id, { toClassOnly: true })
    _id: Types.ObjectId

}