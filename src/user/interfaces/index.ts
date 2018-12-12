import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiModelProperty()
  readonly firstName?: string;

  @ApiModelProperty()
  readonly lastName?: string;

  @ApiModelProperty()
  readonly avatarUrl?: string;

  @ApiModelProperty()
  readonly email?: string;

  @ApiModelProperty()
  password?: string;

  @ApiModelProperty()
  currentPassword?: string;
}

export interface UserLevelTier {
  tier: number;
  requiredXp: number;
}

export interface UserLevel {
  level: number;
  requiredXp: number;
  tiers?: UserLevelTier[];
}