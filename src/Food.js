import * as Phaser from "phaser";

const Food = () =>
  new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    initialize: (scene, x, y) => {
      Phaser.GameObjects.Image.call(this, scene);

      this.setTexture("food");
      this.setPosition(x * 16, y * 16);
      this.setOrigin(0);

      this.total = 0;

      scene.children.add(this);
    },
    eat: () => {
      this.total++;
    },
  });

  export { Food };
  