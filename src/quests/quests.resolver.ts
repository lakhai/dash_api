import { Resolver, Query, Context, Args, Mutation } from "@nestjs/graphql";
import { QuestsService } from "./quests.service";
import { UseGuards } from "@nestjs/common";
import { CurrentUser } from 'user/current-user.decorator';
import { User } from 'user';
import { GqlAuthGuard } from '../auth/graphql-auth-guard';
import { CreateQuestDto, UpdateQuestDto } from './interfaces';

@Resolver('Quest')
export class QuestResolver {
	constructor(
		private readonly questService: QuestsService,
		) {}

	@UseGuards(new GqlAuthGuard())
	@Query()
	async questsCurrentUser(@Context('user') user): Promise<any> {
    	return await this.questService.findByUser(user);
  	}

  	@UseGuards(new GqlAuthGuard())
	@Mutation()
	async createQuest(@Context('user') user,
					  @Args() {name, description, currentDifficulty}: CreateQuestDto){
		const data = {name, description, currentDifficulty};
		return await this.questService.create(user, data);
	}

	@UseGuards(new GqlAuthGuard())
	@Mutation()
	async updateQuest(@Context('user') user,
					  @Args('id') id,
					  @Args() {name, description, currentDifficulty}: UpdateQuestDto){

		let data: any = {};
		name && ( data.name = name );
		description && ( data.description = description );
		currentDifficulty && ( data.currentDifficulty = currentDifficulty );

		if (await this.questService.validateUser(id, user)) {
      		return await this.questService.update(id, data, user);
    	}
	}

	@UseGuards(new GqlAuthGuard())
	@Mutation()
	async deleteQuest(@Context('user') user, @Args('id') id){
		if (await this.questService.validateUser(id, user)) {
     		return await this.questService.delete(id);
    	}
	}
}