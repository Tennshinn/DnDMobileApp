import { hashStringArray, colorFromHash } from './helpers';

export default class Character {
    constructor(name = "", characterClass = "", level = "", specialization = "") {
        this.name = name;
        this.characterClass = characterClass;
        this.level = level;
        this.specialization = specialization;
        this.inventory = [];
    }

    getColor() {
        const toHash = [this.name, this.characterClass, this.level, this.specialization];
        return colorFromHash(hashStringArray(toHash));
    }
}