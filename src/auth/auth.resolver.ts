import { Resolver, Query, ResolveProperty, Parent, Mutation, Args } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { JwtService } from '@nestjs/jwt';
import { Body } from '@nestjs/common';
import { UsersService, User } from './../user';
import { LoginPayload } from './login.payload';
import { RegisterPayload } from './register.payload';


@Resolver('Auth')
export class AuthResolver {
	constructor(
		private readonly authService: AuthService,
		private readonly jwtService: JwtService,
		private readonly userService: UsersService,
		) {}

	@Mutation()
	async login(@Args('email') email:string,@Args('password') password:string) {
		const payload: LoginPayload = {email, password};
		const user = await this.authService.validateUser(payload);
		const token = await this.authService.createToken(user);
		return token;
	}

	@Mutation()
	async register(@Args() {email, firstName, lastName, password}: RegisterPayload){
		const userData = {email, firstName, lastName, password};
		const user = await this.userService.create(userData);
		return await this.authService.createToken(user);
	}
}