import { number, moveArrayItem } from '../grid/helpers';

const ITEMS = [
    {"key":"sword"},
    {"key":"shield"},
    {"key":"apple"},
    {"key":"bow"}
];

test('number', () => {
    // numbering is done in place so the items need to be copied
    const numberedItems = number(ITEMS.map(item=>({...item})));
    for (let i = 0; i< numberedItems.length; i++) {
        expect(numberedItems[i].key).toBe(ITEMS[i].key);
        expect(numberedItems[i].index).toBe(i);
    }
});

test('moveArrayItem', () => {
    expect(moveArrayItem([], 0, 0)).toStrictEqual([]);
    expect(moveArrayItem([1], 0, 0)).toStrictEqual([1]);
    // move to the begin
    expect(moveArrayItem([9, 5, 6, 2, 1], 2, 0)).toStrictEqual([6, 9, 5, 2, 1]);
    // move in the middle
    expect(moveArrayItem([9, 5, 6, 2, 1], 3, 2)).toStrictEqual([9, 5, 2, 6, 1]);
    // move to the end
    expect(moveArrayItem([9, 5, 6, 2, 1], 1, 4)).toStrictEqual([9, 6, 2, 1, 5]);
});