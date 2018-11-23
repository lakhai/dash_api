import { ApiModelProperty } from '@nestjs/swagger';
import { JournalStatuses } from 'journal/journal.entity';

export class UpdateJournalDto {
  @ApiModelProperty()
  readonly title?: string;

  @ApiModelProperty()
  readonly body?: string;

  @ApiModelProperty()
  readonly status?: JournalStatuses;
}