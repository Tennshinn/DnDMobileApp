import toml from "toml";
import mathjs from "mathjs";
import ItemData from "./ItemData";
import Character from "./Character";

class CharacterClass {
    constructor(name, specializations, image, source) {
        this.name=name;
        this.specializations=specializations;
        this.image = image;
        this.source = source;
    }

    getKey() {
      return this.source+"/"+this.name;
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

export class Package {
    constructor(name="", link=""){
        this.name = name;
        this.link = link;
    }
}

export class GridItemData {
    constructor(name="", image="", color=""){
        this.name = name;
        this.image = image;
        this.color = color;
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
        this.classes = [
            new CharacterClass("Wizard", 
            ["Abjurer", "Conjurer", "Diviner", "Enchanter", "Evoker", "Illusionist", "Necromancer", "Transmuter"], 
            require('../img/fire-bowl.png'), "seed()"),
            new CharacterClass("Paladin", 
            ["Oath of the Ancients", "Oath of Devotion:", "Oath of Vengeance"], 
            require('../img/fire-bowl.png'), "seed()"),
            new CharacterClass("Rougue", 
            [], 
            require('../img/fire-bowl.png'), "seed()")
        ];
        this.characters = Array.from(
            {length:7}, 
            ()=>new Character("John "+(Math.random().toString()).substring(2, 4), "Wizard", "", "", ""));
        this.packages = Array.from(
            {length:4}, 
            ()=>new Package("Package "+(Math.random().toString()).substring(2, 4), "https://pastebin.com/raw/example"));
        
        this.items = Array.from(
            { length: 15 },
            () => new ItemData("Healing Potion " + (Math.random().toString()).substring(0, 5), undefined, undefined, undefined, undefined, "seed()"));
    }

    async addPackage($package) {
        this.packages.push($package);

        const resonse = await fetch($package.link);
        const text=await resonse.text();
        this.parsePackage($package.name, text);
    }
    
    parsePackage(packageName, packageText) {
        console.log("Parsing", packageText);
        try {
            const $package = toml.parse(packageText);
        
            for (const [key, value] of Object.entries($package)) {
                if (value.type=="item") {
                    const newItem=new ItemData(key, value.image, value.description, undefined, value.filter, packageName);
                    this.items.push(newItem);
                    console.log("Added item", newItem.getKey());
                } else if (value.type=="class") {
                    const newCharacter = new CharacterClass(key, value.specializations, value.image, packageName);
                    this.classes.push(newCharacter);
                    console.log("Added character", newCharacter.getKey());
                }
            }
        } catch(e) {
            console.log("Error while parsing package", packageName);
            console.log(e);
        }
    }

    getImageForCharacter(character) {
        return (this.classes?.find(c => c.name == character.characterClass)?.image) ?? "";
    }

    characterGridItem(character) {
        return new GridItemData(character.name, this.getImageForCharacter(character), character.getColor());
    }

    itemGridItem(item) {
        return new GridItemData(item.name, item.image, item.getColor());
    }

    itemsAvailable(character) {
        return this.items.filter(i=>this.itemAvailable(i, character));
    }

    itemAvailable(item, character) {
        if (!item.filter) {
            return true;
        }
        try {
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
        } catch(e) {
            console.log("Error while checking if item is available:");
            console.log(e);
            return false;
        }
    } 
}

export const REPOSITORY = new Repository();