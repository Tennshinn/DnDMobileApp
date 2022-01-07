import toml from "toml";
import mathjs from "mathjs";
import ItemData from "./ItemData";
import Character from "./Character";

class CharacterClass {
    constructor(name, specializations, image) {
        this.name=name;
        this.specializations=specializations;
        this.image = image;
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
            repository.classes.append(new CharacterClass(key, value.specializations, value.image));
        }
    }
}

export class Package {
    constructor(name="", link=""){
        this.name = name;
        this.link = link;
    }
}

export class Repository {
    constructor(){
        this.characters = [];
        this.items = [];
        this.classes = [];
        this.packages = [];
        this.seed();
    }

    seed() {
        this.classes = [new CharacterClass("Wizard", [], require('../img/fire-bowl.png'))];
        this.characters = Array.from(
            {length:7}, 
            ()=>new Character("John "+(Math.random().toString()).substring(2, 4), "Wizard", "", "", "", this));
        this.packages = Array.from(
            {length:4}, 
            ()=>new Package("Package "+(Math.random().toString()).substring(2, 4), "https://pastebin.com/raw/example"));
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