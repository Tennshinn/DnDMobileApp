export default class ItemData {
    constructor(name, image, description, icons) {
      this.name = name ?? "Health Potion";
      this.image = image ?? require('../img/fire-bowl.png');
      this.description = description ?? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates dolorem molestiae necessitatibus quod. Veniam facere nobis recusandae repudiandae iste voluptas minima aut repellendus nihil quis exercitationem quas, inventore iusto. Minima?";
      this.icons = icons ?? "4⚅     2⚂";
    }
  }