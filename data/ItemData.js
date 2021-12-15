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

function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hashString(s) {
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
};

export default class ItemData {
    constructor(name, image, description, icons) {
      this.name = name ?? "Health Potion";
      this.image = image ?? require('../img/fire-bowl.png');
      this.description = description ?? `${Math.random()} Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates dolorem molestiae necessitatibus quod. Veniam facere nobis recusandae repudiandae iste voluptas minima aut repellendus nihil quis exercitationem quas, inventore iusto. Minima?`;
      this.icons = icons ?? parseDice("4d20    2d10");

      const toHash = [this.name, this.description];
      const hash = toHash.reduce((acc, curr)=>acc+hashString(curr), 0);
      this.color = hslToHex(hash%360, 12, 65); // S and L same as PRIMARY_COLOR in style 
    }
  }