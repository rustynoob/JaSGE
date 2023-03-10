
export const debug = true;

export class Entity {
  constructor() {
    this.components = new Map();
  }

  addComponent(component) {
    this.components.set(component.name, component);
  }

  removeComponent(componentName) {
    this.components.delete(componentName);
  }

  hasComponent(componentName) {
    return this.components.has(componentName);
  }

  getComponent(componentName) {
    return this.components.get(componentName);
  }
  getComponents(componentName) {
    let components = [];
    for (const component of this.components.values()) {
      if (component.name === componentName) {
        components.push(component);
      }
    }
    return components;
  }

  delete(){
	  this.addComponent(new DeleteComponent());
  }
}

export class Component {
  constructor(name) {
    this.name = name;
  }

  destroy() {
	 // This method should ever be overridden by child classes 
    // use override cleanup() to add additional cleanup logic
	 
    // Decrement the shouldProcessBeforeDelete ttl
    if (this.shouldProcessBeforeDelete > 0) {
      this.shouldProcessBeforeDelete--;
    }
    this.cleanUp();
  }

  cleanUp() {
    // Overrode This method in the child classes to add additional cleanup logic
  }
}

export class DeleteComponent extends Component{
	constructor(){
	  super("delete");
	}
}

export class TransformComponent extends Component {
  constructor(x, y, z = 0, rotation = 0, scale = 1) {
    super("transform");
    this.x = x;
    this.y = y;
    this.z = z;
    this.rotation = rotation;
    this.scale = scale;
  }
}


export class Game {
  constructor() {
    this.entities = new Set();
    this.systems = [];
  }

  addEntity(entity) {
    this.entities.add(entity);
  }

  removeEntity(entity) {
    // Add the delete component to the entity
    entity.addComponent(new DeleteComponent());
  }

  addSystem(system) {
    this.systems.push(system);
  }

  update(dt) {
    for (const system of this.systems) {
      system.update(this.entities, dt);
    }

    // Check if any entities have the delete component
    for (const entity of this.entities) {
      if (entity.hasComponent("delete")) {
        let shouldDelete = true;

        // Call the destroy method on all components that have a processBeforeDelete ttl greater than zero
        for (const component of entity.components.values()) {
          if (component.shouldProcessBeforeDelete > 0) {
            component.destroy();
            shouldDelete = false;
          }
        }

        // If all components are ready to be deleted, remove the entity
        if (shouldDelete) {
          this.entities.delete(entity);
        }
      }
    }
  }
}

