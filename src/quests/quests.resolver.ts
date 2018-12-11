import { Resolver, Query, Context } from "@nestjs/graphql";
import { QuestsService } from "./quests.service";
import { UseGuards } from "@nestjs/common";
import { CurrentUser } from 'user/current-user.decorator';
import { User } from 'user';
import { GqlAuthGuard } from '../auth/graphql-auth-guard';

@Resolver('Quest')
export class QuestResolver {
	constructor(
		private readonly questService: QuestsService,
		) {}

	@UseGuards(new GqlAuthGuard())
	@Query()
	async quests(@Context('user') user): Promise<any> {
    	return await this.questService.findByUser(user);
  	}

}