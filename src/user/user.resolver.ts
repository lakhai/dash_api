import { Resolver, Query, ResolveProperty, Parent, Mutation, Args, Context } from "@nestjs/graphql";
import { UsersService } from "./user.service";
import { QuestsService } from './../quests/quests.service';

import { UseGuards } from "@nestjs/common";
import { User } from 'user';
import { UpdateUserDto } from './interfaces';
import { GqlAuthGuard } from '../auth/graphql-auth-guard';


@Resolver('User')
export class UserResolver {
	constructor(
		private readonly userService: UsersService,
		private readonly questService: QuestsService,
		) {}

	@Query()
	async users() {
		return await this.userService.showAll();
	}

	@UseGuards(new GqlAuthGuard())
	@Query()
	async currentUser(@Context('user') user): Promise<any> {
		return user;
	}

	@Query()
	async get(@Args('id') id){
		return await this.userService.get(id);
	} 

	@Query()
	async getByEmail(@Args('email') email){
		return await this.userService.getByEmail(email);
	}

	@Query()
	async getByEmailAndPass(@Args('email') email, @Args('password') password){
		return await this.userService.getByEmailAndPass(email, password);
	}

	@ResolveProperty()
	async quests(@Parent() user){
		return await this.questService.findByUser(user);
	}

	@UseGuards(new GqlAuthGuard())
	@Mutation()
	async update(
	 @Args() {email,firstName,lastName,password,currentPassword}: UpdateUserDto,
	 @Context('user') user){
	 	const data = {email,firstName,lastName,password,currentPassword};
		return await this.userService.update(user, data);
	}
  }
