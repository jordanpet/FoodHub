import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSigninDto } from './dto/user-signin.dto';
import { CurrentUser } from 'src/utility/decorator/current_user.decorator';
import { AuthenticationGuard } from 'src/utility/guards/authntication.guard';
import { AuthorizeRoles } from 'src/utility/decorator/authorize-roles.decorator';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';
import { Roles } from 'src/orders/enums/user.role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() userSignUpDto:UserSignUpDto):Promise<{user:UserEntity}> {
    return {user: await this.usersService.signup( userSignUpDto)}
  }

  @Post('signin')
  async signin(@Body() userSignInDto: UserSigninDto):Promise<{accessToken: string;
    user: UserEntity;}>{
    const user = await this.usersService.signin(userSignInDto)
    const accessToken=await this.usersService.accessToken(user)
    return {accessToken,user};
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  //@AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard,AuthorizeGuard([Roles.ADMIN]))
  @Get('all')
  async findAll():Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) : Promise<UserEntity>{
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
  @UseGuards(AuthenticationGuard)
  @Get(':me')
  getProfile(@CurrentUser() currentUser:UserEntity){
    return currentUser; 
  }
}
