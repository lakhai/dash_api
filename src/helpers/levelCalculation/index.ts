import { isNumber, times } from 'lodash';
import * as moment from 'moment';
import { Skill } from 'skills/skill.entity';
import { SkillComplexities } from 'skills/interfaces';
import { UserLevel, UserLevelTier } from 'user/interfaces';
import { UserSkill } from 'skills/skill-level';

export interface CurrentLevelInfo {
  currentLevel: UserLevel;
  currentTier?: UserLevelTier;
}

export function hrToXp(hrs: number): number {
  // const hours = isNumber(hrs) ? moment.duration(hrs, 'hours') : moment.duration(hrs);
  // if (!moment.isDuration(hours)) {
  //   return null;
  // }
  return hrs * 50;
}

export function xpToHours(xp: number): number {
  return xp / 50;
}

export function createLevels(skill: Skill): UserLevel[] {
  let maxXp = 0;
  let degrees = [];
  let tiersByLevel = 0;
  switch (skill.complexity) {
    case SkillComplexities.Trivial: {
      maxXp = hrToXp(500);
      break;
    }
    case SkillComplexities.Simple: {
      maxXp = hrToXp(1000);
      degrees = [
        .25,
        .50,
        1,
      ];
      break;
    }
    case SkillComplexities.Medium: {
      maxXp = hrToXp(2000);
      tiersByLevel = 3;
      degrees = [
        .25,
        .50,
        1,
      ];
      break;
    }
    case SkillComplexities.Complex: {
      maxXp = hrToXp(5000);
      tiersByLevel = 4;
      degrees = [
        .10,
        .20,
        .45,
        .70,
        1,
      ];
      break;
    }
    case SkillComplexities.NeverEnding: {
      maxXp = hrToXp(10000);
      tiersByLevel = 5;
      degrees = [
        .10,
        .20,
        .45,
        .70,
        1,
      ];
      break;
    }
  }
  const levels = [];
  const tiers = [];
  degrees.forEach((deg, index) => {
    const requiredXp = maxXp * deg;
    if (tiersByLevel > 1) {
      times(tiersByLevel, tier => {
        tiers.push({
          tier,
          requiredXp: requiredXp / tiersByLevel,
        });
      });
    }
    levels.push({
      level: index + 1,
      tiers,
      requiredXp,
    });
  });
  return levels;
}

export function getCurrentLevel(skillData: UserSkill, levels: UserLevel[]): CurrentLevelInfo {
  const [currentLevel] = levels.filter(lvl => lvl.requiredXp > skillData.currentXp);
  if (currentLevel.tiers.length > 1) {
    const [currentTier] = currentLevel.tiers.filter(tier => tier.requiredXp > skillData.currentXp);
    return { currentLevel, currentTier };
  }
  return { currentLevel };
}