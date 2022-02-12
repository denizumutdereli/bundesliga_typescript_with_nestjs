/*Local Performance -no chunks required
Teams Render
20  35ms
50  70ms
100 150ms
1000 200s
2500 600ms 1Mb
10.000 700ms 1.8mb

*/
import _ from 'lodash';
import { uniqueNamesGenerator, animals, adjectives, starWars } from 'unique-names-generator';
import { BaseTeams } from '../base-teams';
import { v4 as uuidv4 } from 'uuid';

const teamPool = BaseTeams.flatMap(data => data.name.split(' '));

const ClubAdjuctions = [
    'Football Club',
    'FS',
    '1960',
    '1903',
    'Tigers',
    'Gücü',
    'East',
    'Sportik',
    'The Avengers',
    'MVPs',
    'The Kings',
    'Hustlers',
    'Iconic',
    'Bulletproof',
    'Lightning Legends',
    'Mister Maniacs',
    'Born to Win',
    'Ninja Bros',
    'The Elite Team',
    'Dominatrix',
    'Big Shots',
    'Unstoppable Force',
    'Crew X',
    'Rule Breakers',
    'The Squad',
    'United Army',
    'Pixie Normous',
    'GodsFavouriteTeam',
    'Master Spinners',
    'Basic Boys',
    ' Nans Lads',
    'Debuggers',
    'Outliers',
    'Un-De-Feet-able',
    'Gone with the Win',
    'Charging Hulks',
    'Eagle Eyed',
    'Rey-eye Beast',
    'Jets of Giants',
    'Crispy Fried Chickens',
    'Pro Performers',
    'Raven Raiders',
    'Hawkeye Hornets',
    ' Beast Bulls',
    'Red Bull Wings',
    'No Caveat Cavaliers',
    //_.range(1800, 1960, Math.floor(Math.random() * 7) + 1) !performance
];

const Stadiums = [
    'Olimpia',
    'Stadium',
    'Arena',
    'Park'
]

const Colors = ['Blue', 'Yelow', 'Red', 'Orange', 'Black', 'White', 'Gray', 'Green'];

export function GenerateTeams(numberOfTeams: number) {

    let teams = [];
    if (numberOfTeams <= BaseTeams.length) {
        teams = _.sampleSize(BaseTeams, numberOfTeams);
    } else {
        teams = BaseTeams;
        //generateNewTeams
        for (let i = 0; i <= numberOfTeams - BaseTeams.length; i++) {
            const bufName = generateNames();
            const random = Math.floor(Math.random() * 3) + 1;
            const team = {
                userId:'',
                seasonId:'',
                name: bufName.trim(),
                clubColors: _.sampleSize(Colors, random).join(' '),
                crestUrl: '',
                tla: bufName.replace(/^[\s\d]+/, '').substring(0, 3).toUpperCase(),
                venue: (bufName + ' ' + Stadiums[random]).trim()
            }
            teams.push(team);
        }
    }
    //console.log(teams.length)
    return teams;
}

function generateNames() {

    const teamName: string = uniqueNamesGenerator({
        dictionaries: [ClubAdjuctions, animals, adjectives, teamPool, starWars],
        length: (Math.floor(Math.random() * 3) + 1),
        separator: ' '
    });
    return teamName.replace(/(^\w{1})|(\s+\w{1})/g, word => word.toUpperCase());
}
