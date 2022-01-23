import { hashString, hashStringArray, colorFromHash, lerpAngle } from '../data/helpers';

const TEST_STRINGS = [
    "",
    "O",
    "Armour",
    "30 Coins",
    "Scroll"
]

test('hashString returns numbers', () => {
    for(const string of TEST_STRINGS) {
        expect(typeof hashString(string)).toBe("number");
    }
});

test('hashString returns at least two different hashes', () => {
    let hashesAreDifferent = false;
    let last = null;
    for(const string of TEST_STRINGS) {
        const hashed = hashString(string);
        if (last===null) {
            last=hashed;
        } else if (last !== hashed) {
            hashesAreDifferent = true;
        } else {
            last = hashed;
        }
    }
    expect(hashesAreDifferent).toBeTruthy();
});

test('hashStringArray returns number', ()=>{
    expect(typeof hashStringArray(TEST_STRINGS)).toBe("number");
})

test("lerpAngle is correct", ()=>{
    expect(lerpAngle(10, 50, 0.5)).toBe(30);
    expect(lerpAngle(10, 330, 0.5)).toBe(350);
})

const TEST_NUMBERS = [0, 0.7, 100];

test("colorFromHash returns hex color", ()=>{
    // source: https://www.geeksforgeeks.org/how-to-validate-hexadecimal-color-code-using-regular-expression/
    const regex = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$";
    for(const number of TEST_NUMBERS) {
        expect(colorFromHash(number)).toEqual(expect.stringMatching(regex));
    }
})

test("colorFromHash returns at least two different colors", ()=>{
    let colorsAreDifferent = false;
    let last = null;
    for(const number of TEST_NUMBERS) {
        const color = colorFromHash(number);
        if (last===null) {
            last=color;
        } else if (last !== color) {
            colorsAreDifferent = true;
        } else {
            last = color;
        }
    }
    expect(colorsAreDifferent).toBeTruthy();
})