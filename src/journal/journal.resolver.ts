import { Resolver, Query, Context, Args, Mutation } from "@nestjs/graphql";
import { JournalService } from "./journal.service";
import { CreateJournalDto, UpdateJournalDto } from './interfaces';
import { UseGuards } from "@nestjs/common";
import { User } from 'user';
import { GqlAuthGuard } from '../auth/graphql-auth-guard';

@Resolver('Journal')
export class JournalResolver {
	constructor(
		private readonly journalService: JournalService,
		) {}

	@UseGuards(new GqlAuthGuard())
	@Query()
	async currentUserJournals(@Context('user') user) {
		return await this.journalService.findByUser(user);
	}

	@UseGuards(new GqlAuthGuard())
	@Query()
	async getJournalEntry(@Context('user') user, @Args('id') id){
		if (await this.journalService.validateUser(id, user)) {
      		return await this.journalService.get(id);
    	}
	}

	@UseGuards(new GqlAuthGuard())
	@Mutation()
	async createJournal(@Context('user') user, @Args() {title, body, status}: CreateJournalDto){
		const data = {title, body, status};
		return await this.journalService.create(user, data);
	}

	@UseGuards(new GqlAuthGuard())
	@Mutation()
	async updateJournal(@Context('user') user,
						 @Args('id') id,
						 @Args() {title, body, status}: UpdateJournalDto){
		let data: any = {};
		title && ( data.title = title );
		body && ( data.body = body );
		status && ( data.status = status );
		
		if (await this.journalService.validateUser(id, user)) {
      		return await this.journalService.update(id, data, user);
    	}
	}

	@UseGuards(new GqlAuthGuard())
	@Mutation()
	async deleteJournal(@Context('user') user, @Args('id') id){
		if (await this.journalService.validateUser(id, user)) {
      		return await this.journalService.delete(id);
    	}
	}

}