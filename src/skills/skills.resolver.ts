import { UseGuards } from "@nestjs/common";
import { Resolver, Query } from "@nestjs/graphql";
import { GQLCurrentUser } from 'user/current-user.decorator';
import { User } from 'user';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { GqlAuthGuard } from '../auth/graphql-auth-guard';
import { SkillsService } from "./skills.service";

@Resolver('Skill')
export class SkillResolver {
  constructor(
    private readonly skillResolver: SkillsService,
    ) {}


  @UseGuards(GqlAuthGuard)
  @ApiOperation({ title: 'Get Skill' })
  @Query()
  async userSkills(@GQLCurrentUser() user: User): Promise<any> {
    return await this.skillResolver.getCurrentSkills(user);
  }

}