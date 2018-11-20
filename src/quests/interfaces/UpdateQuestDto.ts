import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateQuestDto {
  @ApiModelProperty()
  readonly name?: string;

  @ApiModelProperty()
  readonly description?: string;

  @ApiModelProperty()
  readonly currentDifficulty?: number;
}