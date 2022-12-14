import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signin } from './dto/signin.dto';
import { signup } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    signup(@Body() dto: signup) {
        return this.authService.signup(dto)
    }

    @Post('signin')
    signin(@Body() dto: signin, @Req() req, @Res() res) {
        return this.authService.signin(dto, req, res)
    }

    @Get('signout')
    signout(@Req() req, @Res() res) {
        return this.authService.signout(req, res)
    }
}
