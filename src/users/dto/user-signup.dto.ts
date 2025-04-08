import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'
import { UserSigninDto } from './user-signin.dto';

export class UserSignUpDto extends UserSigninDto {
    @IsNotEmpty({ message: 'name can not be null' })
    @IsString({ message: 'name can not be empty' })
    name: string;

    
}