import { ApiModelProperty } from '@nestjs/swagger';

export class CreateGoalDto {
  @ApiModelProperty()
  readonly title: string;

  @ApiModelProperty()
  readonly description: string;

  @ApiModelProperty()
  readonly awards: number;

}