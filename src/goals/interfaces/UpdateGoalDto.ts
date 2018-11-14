import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateGoalDto {
  @ApiModelProperty()
  readonly title?: string;

  @ApiModelProperty()
  readonly description?: string;

  @ApiModelProperty()
  readonly awards?: number;
}