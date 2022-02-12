import { SeasonStatus } from "../../season/season.status.enum";
import { Team } from "./team.interface";

export interface SeasonInterface {
  id: any;
  name: string;
  yearStart: number;
  yearEnd: number;
  numberOfTeams: number;
  teams: string;
  status: SeasonStatus;
}
