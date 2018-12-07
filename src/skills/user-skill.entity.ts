import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'user';
import { Skill } from 'skills/skill.entity';
import { createLevels, getCurrentLevel } from 'helpers/levelCalculation';

export interface UserSkillConstructor {
  user: User;
  skill: Skill;
}

@Entity({ name: 'skill_user' })
export class UserSkill extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  currentXp: number;

  @ManyToOne(type => User, user => user.skills)
  user: User;

  @ManyToOne(type => Skill, skill => skill.users)
  skill: Skill;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  updated: string;

  async handleChangeXp(amount: number) {
    this.currentXp += amount;
    const levels = createLevels(this.skill);
    await this.save();
    await this.user.handleChangeXp(amount);
    return getCurrentLevel(this, levels);
  }
}