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

function parseDice(text) {
  let result = text;
  const mappingsSortedByKeyLength = Object.entries(TEXT_TO_ICON).sort((a, b)=>b[0].length-a[0].length);
  for (let [k, v] of mappingsSortedByKeyLength) {
    result=result.replace(k, v);
  }
  return result;
}

export default class ItemData {
  constructor(name, image, description, icons, filter) {
    this.name = name ?? "Health Potion";
    this.image = image ?? require('../img/fire-bowl.png');
    this.description = description ?? `${Math.random()} Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates dolorem molestiae necessitatibus quod. Veniam facere nobis recusandae repudiandae iste voluptas minima aut repellendus nihil quis exercitationem quas, inventore iusto. Minima?`;
    this.icons = icons ?? parseDice("4d20    2d10");
    this.filter = filter ?? ""; 
  }

  getImage(){
    return this.image;
  }

  getColor(){
    const toHash = [this.name, this.description];
    return colorFromHash(hashStringArray(toHash));    
  }
}