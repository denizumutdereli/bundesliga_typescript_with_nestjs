import { Exclude } from 'class-transformer';
import { User } from '../auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MatchStatus } from './match-status.enum';

@Entity()
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string | number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: MatchStatus;

  @ManyToOne((_type) => User, (user) => user.matchs, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
