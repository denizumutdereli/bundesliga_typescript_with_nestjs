import { Match } from '../matchs/match.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Season } from 'src/season/season.entity';
import { Team } from 'src/teams/team.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Team, (team) => team.user, { eager: true }) //pg buggy
  teams: Team[];
  
  @OneToMany(() => Match, (match) => match.user, { eager: true }) //pg buggy
  matchs: Match[];
  
  @OneToMany(() => Season, (season) => season.user, { eager: true }) //pg buggy
  seasons: Season[];
}
