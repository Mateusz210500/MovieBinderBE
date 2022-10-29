import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get('getId')
    getMyUser(@Req() req) {
        return this.usersService.getMyUsers(req)
    }

    @Get()
    getUsers() {
        return this.usersService.getUsers()
    }
}
