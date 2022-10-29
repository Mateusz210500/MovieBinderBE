import { Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';

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
}
