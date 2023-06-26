import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import * as Phaser from "phaser";

import { Food } from "./Food";
import { Snake } from "./Snake";

const App = () => {
  const [food, setFood] = useState();
  const [snake, setSnake] = useState();
  const [cursors, setCursors] = useState();
  const game = useRef(null);

  const preload = useCallback(() => {
    this.load.image("food", "/food.png");
    this.load.image("body", "/body.png");
  }, []);

  const create = useCallback(() => {
    setFood(new Food(this, 3, 4));
    setSnake(new Snake(this, 8, 8));
    setCursors(this.input.keyboard.createCursorKeys());
  }, []);

  const repositionFood = useCallback(() => {
    var testGrid = [];

    for (let y = 0; y < 30; y++) {
      testGrid[y] = [];
      for (let x = 0; x < 40; x++) {
        testGrid[y][x] = true;
      }
    }

    snake.updateGrid(testGrid);

    var validLocations = [];
    for (let y = 0; y < 30; y++) {
      for (let x = 0; x < 40; x++) {
        if (testGrid[y][x] === true) {
          validLocations.push({ x: x, y: y });
        }
      }
    }

    if (validLocations.length > 0) {
      var pos = Phaser.Math.RND.pick(validLocations);
      food.setPosition(pos.x * 16, pos.y * 16);
      return true;
    } else {
      return false;
    }
  }, [food, snake]);

  const update = useCallback(
    (time, delta) => {
      if (!snake.alive) {
        return;
      }

      if (cursors.left.isDown) {
        snake.faceLeft();
      } else if (cursors.right.isDown) {
        snake.faceRight();
      } else if (cursors.up.isDown) {
        snake.faceUp();
      } else if (cursors.down.isDown) {
        snake.faceDown();
      }

      if (snake.update(time)) {
        if (snake.collideWithFood(food)) {
          repositionFood();
        }
      }
    },
    [food, snake, cursors, repositionFood]
  );

  const phaserConfig = useMemo(
    () => ({
      type: Phaser.WEBGL,
      width: 640,
      height: 480,
      backgroundColor: "#bfcc00",
      parent: "phaser",
      scene: {
        preload,
        create,
        update,
      },
    }),
    [create, preload, update]
  );

  useEffect(() => {
    game.current = new Phaser.Game(phaserConfig);
  }, [phaserConfig]);

  return <div id="phaser" ref={game} />;
};

export default App;
