import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty({message:'title can not be empty.'})
    @IsEmail({},{message: 'title should be string'})
    title:string;

    @IsNotEmpty({message:'title can not be empty.'})
    @IsEmail({},{message: 'title should be string'})
    description:string;
}
