/*eslint-disable */
import { BadRequestException, PipeTransform } from "@nestjs/common";

export class SeasonNumberOfTeamsValidationPipe implements PipeTransform {

    transform(value: any) {
        value = parseInt(value);

        if (value === 0 || value < 2)
            throw new BadRequestException(`"${value}" is an invalid status. Number of teams should be at least 2 and multiple of 2's`);

        if (value%2 !== 0)
            throw new BadRequestException(`"${value}" is an invalid status. Number of teams should be at least 2 and multiple of 2's`);


        return value;
    }
}
