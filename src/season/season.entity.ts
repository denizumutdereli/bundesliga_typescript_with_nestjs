import { Exclude } from 'class-transformer';
import { User } from '../auth/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SeasonStatus } from './season.status.enum';
import { Team } from 'src/teams/team.entity';

@Entity()
export class Season {
  @PrimaryGeneratedColumn('uuid')
  id: string | number;

  @Column()
  name: string;

  @Column()
  yearStart: number;

  @Column()
  yearEnd: number;

  @Column()
  numberOfTeams: number;

  @OneToMany(() => Team, (team) => team.season, { eager: false, cascade: true })
  @Exclude({ toPlainOnly: true })
  @JoinColumn({ name: 'seasonId' })
  teams: Team[];

  @Column()
  status: SeasonStatus;

  @Column()
  fixture: string;

  @ManyToOne(() => User, (user) => user.seasons, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
