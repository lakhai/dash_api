import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { SkillComplexities } from './interfaces';
import { UserSkill } from 'skills/user-skill.entity';
import { User } from 'user';
import { createDecipher } from 'crypto';

@Entity({ name: 'skills' })
export class Skill extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ enum: SkillComplexities, default: SkillComplexities.Simple })
  complexity: SkillComplexities;

  @ManyToOne(type => UserSkill, userSkill => userSkill.skill)
  users: UserSkill;

  @ManyToOne(type => User, user => user.createdSkills)
  user: User;

  @CreateDateColumn()
  created;

  @UpdateDateColumn()
  updated;
}
