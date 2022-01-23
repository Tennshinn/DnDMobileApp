import { parseDice } from '../data/ItemData';

// this text doesn't contain dice codes
const TEXT_1 = "Can be only used in the distance of 10 meters.";
const TEXT_2 = "Can be only used in the distance of 10 meters. Throw 4d20, if result is larger than 20 throw 2d10. This will be the damage taken by the target.";
// text obtained by calling the function in interactive session knowing that the text displays correctly in the app 
// (the tests prevents from regression)
const TEXT_2_PARSED = 'Can be only used in the distance of 10 meters. Throw 4, if result is larger than 20 throw 2. This will be the damage taken by the target.';

test('parseDice keeps the text without the dice codes unchanged', () => {
    expect(parseDice(TEXT_1)).toBe(TEXT_1);
});

test('parseDice replaces dice codes with unicode', () => {
    expect(parseDice(TEXT_2)).toBe(TEXT_2_PARSED);
});