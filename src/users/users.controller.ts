import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { update } from './dto/update.dto';
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

    @UseGuards(JwtAuthGuard)
    @Post('update')
    update(@Body() dto: update, @Req() req, @Res() res) {
        return this.usersService.update(dto, req, res)
    }
}
