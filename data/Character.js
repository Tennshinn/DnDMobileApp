import { hashStringArray, colorFromHash } from './helpers';

export default class Character {
    constructor(name = "", characterClass = "", level = "", specialization = "", inventory = [], repository = null) {
        this.name = name;
        this.characterClass = characterClass;
        this.level = level;
        this.specialization = specialization;
        this.inventory = inventory;
        this.repository = repository;
    }

    getImage() {
        return (this.repository?.classes?.find(c => c.name == this.characterClass)?.image) ?? "";
    }

    getColor() {
        const toHash = [this.name, this.characterClass, this.level, this.specialization];
        return colorFromHash(hashStringArray(toHash));
    }
}