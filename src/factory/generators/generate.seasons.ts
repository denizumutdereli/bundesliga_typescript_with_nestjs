import { CreateSeasonDto } from "src/season/dto/create-season.dto";
import { SeasonStatus } from "src/season/season.status.enum";
import { SeasonInterface } from "../interfaces/season.interface";
import { BaseTeams } from "../base-teams";
import { GenerateTeams } from "./generate-teams";
import { GenerateFixtures } from "./generate-fixtures";

export class GenerateSeason implements SeasonInterface {

    id: any;
    name: string;
    yearStart: number;
    yearEnd: number;
    numberOfTeams: number;
    teams: any;
    status: SeasonStatus;
    fixture: any

    constructor(createSeasonDto: CreateSeasonDto) {

        const { name } = createSeasonDto;
        let { numberOfTeams, yearStart } = createSeasonDto;
        const teamNames = BaseTeams.flatMap(data => data.name);

        /*fixes*/
        numberOfTeams = Number(numberOfTeams);
        yearStart = Number(yearStart);
        if (numberOfTeams < 2) numberOfTeams = teamNames.length;
        if (numberOfTeams % 2 !== 0) numberOfTeams += 1;


        const genTeams = GenerateTeams(!numberOfTeams ? teamNames.length : numberOfTeams);
        const fixtures = GenerateFixtures(genTeams);

        this.name = !name ? 'Bundesliga' : name;
        this.yearStart = !yearStart ? 2022 : yearStart;
        this.yearEnd = !yearStart ? 2023 : yearStart + 1;
        this.numberOfTeams = !numberOfTeams ? teamNames.length : numberOfTeams;
        this.teams = genTeams; //JSON.stringify(genTeams)
        this.fixture = fixtures

        return this;
    }

}