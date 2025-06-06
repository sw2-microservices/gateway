import { IsEnum, IsOptional } from "class-validator";
import { OrderStatus, OrderStatusList } from "../enum/order.enum";
import { PaginationDto } from "src/common";

export class OrderPaginationDto extends PaginationDto {
    @IsOptional ()
    @IsEnum( OrderStatusList, {
        message: `Possible values are: ${OrderStatusList.join(', ')}`,
    })
    status: OrderStatus;
}