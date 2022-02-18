import Position from '../types/position';
import MazeValidator from './validatorService';

export default class MazeLevelGenerator {
    public static getStartPosition(level: number): Position {
        let maxPosition;
        switch (level) {
            case 1:
                maxPosition = this.getFirstLevelMap().length - 1;
                return { x: maxPosition, y: maxPosition };
            case 2:
                maxPosition = this.getSecondLevelMap().length - 1;
                return { x: maxPosition, y: maxPosition };
        }

        return { x: -1, y: -1 };
    }

    public static getLevel(level: number): number[][] {
        let levelMap;
        switch (level) {
            case 1:
                levelMap = this.getFirstLevelMap();
                break;
            case 2:
                levelMap = this.getSecondLevelMap();
                break;
        }
        if (!levelMap) throw `A maze for level ${level} is not available`;
        else if (!MazeValidator.valudateMap(levelMap))
            throw `Configuration of the level ${level} maze is incorrect`;

        return levelMap;
    }

    private static getFirstLevelMap(): number[][] {
        return [
            [14, 5, 1, 6, 5, 3],
            [14, 5, 3, 10, 2, 10],
            [14, 3, 10, 14, 11, 10],
            [8, 10, 12, 13, 13, 9],
            [6, 9, 6, 5, 5, 3],
            [12, 5, 9, 4, 5, 11]
        ];
    }

    private static getSecondLevelMap(): number[][] {
        return [
            [12, 7, 5, 3, 6, 3, 6, 5, 5, 3],
            [2, 12, 3, 10, 10, 10, 10, 6, 3, 10],
            [12, 3, 10, 12, 11, 10, 12, 9, 10, 10],
            [2, 10, 10, 4, 9, 12, 3, 4, 9, 10],
            [10, 12, 13, 7, 5, 1, 10, 6, 3, 10],
            [14, 5, 5, 9, 6, 5, 9, 10, 10, 10],
            [10, 6, 7, 3, 12, 7, 3, 10, 10, 10],
            [10, 10, 10, 8, 6, 9, 8, 10, 14, 9],
            [10, 10, 12, 3, 10, 6, 5, 11, 10, 2],
            [12, 9, 4, 9, 12, 9, 4, 9, 12, 11]
        ];
    }
}