import { Resolver, Query } from "@nestjs/graphql";
import { JournalService } from "./journal.service";

@Resolver('Journal')
export class JournalResolver {
	constructor(
		private readonly journalService: JournalService,
		) {}

	@Query()
	async journals() {
		return await this.journalService.findAll();
	}

}