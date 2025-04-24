import { IsNotEmpty, IsPhoneNumber, IsString} from 'class-validator'
import { UserSigninDto } from './user-signin.dto';

export class UserSignUpDto extends UserSigninDto {
    @IsNotEmpty({ message: 'name can not be null' })
    @IsString({ message: 'name can not be empty' })
    name: string;
   
    @IsNotEmpty({ message: 'phone can not be empty' })
    @IsPhoneNumber(null, { message: 'please provide a valid phone number' })
    phone: string;
}