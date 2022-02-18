import TileType from "../types/tile";

export default class Mapper {
    public static mapType(type: number): TileType {
        const bits = type.toString(2).padStart(4, "0").split("");
        return {
            north: !!parseInt(bits[0]),
            east: !!parseInt(bits[1]),
            south: !!parseInt(bits[2]),
            west: !!parseInt(bits[3])
        };
    }
}
