import { hashStringArray, colorFromHash } from './helpers';
import Panel from './Panel';

export default class Character {
    constructor(name = "", characterClass = "", level = "", specialization = "") {
        this.name = name;
        this.characterClass = characterClass;
        this.level = level;
        this.specialization = specialization;
        this.inventory = ["Tricks", "Attack", "Defense", "Healing"].map(e=>new Panel(e, []));
    }

    getColor() {
        const toHash = [this.name, this.characterClass, this.level, this.specialization];
        return colorFromHash(hashStringArray(toHash));
    }
}