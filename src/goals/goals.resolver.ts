import { Resolver, Query, Context, Args, Mutation } from "@nestjs/graphql";
import { GoalsService } from "./goals.service";
import { Goal } from './goal.entity';
import { UseGuards } from "@nestjs/common";
import { User } from 'user';
import { GqlAuthGuard } from '../auth/graphql-auth-guard';
import { CreateGoalDto, UpdateGoalDto } from './interfaces';


@Resolver('Goal')
export class GoalResolver {
	constructor(
		private readonly goalsService: GoalsService,
		) {}

	@UseGuards(new GqlAuthGuard())
	@Query()
	async currentUserGoals(@Context('user') user): Promise<any> {
		const goals = await this.goalsService.findByUser(user);
		return goals;
	} 

	@UseGuards(new GqlAuthGuard())
	@Mutation()
	async createGoal(@Context('user') user, @Args() {title, description, awards, categories}){
		let data: any = {title, description, awards};
		categories && ( data.categories = categories);
		return await this.goalsService.create(user, data);
	}

	@UseGuards(new GqlAuthGuard())
	@Mutation()
	async updateGoal(@Context('user') user,
							  @Args() {title, description, awards, categories},
							  @Args('id') id){
		let data: any = {};
		title && ( data.title = title );
		description && ( data.description = description );
		awards && ( data.awards = awards );
		categories && ( data.categories = categories );

		const goal: Goal = await this.goalsService.get(id);
    	if (await this.goalsService.validateGoalUser(id, user)) {
      		return await this.goalsService.update(id, data, user);
    	}

	}

	@UseGuards(new GqlAuthGuard())
	@Mutation()
	async deleteGoal(@Context('user') user, @Args('id') id){
		if (await this.goalsService.validateGoalUser(id, user)) {
      		return await this.goalsService.delete(id);
    	}
	}


	@UseGuards(new GqlAuthGuard())
	@Mutation()
	async completeGoal(@Context('user') user, @Args('id') id){
		if (await this.goalsService.validateGoalUser(id, user)) {
      		return await this.goalsService.complete(id);
    	}
	}

	@UseGuards(new GqlAuthGuard())
	@Mutation()
	async failGoal(@Context('user') user, @Args('id') id){
		if (await this.goalsService.validateGoalUser(id, user)) {
     		return await this.goalsService.fail(id);
    	}
	}	

}