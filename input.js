export class InputComponent extends Component {
  constructor() {
    super("input");
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
  }
}

export class InputSystem {
 constructor() {
    this.canvas = document.getElementById("game-canvas");;
	this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.touchEvents = [];
    this.keyDownHandler = (event) => this.keyDown(event);
    this.keyUpHandler = (event) => this.keyUp(event);
    this.touchStartHandler = (event) => this.touchStart(event);
    this.touchMoveHandler = (event) => this.touchMove(event);
    this.touchEndHandler = (event) => this.touchEnd(event);
    this.start();
  }

  keyDown(event) {
    switch (event.keyCode) {
      case 37: // left arrow
        this.left = true;
        break;
      case 38: // up arrow
        this.up = true;
        break;
      case 39: // right arrow
        this.right = true;
        break;
      case 40: // down arrow
        this.down = true;
        break;
    }
  }

  keyUp(event) {
    switch (event.keyCode) {
      case 37: // left arrow
        this.left = false;
        break;
      case 38: // up arrow
        this.up = false;
        break;
      case 39: // right arrow
        this.right = false;
        break;
      case 40: // down arrow
        this.down = false;
        break;
    }
  }
  touchStart(event) {
    let touchesOnCanvas = [];
    const canvasRect = this.canvas.getBoundingClientRect();
    for (const touch of event.touches) {
      if (touch.target === this.canvas) {
        touchesOnCanvas.push({
          x: touch.clientX - canvasRect.left,
          y: touch.clientY - canvasRect.top,
          id: touch.identifier
        });
      }
    }
    if (touchesOnCanvas.length > 0) {
      event.preventDefault();
      this.touchEvents = this.touchEvents.concat(touchesOnCanvas);
    }
  }

  touchMove(event) {
    let touchesOnCanvas = [];
    const canvasRect = this.canvas.getBoundingClientRect();
    for (const touch of event.touches) {
      if (touch.target === this.canvas) {
        touchesOnCanvas.push({
          x: touch.clientX - canvasRect.left,
          y: touch.clientY - canvasRect.top,
          id: touch.identifier
        });
      }
    }
    if (touchesOnCanvas.length > 0) {
      event.preventDefault();
      this.touchEvents = this.touchEvents.map((touchEvent) => {
        const matchingTouch = touchesOnCanvas.find((touch) => touch.id === touchEvent.id);
        if (matchingTouch) {
          return {
            x: matchingTouch.x,
            y: matchingTouch.y,
            id: touchEvent.id
          };
        }
        return touchEvent;
      });
    }
  }

  touchEnd(event) {
    let touchesOnCanvas = [];
    for (const touch of event.touches) {
      const x = touch.clientX - this.canvas.offsetLeft;
      const y = touch.clientY - this.canvas.offsetTop;
      if (touch.target === this.canvas && x >= 0 && x <= this.canvas.offsetWidth && y >= 0 && y <= this.canvas.offsetHeight) {
        touchesOnCanvas.push(touch);
      }
    }
    if (touchesOnCanvas.length > 0) {
      event.preventDefault();
      this.touchEvents = this.touchEvents.filter((touchEvent) => {
        return touchesOnCanvas.some((touch) => touch.identifier === touchEvent.identifier);
      });
    } else {
      this.touchEvents = [];
    }
  }

  update(entities) {
    // Update the input state of all entities with an InputComponent
    for (const entity of entities) {
      if (entity.hasComponent("input")) {
        const input = entity.getComponent("input");
        input.up = this.up;
        input.down = this.down;
        input.left = this.left;
        input.right = this.right;

        const transform = entity.getComponent("transform");
        const collision = entity.getComponent("collision");

        for (const touchEvent of this.touchEvents) {
          const dx = touchEvent.x - transform.x;
          const dy = touchEvent.y - transform.y;
          input.left = (dx < 0);
          input.right = (dx > collision.width);
          input.up = (dy < 0);
          input.down = (dy > collision.height);
        }
      }
    }
  }

  start() {
    // Listen for keydown, keyup, touchstart, touchmove, and touchend events
    window.addEventListener("keydown", this.keyDownHandler);
    window.addEventListener("keyup", this.keyUpHandler);
    window.addEventListener("touchstart", this.touchStartHandler);
    window.addEventListener("touchmove", this.touchMoveHandler);
    window.addEventListener("touchend", this.touchEndHandler);
    document.addEventListener("keydown", (event) => {
      if (event.code === "ArrowUp" || event.code === "ArrowDown" || event.code === "ArrowLeft" || event.code === "ArrowRight") {
        event.preventDefault();
	  }
    });
  }

  stop() {
    // Stop listening for keydown, keyup, touchstart, touchmove, and touchend events
    window.removeEventListener("keydown", this.keyDownHandler);
    window.removeEventListener("keyup", this.keyUpHandler);
    window.removeEventListener("touchstart", this.touchStartHandler);
    window.removeEventListener("touchmove", this.touchMoveHandler);
    window.removeEventListener("touchend", this.touchEndHandler);
  }
}
