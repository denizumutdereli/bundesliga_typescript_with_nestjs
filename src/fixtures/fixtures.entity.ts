import { Exclude } from 'class-transformer';
import { User } from '../auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Season } from 'src/season/season.entity';

@Entity()
export class Fixture {
  @PrimaryGeneratedColumn('uuid')
  id: string | number;

  @Column()
  roundNo: number;

  @Column("text", { array: true })
  matches: string[];

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
