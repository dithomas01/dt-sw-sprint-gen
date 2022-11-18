import { swFirstNames } from '@assets/sw-first-names';
import { swLastNames } from '@assets/sw-last-names';
import { swAdjectives } from '@assets/sw-adjectives';
import { swObjects } from '@assets/sw-objects';
import { swPlaces } from '@assets/sw-places';
import { swVehicles } from '@assets/sw-vehicles';
import { swAnimals } from '@assets/sw-animals';

export class SprintNameService {
    public static generateSprintName(): string {
        let decider = Math.floor(Math.random() * 2);

        switch (decider) {
            case 0:
                return this.generateRandomName();
            case 1:
                return this.generateRandomAdjObj();
            default:
                return 'error';
        }
    }

    private static generateRandomName(): string {
        const lengthFN = swFirstNames.length;
        const lengthLN = swLastNames.length;
        const firstName = swFirstNames[Math.floor(Math.random() * lengthFN)];
        const lastName = swLastNames[Math.floor(Math.random() * lengthLN)];
        return `${firstName} ${lastName}`;
    }

    private static generateRandomAdjObj(): string {
        const lengthAdj = swAdjectives.length;
        const objects = swObjects.concat(swPlaces, swVehicles, swAnimals);
        const lengthObj = objects.length;
        const adj = swAdjectives[Math.floor(Math.random() * lengthAdj)];
        const obj = objects[Math.floor(Math.random() * lengthObj)];
        return `${adj} ${obj}`;
    }
}
