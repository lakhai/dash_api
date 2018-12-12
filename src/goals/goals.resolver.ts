import { Resolver, Query, Context } from "@nestjs/graphql";
import { GoalsService } from "./goals.service";
import { UseGuards } from "@nestjs/common";
import { User } from 'user';
import { GqlAuthGuard } from '../auth/graphql-auth-guard';


@Resolver('Goal')
export class GoalResolver {
	constructor(
		private readonly goalService: GoalsService,
		) {}

	@Query()
	async goals() {
		return await this.goalService.findAll();
	}

	@UseGuards(new GqlAuthGuard())
	@Query()
	async userGoals(@Context('user') user): Promise<any> {
		const goals = await this.goalService.findByUser(user);
		return goals;
	} 

}