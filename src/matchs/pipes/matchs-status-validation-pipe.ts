/*eslint-disable */
import { BadRequestException, PipeTransform } from "@nestjs/common";
import { MatchStatus } from "../match-status.enum";

export class MatchStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        MatchStatus.KICKOFF,
        MatchStatus.IN_PROGRESS,
        MatchStatus.COMPLETED
    ];

    transform(value: any) {
        value = value.toUpperCase();
        
        if (!this.isStatusValid(value)) 
            throw new BadRequestException(`"${value}" is an invalid status`);
        
        return value;
    }

    private isStatusValid(status: any) {
        return this.allowedStatuses.indexOf(status) !== -1
    }

}
