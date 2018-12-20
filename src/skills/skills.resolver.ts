import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Context, Args, Mutation, Parent } from "@nestjs/graphql";
import { GQLCurrentUser } from 'user/current-user.decorator';
import { User } from 'user';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { GqlAuthGuard } from '../auth/graphql-auth-guard';
import { SkillsService } from "./skills.service";
import { createLevels, getCurrentLevel } from 'helpers/levelCalculation';
import { CreateSkillDto, UpdateSkillDto } from './interfaces';

@Resolver('Skill')
export class SkillResolver {
  constructor(
    private readonly skillService: SkillsService,
    ) {}

  @UseGuards(GqlAuthGuard)
  @Query()
  async currentUserSkills(@Context('user') user){
    return await this.skillService.findByUser(user);
  }

  @UseGuards(GqlAuthGuard)
  @Query()
  async getSkill(@Args('id') id, @Context('user') user){
  	const skill =  await this.skillService.get(id);
    console.log(skill);
  	const userSkill = await this.skillService.getUserSkill({user, skill});
    console.log(userSkill);
  	const levels = createLevels(skill);
  	const currentlevel = getCurrentLevel(userSkill, levels);
  	
  	return {skill,currentlevel};
  }  

  @UseGuards(GqlAuthGuard)
  @Mutation()
  async createSkill(@Args() {name, complexity}: CreateSkillDto, @Context('user') user: User){
    const skill = {name, complexity}
  	return await this.skillService.create(user, skill);
  }

  // Separate and add update of userSkill
  @UseGuards(GqlAuthGuard)
  @Mutation()
  async updateSkill(@Args() {name, complexity}: UpdateSkillDto, @Args('id') id, @Context('user') user: User){
  	let data: any = {};
    name && (data.name = name);
    complexity && (data.complexity =complexity)
  	return await this.skillService.update(id, data, user);
  }

  // Separate and add deletion of userSkill
  @UseGuards(GqlAuthGuard)
  @Mutation()
  async deleteSkill(@Args('id') id, @Context('user') user){
 	  if (await this.skillService.validateUser(id, user)) {
         return await this.skillService.delete(id);
      }
  }
}