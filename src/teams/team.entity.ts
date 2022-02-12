import { Exclude } from 'class-transformer';
import { User } from '../auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Season } from 'src/season/season.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string | number;

  @Column()
  name: string;

  @Column({ nullable: true })
  tla: string;

  @Column({ nullable: true })
  clubColors: string;

  @Column({ nullable: true })
  venue: string;

  @Column({ type: "uuid" })
  userId: string;

  @Column({ type: "uuid" })
  seasonId: string;

  @ManyToOne(() => Season, (season) => season.teams, { eager: false })
  @Exclude({ toPlainOnly: true })
  season: Season;

  @ManyToOne(() => User, (user) => user.matchs, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
