import { Resolver, Query, ResolveProperty, Parent, Mutation, Args, Context } from "@nestjs/graphql";
import { UsersService } from "./user.service";
import { UseGuards } from "@nestjs/common";
import { User } from 'user';
import { GqlAuthGuard } from '../auth/graphql-auth-guard';


@Resolver('User')
export class UserResolver {
	constructor(
		private readonly userService: UsersService,
		) {}

	@Query()
	async users() {
		return await this.userService.showAll();
	}

	@UseGuards(new GqlAuthGuard())
	@Query()
	async loggedIn(@Context('user') user): Promise<any> {
		const { email } = user;
		return user;
	} 
  }
