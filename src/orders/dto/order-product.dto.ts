import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class OrderProductDto{
    @IsNotEmpty({message:'product can not be empty'})
    id:number
    
    @IsNumber({maxDecimalPlaces:2},{message: 'price should be number and max decimal procisssion 2'})
    @IsPositive({message:'Price can not be negative'})
    product_unit_price:number;
     

    @IsNumber({},{message: 'quantity should be number '})
    @IsPositive({message:'quantity can not be negative'})
    product_qauntity:number
}