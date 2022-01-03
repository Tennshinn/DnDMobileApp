import toml from "toml";
import mathjs from "mathjs";

class CharacterClass {
    constructor(name, specializations) {
        this.name=name;
        this.specializations=specializations;
    }
}

function parsePackage(packageText) {
    const package = toml.parse(packageText);

    for (const [key, value] of Object.entries(package)) {
        if (value.type=="item") {
            new ItemData(key, value.image. value.description, value.filter);
        } else if (value.type=="class") {
            new CharacterClass(key, value.specializations);
        }
    }
}

export class Repository {
    cosntructor(){
        this.items = [];
        this.classes = [];
    }

    itemsAvailable(character) {
        return this.items.filter(i=>this.itemAvailable(i, character));
    }

    itemAvailable(item, character) {
        const parser = math.parser();
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

export class Character {
    constructor(name, characterClass, level, specialization, repository, inventory=null) {
        this.name=name;
        this.characterClass=characterClass;
        this.level=level;
        this.specialization=specialization;
        if (inventory==null){
            inventory=new Inventory(new Panel("All", repository.itemsAvailable(this)));
        }
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