import { hashStringArray, colorFromHash } from './helpers';

const TEXT_TO_ICON = {
  d8 : "\uf13e",
  d10 : "\uf102",
  d12 : "\uf10e",
  d2 : "\uf118",
  d20 : "\uf125",
  d4 : "\uf130",
  d8 : "\uf13e",
  d6 : "\uf18f"
}

export function parseDice(text) {
  let result = text;
  const mappingsSortedByKeyLength = Object.entries(TEXT_TO_ICON).sort((a, b)=>b[0].length-a[0].length);
  for (let [k, v] of mappingsSortedByKeyLength) {
    result=result.replace(k, v);
  }
  return result;
}

export default class ItemData {
  constructor(name, image, description, icons, filter, source="") {
    this.name = name ?? "Health Potion";
    this.image = image ?? "fire/carl-olsen/flame.png";
    this.description = description ?? `Can be only used in the distance of 10 meters. Throw 4d20, if result is larger than 20 throw 2d10. This will be the damage taken by the target. On success causes area damage of 1 in the range of 1 meter.`;
    this.icons = icons ?? "4d20    2d10";
    this.filter = filter ?? ""; 
    this.source = source ?? ""; 
  }

  getParsedDescription() {
    return parseDice(this.description);
  }

  getParsedIcons() {
    return parseDice(this.icons);
  }

  getColor(){
    const toHash = [this.name, this.description];
    return colorFromHash(hashStringArray(toHash));    
  }

  getKey() {
    return this.source+"/"+this.name;
  }
}