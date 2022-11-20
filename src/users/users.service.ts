import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { update } from './dto/update.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async getMyUsers(req: Request) {
        const decodedUser = req.user as { id: string, email: string, }
        const user = await this.prisma.user.findUnique({ where: { id: decodedUser.id } })

        if (!user) {
            throw new NotFoundException('User not found')
        }

        delete user.hashedPassword
        return { user }
    }

    async getUsers() {
        return await this.prisma.user.findMany({ select: { id: true, email: true } });
    }

    async update(dto: update, req: Request, res: Response) {
        const { nickname, about, backgroundColor, file } = dto
        const decodedUser = req.user as { id: string, email: string, }
        const user = await this.prisma.user.findUnique({ where: { id: decodedUser.id } })

        if (!user) {
            throw new NotFoundException('User not found')
        }

        this.prisma.user.update({
            where: { id: decodedUser.id },
            data: {
                nickname: nickname,
                about: about,
                backgroundColor: backgroundColor,
                file: file
            },
        }).catch(err => {
            console.error(err)
            throw new ForbiddenException('Update user error')
        })

        return res.send({ message: 'Update succesfully' })
    }
}
