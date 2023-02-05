const orange = "#ff7926";

export class Player {
  constructor(args) {
    let { cord, size, color, ctx, plane, DIM } = args;
    this.size = size;
    this.DIM = DIM;
    this.plane = plane;
    this.cord = cord;
    this.ctx = ctx;
    this.previousCord = { ...this.cord };
    this.color = color;
    this.isMoving = false;
    this.possibleMoves = this.getPossibleDirections();
    this.draw();
  }
  draw() {
    this.ctx.fillStyle = orange;
    this.ctx.fillRect(
      this.previousCord.x * this.size.width,
      this.previousCord.y * this.size.height,
      this.size.width,
      this.size.height
    );

    this.ctx.fillStyle = this.color;

    this.ctx.fillRect(
      this.cord.x * this.size.width,
      this.cord.y * this.size.height,
      this.size.width,
      this.size.height
    );
  }
  getPossibleDirections() {
    let possibleDirections = {
      up:
        this.plane[
          Math.floor(this.cord.y - 0.01) * this.DIM.width +
            Math.floor(this.cord.x)
        ] == 0,
      right:
        this.plane[
          Math.floor(this.cord.y) * this.DIM.width + Math.floor(this.cord.x + 1)
        ] == 0,
      down:
        this.plane[
          Math.floor(this.cord.y + 1) * this.DIM.width + Math.floor(this.cord.x)
        ] == 0,
      left:
        this.plane[
          Math.floor(this.cord.y) * this.DIM.width +
            Math.floor(this.cord.x - 0.01)
        ] == 0,
    };
    return possibleDirections;
  }

  up() {
    this.isMoving = true;
    if (
      this.plane[
        Math.floor(this.cord.y - 0.01) * this.DIM.width +
          Math.floor(this.cord.x)
      ] == 0
    ) {
      this.cord.y -= 0.5;
      this.cord.y = Math.round(this.cord.y * 10) / 10;

      this.draw();
      setTimeout(() => {
        this.up();
      }, 1000 / 60);
    } else {
      this.possibleMoves = this.getPossibleDirections();
      this.isMoving = false;
    }
    this.previousCord = { ...this.cord };
  }
  right() {
    this.isMoving = true;
    if (
      this.plane[
        Math.floor(this.cord.y) * this.DIM.width + Math.floor(this.cord.x + 1)
      ] == 0 ||
      (this.cord.x > this.DIM.width - 1.5 && this.cord.x < this.DIM.width)
    ) {
      this.cord.x += 0.5;
      this.cord.x = Math.round(this.cord.x * 10) / 10;

      this.draw();
      setTimeout(() => {
        this.right();
      }, 1000 / 60);
      if (this.cord.x == this.DIM.width - 1) {
        this.leave();
      }
    } else {
      if (this.cord.x > this.DIM.width - 1) {
        this.possibleMoves = {
          up: false,
          right: false,
          down: false,
          left: false,
        };
      } else {
        this.possibleMoves = this.getPossibleDirections();
      }
      this.isMoving = false;
    }
    this.previousCord = { ...this.cord };
  }
  down() {
    this.isMoving = true;
    if (
      this.plane[
        Math.floor(this.cord.y + 1) * this.DIM.width + Math.floor(this.cord.x)
      ] == 0 ||
      (this.cord.y > this.DIM.height - 1.5 && this.cord.y < this.DIM.height)
    ) {
      this.cord.y += 0.5;
      this.cord.y = Math.round(this.cord.y * 10) / 10;
      this.draw();

      setTimeout(() => {
        this.down();
      }, 1000 / 60);
      if (this.cord.y == this.DIM.height - 1) {
        this.leave();
      }
    } else {
      this.possibleMoves = this.getPossibleDirections();
      this.isMoving = false;
    }
    this.previousCord = { ...this.cord };
  }
  left() {
    this.isMoving = true;
    if (
      this.plane[
        Math.floor(this.cord.y) * this.DIM.width +
          Math.floor(this.cord.x - 0.01)
      ] == 0
    ) {
      this.cord.x -= 0.5;
      this.cord.x = Math.round(this.cord.x * 10) / 10;

      this.draw();
      setTimeout(() => {
        this.left();
      }, 1000 / 60);
    } else {
      this.possibleMoves = this.getPossibleDirections();
      this.isMoving = false;
    }
    this.previousCord = { ...this.cord };
  }
}
