import toml from "toml";
import mathjs from "mathjs";
import ItemData from "./ItemData";

class CharacterClass {
    constructor(name, specializations) {
        this.name=name;
        this.specializations=specializations;
    }
}

export class Inventory {
    constructor(panels) {
        this.panels=panels;
    }
}

export class Panel {
    constructor(name, itemIds) {
        this.name=name;
        this.itemIds=itemIds;
    }
}

function parsePackage(packageText, repository) {
    const $package = toml.parse(packageText);

    for (const [key, value] of Object.entries($package)) {
        if (value.type=="item") {
            repository.items.append(new ItemData(key, value.image. value.description, value.filter));
        } else if (value.type=="class") {
            repository.classes.append(new CharacterClass(key, value.specializations));
        }
    }
}

export class Character {
    constructor(name, characterClass, level, specialization, inventory=[]) {
        this.name=name;
        this.characterClass=characterClass;
        this.level=level;
        this.specialization=specialization;
        this.inventory=[];
    }
}

export class Repository {
    constructor(){
        this.characters = [];
        this.items = [];
        this.classes = [];
        this.seed();
    }

    seed() {
        this.characters = Array.from(
            {length:7}, 
            ()=>new Character("John "+(Math.random().toString()).substring(0, 5)));
    }

    itemsAvailable(character) {
        return this.items.filter(i=>this.itemAvailable(i, character));
    }

    itemAvailable(item, character) {
        const parser = mathjs.parser();
        for (const [key, value] of Object.entries(character)) {
            parser.evaluate(`${key}="${value}"`);
        }
        for (const [key, value] of Object.entries(this.classes)) {
            parser.evaluate(`${key}="${key}"`);
            for (const specialization of value.specializations) {
                parser.evaluate(`${specialization}="${specialization}"`);
            }
        }
        return parser.evaluate(item.filter);
    } 
}

export const REPOSITORY = new Repository();