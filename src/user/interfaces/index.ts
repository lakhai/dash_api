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
  readonly password?: string;

  @ApiModelProperty()
  readonly currentPassword?: string;
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