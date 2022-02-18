import TileType from '../types/tile';
import Mapper from './mapper';

export default class MazeValidator {
    public static valudateMap(map: number[][]) {
        for (let r = 0; r < map.length; r++) {
            let row = map[r];
            for (let c = 0; c < row.length; c++) {
                let tile = Mapper.mapType(row[c]);
                let result = true;

                if (r == 0 && c == 0) {
                    result = this.startTile(tile);
                } else if (r == map.length - 1 && c == row.length - 1) {
                    result = this.finishTile(tile);
                }

                if (r == 0) {
                    result = this.firstRowTile(tile);
                } else if (r == map.length - 1) {
                    result = this.lastRowTile(tile);
                }

                if (c == 0) {
                    result = this.firstColumnTile(tile);
                } else if (c == row.length - 1) {
                    result = this.lastColumnTile(tile);
                }

                if (!result) {
                    return false;
                }
            }
        }
        return true;
    }

    private static finishTile(type: TileType): boolean {
        // North open, West closed
        return type.north && !type.west;
    }
    private static startTile(type: TileType): boolean {
        // South open, East closed
        return type.south && !type.east;
    }
    private static firstRowTile(type: TileType): boolean {
        // North closed
        return !type.north;
    }
    private static lastRowTile(type: TileType): boolean {
        // South closed
        return !type.south;
    }
    private static firstColumnTile(type: TileType): boolean {
        // West closed
        return !type.west;
    }
    private static lastColumnTile(type: TileType): boolean {
        // East closed
        return !type.east;
    }
}