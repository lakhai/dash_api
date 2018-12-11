import { Resolver, Query, ResolveProperty, Parent, Mutation, Args } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { JwtService } from '@nestjs/jwt';
import { Body } from '@nestjs/common';
import { LoginPayload } from './login.payload';


@Resolver('Auth')
export class AuthResolver {
	constructor(
		private readonly authService: AuthService,
		private readonly jwtService: JwtService,
		) {}

	@Mutation()
	async login(@Args('email') email:string,@Args('password') password:string) {
		const payload: LoginPayload = {email, password};
		const user = await this.authService.validateUser(payload);
		const token = await this.authService.createToken(user);
		return token;
	}
}