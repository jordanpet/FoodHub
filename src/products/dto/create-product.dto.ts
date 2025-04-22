import { IsArray, isArray, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty({message:'title can not be empty'})
    @IsString()
    title:string;

    @IsNotEmpty({message:'description can not be empty'})
    @IsString()
    description:string;

    @IsNotEmpty({message:' price can not be empty'})
    @IsNumber({maxDecimalPlaces:2},{message:'price should be a number & max decimal precission 2'})
    @IsPositive({message: 'price should be positive number'})
    price:number;

    @IsNotEmpty({message:'image should not be empty'})
    @IsArray({message:'immage should be in array format'})
    image:string[];


    @IsNotEmpty({message:'category should not be empty'})
    @IsNumber({},{message:'category id should be a number'})
    categoryId:number
}
