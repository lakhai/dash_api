import { ApiModelProperty } from '@nestjs/swagger';
import { JournalStatuses } from 'journal/journal.entity';

export class UpdateFeedDto {
  @ApiModelProperty()
  readonly alias?: string;

  @ApiModelProperty()
  readonly url?: string;

  @ApiModelProperty()
  readonly titleKey?: string;

  @ApiModelProperty()
  readonly bodyKey?: string;

  @ApiModelProperty()
  readonly dateKey?: string;

  @ApiModelProperty()
  readonly imageKey?: string;

  @ApiModelProperty()
  readonly authorKey?: string;
}