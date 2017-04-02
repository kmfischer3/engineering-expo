var MAP_METADATA_NAMES = [];
var MAP_METADATA_STARTS = [];

describe('map.tableIdToMapIndex()', () => {
    it('should return the correct index for the map of the given table id', () => {
        MAP_METADATA_NAMES = ['0.svg', '1.svg', '2.svg'];
        MAP_METADATA_STARTS = [0, 5, 10, 16];
        expect(map.tableIdToMapIndex(0)).toBe(0);
        expect(map.tableIdToMapIndex(1)).toBe(0);
        expect(map.tableIdToMapIndex(2)).toBe(0);
        expect(map.tableIdToMapIndex(3)).toBe(0);
        expect(map.tableIdToMapIndex(4)).toBe(0);
        expect(map.tableIdToMapIndex(5)).toBe(1);
        expect(map.tableIdToMapIndex(6)).toBe(1);
        expect(map.tableIdToMapIndex(10)).toBe(2);
        expect(map.tableIdToMapIndex(11)).toBe(2);
        expect(map.tableIdToMapIndex(15)).toBe(2);
    });
});
