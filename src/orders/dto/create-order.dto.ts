import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { CreateShippingDto } from "./create-shipping.dto";
import { OrderProductDto } from "./order-product.dto";

export class CreateOrderDto {
    @Type(()=>CreateOrderDto)
    @ValidateNested()
    shippingAddress: CreateShippingDto;

    @Type(()=>OrderProductDto)
    @ValidateNested()
    orderedProducts: OrderProductDto[];
}
