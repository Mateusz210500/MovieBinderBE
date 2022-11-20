import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { addRemoveMovie } from './dto/addRemoveMovie.dto';
import { create } from './dto/create.dto';

@Injectable()
export class CatalogsService {
    constructor(private prisma: PrismaService) { }

    async create(dto: create, req: Request, res: Response) {
        const { title, description } = dto;
        const decodedUser = req.user as { id: string, email: string, }
        const id = decodedUser.id
        const foundCatalog = await this.prisma.catalog.findUnique({ where: { title } })
        if (foundCatalog) {
            throw new BadRequestException('Catalog with that name already exits')
        }

        await this.prisma.catalog.create({
            data: {
                title,
                description,
                authorId: id
            }
        })

        return res.send({ message: 'Catalog created successfully' })
    }

    // async getMyCatalogs(req: Request) {
    //     const decodedUser = req.user as { id: string, email: string, }
    //     const user = await this.prisma.user.findUnique({ where: { id: decodedUser.id } })

    //     if (!user) {
    //         throw new NotFoundException('User not found')
    //     }

    //     delete user.hashedPassword
    //     return { user }
    // }

    async addMovie(dto: addRemoveMovie, req: Request, res: Response) {
        const { movieId, catalogId } = dto
        const catalogData = await (await this.prisma.catalog.findFirst({ where: { id: catalogId } }))
        const decodedUser = req.user as { id: string, email: string, }
        if (decodedUser.id !== catalogData.authorId) {
            throw new BadRequestException("You don't have parmission to do that")
        }
        const filmIds = catalogData.filmIds
        const foundMovie = filmIds.find(el => el === movieId)
        if (foundMovie) {
            throw new BadRequestException('That movie already exist in this catalog')
        }

        filmIds.push(movieId)
        this.prisma.catalog.update({
            where: { id: catalogId },
            data: {
                filmIds: filmIds
            },
        }).catch(err => {
            console.error(err)
            throw new ForbiddenException('Add movie error')
        })

        return res.send({ message: 'Movie added succesfully' })
    }

    async removeMovie(dto: addRemoveMovie, req: Request, res: Response) {
        const { movieId, catalogId } = dto
        const catalogData = await (await this.prisma.catalog.findFirst({ where: { id: catalogId } }))
        const decodedUser = req.user as { id: string, email: string, }
        if (decodedUser.id !== catalogData.authorId) {
            throw new BadRequestException("You don't have parmission to do that")
        }
        const filmIds = catalogData.filmIds
        const foundMovie = filmIds.find(el => el === movieId)
        if (!foundMovie) {
            throw new BadRequestException("That movie doesn't exist in this catalog")
        }

        const index = filmIds.indexOf(movieId);
        if (index !== -1) {
            filmIds.splice(index, 1);
        }
        this.prisma.catalog.update({
            where: { id: catalogId },
            data: {
                filmIds: filmIds
            },
        }).catch(err => {
            console.error(err)
            throw new ForbiddenException('Remove movie error')
        })

        return res.send({ message: 'Movie removed succesfully' })
    }
}
