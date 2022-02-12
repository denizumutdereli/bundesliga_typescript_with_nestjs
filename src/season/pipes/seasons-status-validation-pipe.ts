/*eslint-disable */
import { BadRequestException, PipeTransform } from "@nestjs/common";
import { SeasonStatus } from "../season.status.enum";

export class SeasonStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        SeasonStatus.KICKOFF,
        SeasonStatus.IN_PROGRESS,
        SeasonStatus.HALFSEASON,
        SeasonStatus.COMPLETED
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
