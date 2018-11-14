import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity } from 'typeorm';
import { PasswordTransformer } from './password.transformer';
import { Goal } from 'goals/goal.entity';
import { fibonacci } from './helpers/fibonacci';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  firstName: string;

  @Column({ length: 255 })
  lastName: string;

  @Column({ length: 255 })
  email: string;

  @Column({
    name: 'password',
    length: 255,
    transformer: new PasswordTransformer(),
  })
  @Exclude()
  password: string;

  @OneToMany(type => Goal, goal => goal.user)
  goals: Goal[];

  @Column({ default: 1 })
  currentLevel: number;

  @Column({ default: 0 })
  currentXP: number;

  @Column({ default: 100 })
  xpUntilNextLevel: number;

  async handleChangeXp(amount: number) {
    if (this.currentXP + amount >= this.xpUntilNextLevel) {
      this.currentLevel += 1;
      this.currentXP = this.currentXP + amount - this.xpUntilNextLevel;
      this.xpUntilNextLevel = fibonacci(this.currentLevel);
    } else if (this.currentXP + amount < 0) {
      this.currentLevel = this.currentLevel - 1 < 1
        ? 1 : this.currentLevel - 1;
      const xpForLevel = fibonacci(this.currentLevel);
      this.currentXP = this.currentXP + amount + xpForLevel;
      this.xpUntilNextLevel = xpForLevel;
    } else {
      this.currentXP = this.currentXP += amount;
    }
    return await this.save();
  }
}

export class UserFillableFields {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
