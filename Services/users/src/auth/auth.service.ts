import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService
{

	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}


	async validateUser(email: string, passwd: string): Promise<any>
	{
		const user = await this.usersService.findOneByEmail(email);

		if (user && bcrypt.compareSync(passwd, user.USR_PASSWORD))
		{
			const { USR_PASSWORD, ...result } = user;
			return result;
		}

		return null;
	}


	async login(user: any)
	{
		const payload = {
			username: user.dataValues.USR_EMAIL,
			sub: user.dataValues.USR_ID,
			role: user.dataValues.RLE_ID
		};

		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
