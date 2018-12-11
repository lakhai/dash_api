import { Resolver, Query } from "@nestjs/graphql";
import { GoalsService } from "./goals.service";

@Resolver('Goal')
export class GoalResolver {
	constructor(
		private readonly goalService: GoalsService,
		) {}

	@Query()
	async goals() {
		return await this.goalService.findAll();
	}

}