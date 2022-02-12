import { flatten } from "@nestjs/common";
import _ from "lodash";

/*eslint-disable*/
export function GenerateFixtures(opponents) {
    opponents = shuffle(opponents);

    // generate the rounds of matches
    const firstHalfSeasonFixtures = generateFixtures(opponents, 0, true);
    const secondHalfSeasonFixtures = generateFixtures(opponents, opponents.length - 1, false);
    const allFixtures = firstHalfSeasonFixtures.concat(secondHalfSeasonFixtures);
    //console.log(allFixtures.length)

    let cleanup = [];
    for (let i = 0; i < allFixtures.length; i++) {
        console.log(allFixtures[i].roundNo)

        if (Array.isArray(cleanup[allFixtures[i].roundNo]) && cleanup[allFixtures[i].roundNo].length) {
            cleanup[allFixtures[i].roundNo].push(allFixtures[i])
        } else {
            cleanup[allFixtures[i].roundNo] = new Array();
            cleanup[allFixtures[i].roundNo].push(allFixtures[i])
        }
    }

    return cleanup;

}

function generateFixtures(opponents, roundNoOffset, alternate) {
    const fixtures = [];

    const offsetArray = generateOffsetArray(opponents);
    let rounds = [];
    for (let roundNo = 1; roundNo <= opponents.length - 1; roundNo++) {
        alternate = !alternate;
        const homes = getHomes(opponents, roundNo, offsetArray);
        const aways = getAways(opponents, roundNo, offsetArray);


        for (let matchIndex = 0; matchIndex < opponents.length / 2; matchIndex++) {

            if (alternate === true) {
                fixtures.push({
                    userId:'',
                    seasonId:'',
                    roundNo: roundNo + roundNoOffset,
                    matches: [{
                        matchNo: matchIndex,
                        home: opponents[homes[matchIndex]],
                        away: opponents[aways[matchIndex]],
                    }],

                });
            } else {
                fixtures.push({
                    userId: '',
                    seasonId: '',
                    roundNo: roundNo + roundNoOffset,
                    matches: [{
                        matchNo: matchIndex,
                        home: opponents[aways[matchIndex]],
                        away: opponents[homes[matchIndex]],
                    }]

                });
            }

            if (homes[matchIndex] == aways[matchIndex]) {
                //console.error("Teams cannot play themselves");
            }
        }
    }

    return fixtures;
}

function generateOffsetArray(opponents) {
    let offsetArray = [];
    for (let i = 1; i < opponents.length; i++) {
        offsetArray.push(i);
    }
    offsetArray = offsetArray.concat(offsetArray);
    return offsetArray;
}

function getHomes(opponents, roundNo, offsetArray) {
    const offset = opponents.length - roundNo;
    const homes = offsetArray.slice(offset, offset + opponents.length / 2 - 1);
    return [0, ...homes];
}

function getAways(opponents, roundNo, offsetArray) {
    const offset = opponents.length - roundNo + (opponents.length / 2 - 1);
    const aways = offsetArray.slice(offset, offset + opponents.length / 2);
    return aways.reverse();
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}