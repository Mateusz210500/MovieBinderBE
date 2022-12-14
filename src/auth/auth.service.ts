import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { jwtSecret } from '../utils/constants';
import { signin } from './dto/signin.dto';
import { signup } from './dto/signup.dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService) { }

    async signup(dto: signup) {
        const { email, password, nickname } = dto;
        const foundUser = await this.prisma.user.findUnique({ where: { email } })
        if (foundUser) {
            throw new BadRequestException('Email already exits')
        }

        const hashedPassword = await this.hashPassword(password)

        await this.prisma.user.create({
            data: {
                email,
                hashedPassword,
                nickname
            }
        })

        return { message: 'signup was successful' };
    }

    async signin(dto: signin, req: Request, res: Response) {
        const { email, password } = dto

        const foundUser = await this.prisma.user.findUnique({ where: { email } })

        if (!foundUser) {
            throw new BadRequestException('Wrong credentials')
        }

        const isMatch = await this.comparePasswords({ password, hash: foundUser.hashedPassword })

        if (!isMatch) {
            throw new BadRequestException('Wrong password')
        }

        const token = await this.signToken({ id: foundUser.id, email: foundUser.email })
        const spaToken = await this.signToken({ id: foundUser.id, email: foundUser.email })


        if (!token) {
            throw new ForbiddenException()
        }

        res.cookie('token', token, { httpOnly: true })

        return res.send({ message: 'Logged in succesfully', spaToken: spaToken })
    }

    async signout(req: Request, res: Response) {
        res.clearCookie('token')
        return res.send({ message: 'Logged out succesfully' })
    }

    async hashPassword(password: string) {
        const saltOrRounds = 10;

        return await bcrypt.hash(password, saltOrRounds)
    }

    async comparePasswords(args: { password: string, hash: string }) {
        return await bcrypt.compare(args.password, args.hash)
    }

    async signToken(args: { id: string, email: string }) {
        const payload = args
        return this.jwt.signAsync(payload, { secret: jwtSecret, expiresIn: '24h' })
    }
}
