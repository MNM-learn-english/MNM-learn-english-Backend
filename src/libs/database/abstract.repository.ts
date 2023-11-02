import { FilterQuery, Model, PipelineStage, PopulateOptions, Types, UpdateQuery } from "mongoose";
import { AbstractDocument } from "./abstract.schema"
import { Logger, NotFoundException, BadRequestException } from "@nestjs/common";
import { IPagination } from "./inerface"






export abstract class AbstractRepository<TDocument extends AbstractDocument>{

    constructor(
        protected readonly model: Model<TDocument>
        ){}

    async create(document: Omit<TDocument, '_id'>): Promise<TDocument>{
        const createdDocument = new this.model({...document, _id: new Types.ObjectId()})
        try{
            const newDocument = await createdDocument.save();
            return newDocument.toJSON() as unknown as TDocument;
        }catch(err){
            console.log(err)
            if(err.code === 11000){
                throw new BadRequestException("duplicate error")
            }else{
                console.log("********************")
                console.log(err)
                throw new BadRequestException("Bad Request")
            }
        }
    }
    async findOne(filterQuery: FilterQuery<TDocument>, popOptions?: PopulateOptions[], fields?: string[]): Promise<TDocument>{
        return await this.model.findOne(filterQuery, {}, {lean: true})
                                            .populate(popOptions)
                                            .select(fields) as TDocument;
    }

    async findOneAndUpdate(
        filterQuery: FilterQuery<TDocument>, 
        update: UpdateQuery<TDocument>,
        popOptions?: PopulateOptions[], 
        fields?: string[]
        ): Promise<TDocument>{
            const document = await this.model.findOneAndUpdate(filterQuery, update, {
                lean: true,
                new: true
            })
            .populate(popOptions)
            .select(fields) as TDocument;
            if(!document){
                throw new NotFoundException('Not found')
            }
        return document
    }

    async findWithOutPaginationData(filterQuery: FilterQuery<TDocument>, popOptions?: PopulateOptions[], fields?: string[]): Promise<TDocument[]>{
        let sortBy = filterQuery?.sort?.split(',')?.join(' ') || "-createdAt";
        if(filterQuery){
            const excludedFields = ['page', 'sort', 'limit', 'fields'];
            excludedFields.forEach((el) => delete filterQuery[el]);
        }

        let queryStr = JSON.stringify(filterQuery);

        queryStr = queryStr.replace(
          /\b(gte|gt|lte|lt|regex)\b/g,
          (match) => `$${match}`
        );

        return await this.model.find(JSON.parse(queryStr), {}, {lean: true})
            .select(fields)
            .sort(sortBy)
            .populate(popOptions);
    }

    async find(filterQuery: FilterQuery<TDocument>, popOptions?: PopulateOptions[], fields?: string[]): Promise<{data: TDocument[], pagination: IPagination}>{
        // extract sort
        let sortBy = filterQuery?.sort?.split(',')?.join(' ') || "-createdAt";
        // extract page and limit
        const page = filterQuery?.page * 1 || 1;
        const limit = filterQuery?.limit * 1 || 10;
        const skip = (page-1) * limit;

        // remove extra fields
        if(filterQuery){
            const excludedFields = ['page', 'sort', 'limit', 'fields'];
            excludedFields.forEach((el) => delete filterQuery[el]);
        }

        let queryStr = JSON.stringify(filterQuery);

        queryStr = queryStr.replace(
          /\b(gte|gt|lte|lt|regex)\b/g,
          (match) => `$${match}`
        );
        // handle pagination data
        const totalDocs = await this.model.count(JSON.parse(queryStr));

        console.log("queryStr", JSON.parse(queryStr))
        return{
            data: await this.model.find(JSON.parse(queryStr), {},{lean: true})
                .sort(sortBy)
                .limit(limit)
                .select(fields)
                .skip(skip)
                .populate(popOptions),
                pagination:{
                    hasNextPage: totalDocs > (skip+limit),
                    hasPrevPage: page > 1 ,
                    limit,
                    nextPage: totalDocs > (skip+limit) ? page + 1 : null,
                    page,
                    totalDocs,
                    totalPages: Math.ceil(totalDocs/limit)
                }

        } 
    }


    async generatePaginationData(filterQuery: FilterQuery<TDocument>){
        const page = filterQuery?.page * 1 || 1;
        const limit = filterQuery?.limit * 1 || 10;
        const skip = (page-1) * limit;
        // remove extra fields
        if(filterQuery){
            const excludedFields = ['page', 'sort', 'limit', 'fields'];
            excludedFields.forEach((el) => delete filterQuery[el]);
        }
        const totalDocs = await this.model.count(filterQuery);
        return {
            hasNextPage: totalDocs > (skip+limit),
            hasPrevPage: page > 1 ,
            limit,
            nextPage: totalDocs > (skip+limit) ? page + 1 : null,
            page,
            totalDocs,
            totalPages: Math.ceil(totalDocs/limit)
        }
    }

    async findOneAndDelete(
        filterQuery: FilterQuery<TDocument>,
        popOptions?: PopulateOptions[]
    ){
        const document = await this.model.findOneAndDelete(filterQuery, {lean: true}).populate(popOptions);
        if(!document){
            throw new NotFoundException('not found')
        }
        return document
    }


    async aggregate(pipeline: PipelineStage[]){
        return await this.model.aggregate(pipeline).allowDiskUse(true);
    }


    async count(filterQuery: FilterQuery<TDocument>){
        return await this.model.count(filterQuery)
    }

    async findManyAndDelete(filterQuery: FilterQuery<TDocument>): Promise<number>{
        const deleteResult = await this.model.deleteMany(filterQuery)
        return deleteResult.deletedCount;
    }


    async distinct(
        field: string,    
        query: FilterQuery<TDocument>,
      ){
        return await this.model.distinct(field, query)
      }
}