import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";


export function Serialize(dto: any){
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any){}
    intercept(
        context: ExecutionContext,
        handler: CallHandler,
    ): Observable<any> {
        return handler.handle().pipe(map(data => {
            if(!!data.data){
                return plainToClass(this.dto, data.data, {
                    excludeExtraneousValues: true
                })
            }else{
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true
                })
            }
        }));
    }
}