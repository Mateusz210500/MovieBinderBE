import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CatalogsService } from './catalogs.service';
import { addRemoveMovie } from './dto/addRemoveMovie.dto';
import { create } from './dto/create.dto';

@Controller('catalogs')
export class CatalogsController {
    constructor(private readonly catalogsService: CatalogsService) { }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    signup(@Body() dto: create, @Req() req, @Res() res) {
        return this.catalogsService.create(dto, req, res)
    }

    // @UseGuards(JwtAuthGuard)
    // @Get('getMyCatalogs')
    // getMyUser(@Req() req) {
    //     return this.catalogsService.getMyCatalogs(req)
    // }

    @UseGuards(JwtAuthGuard)
    @Post('addMovie')
    addMovie(@Body() dto: addRemoveMovie, @Req() req, @Res() res) {
        return this.catalogsService.addMovie(dto, req, res)
    }

    @UseGuards(JwtAuthGuard)
    @Post('removeMovie')
    removeMovie(@Body() dto: addRemoveMovie, @Req() req, @Res() res) {
        return this.catalogsService.removeMovie(dto, req, res)
    }
}
