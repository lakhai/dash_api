import { ApiModelProperty } from '@nestjs/swagger';

export class CreateQuestDto {
  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly description: string;

  @ApiModelProperty()
  readonly currentDifficulty: number;
}