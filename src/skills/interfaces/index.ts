import { ApiModelProperty } from '@nestjs/swagger';

export enum SkillComplexities {
  Trivial = 'Trivial',
  Simple = 'Simple',
  Medium = 'Medium',
  Complex = 'Complex',
  NeverEnding = 'NeverEnding',
}

export class CreateSkillDto {
  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty({ enum: SkillComplexities })
  readonly complexity?: SkillComplexities;
}

export class UpdateSkillDto {
  @ApiModelProperty()
  readonly name?: string;

  @ApiModelProperty({ enum: SkillComplexities })
  readonly complexity?: SkillComplexities;
}
