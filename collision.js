import {debug, Entity, Component, DeleteComponent, TransformComponent, Game} from './engine.js';
import {Vector} from './vector.js';


export class CollisionComponent extends Component {
  constructor(polygon) {
    super("collision");
    this.vertices = [];
    for(const vertex of polygon){
      this.vertices.push(new Vector(vertex))
    }
    this.width = this.getWidth();
    this.height = this.getHeight();
      // List of currently active collisions for this entity
    this.activeCollisions = [];
    this.collisionCallbacks = {};
  }

  registerCallback(componentId, callback) {
    this.collisionCallbacks[componentId] = callback;
  }

  handleCollision(entity, collision, normal) {
    this.activeCollisions.push({collision:collision,normal:normal});
    for(const key of Object.keys(this.collisionCallbacks)){
      if(collision.hasComponent(key)){
        const callback = this.collisionCallbacks[key];
        callback(entity, collision);
      }
    }
  }

  getWidth() {
    // Find the minimum and maximum x values of the polygon's points
    let minX = Number.MAX_VALUE;
    let maxX = Number.MIN_VALUE;
    for (const point of this.vertices) {
      if (point.x < minX) minX = point.x;
      if (point.x > maxX) maxX = point.x;
    }
    return maxX - minX;
  }

  getHeight() {
    // Find the minimum and maximum y values of the polygon's points
    let minY = Number.MAX_VALUE;
    let maxY = Number.MIN_VALUE;
    for (const point of this.vertices) {
      if (point.y < minY) minY = point.y;
      if (point.y > maxY) maxY = point.y;
    }
    return maxY - minY;
  }
  collisionDetected() {
    return this.activeCollisions.length > 0;
  }
}

export class CollisionSystem {
  constructor() {
    // set up any necessary data structures or variables here
  }

  update(entities, dt) {
    // Get an array of entities with collision components
    const colliders = Array.from(entities.values()).filter(entity => entity.hasComponent('collision'));

    // Clear the active collisions list for all entities
    for (const collider of colliders) {
        collider.getComponent('collision').activeCollisions = [];
    }
     // Check for collisions between entities
    for (let i = 0; i < colliders.length; i++) {
      {//if(colliders[i].hasComponent("physics"))
        for (let j = i + 1; j < colliders.length; j++) {

          const transform1 = colliders[i].getComponent("transform");
          const transform2 = colliders[j].getComponent("transform");
          const collider1 = colliders[i].getComponent("collision");
          const collider2 = colliders[j].getComponent("collision");
          const p1t = this.transform(transform1,collider1.vertices);
          const p2t = this.transform(transform2,collider2.vertices)
           if(this.checkCollision(p1t,p2t)){
            const normal = this.getCollisionNormal( p1t,p2t);
            this.handleCollision(colliders[i], colliders[j], normal);
          }
        }
      }
    }
  }

  getCollisionNormal(polygon1, polygon2) {
  // Find the axis with the smallest overlap
  let overlap = Infinity;
  let normal = new Vector({ x: 0, y: 0 });
  // Test polygon1's sides
  for (const vertex of polygon1) {
    if(vertex !== polygon1[0]){
      const axis = new Vector({ x: vertex.y - polygon1[0].y, y: -(vertex.x - polygon1[0].x) });
      const projection1 = this.getMinMaxProjection(polygon1,axis);
      const projection2 = this.getMinMaxProjection(polygon2,axis);
      // Check if the projections overlap
      if (projection1.max < projection2.min || projection2.max < projection1.min) {
        // There is no overlap on this axis, so there is no collision
        return null;
      }
      // Calculate the overlap on this axis
      const o = Math.min(projection1.max, projection2.max) - Math.max(projection1.min, projection2.min);
      // Check if the overlap is less than the current minimum overlap
      if (o < overlap) {
        overlap = o;
        normal = axis;
      }
    }
  }
  // Test polygon2's sides
  for (const vertex of polygon2) {
    if(vertex !== polygon2[0]){
      const axis = new Vector({ x: vertex.y - polygon2[0].y, y: -(vertex.x - polygon2[0].x) });
      const projection1 = this.getMinMaxProjection(polygon1,axis);
      const projection2 = this.getMinMaxProjection(polygon2,axis);
      // Check if the projections overlap
      if (projection1.max < projection2.min || projection2.max < projection1.min) {
        // There is no overlap on this axis, so there is no collision
        return null;
      }
      // Calculate the overlap on this axis
      const o = Math.min(projection1.max, projection2.max) - Math.max(projection1.min, projection2.min);
      // Check if the overlap is less than the current minimum overlap
      if (o < overlap) {
        overlap = o;
        normal = axis;
      }
    }
  }
  // Normalize the normal
  const n = normal.length();
  if(n!=0){
    normal.x /= n;
    normal.y /= n;
  }
  return normal;
  }
/*
  getCollisionNormal(polygon1, polygon2) {
    // Minimum translation distance (MTD)
    let mtd = new Vector({ x: Infinity, y: Infinity});
    // Closest vertex on polygon1
    let closestVertex1 = null;
    // Closest vertex on polygon2
    let closestVertex2 = null;

    // Iterate through each vertex of polygon1
    for (const vertex1 of polygon1) {
      // Iterate through each vertex of polygon2
      for (const vertex2 of polygon2) {
        // Calculate the distance between the two vertices
        const distance = new Vector(vertex1).distanceTo(vertex2);
        // Check if this distance is the new minimum translation distance
        if (distance < mtd.length()) {
          const v2 = new Vector(vertex2);
          mtd = new Vector(v2.subtract(vertex1));
          closestVertex1 = vertex1;
          closestVertex2 = vertex2;
        }
      }
    }

    // Normalize the MTD vector to get the collision normal
    new Vector(mtd).normalize();
    return mtd;
  }
*/
  checkCollision(polygon1, polygon2) {
    // Check for collision using the Separating Axis Theorem
    // Get the list of normals for each polygon
    const normals1 = this.getNormals(polygon1);
    const normals2 = this.getNormals(polygon2);

    // Check for a collision along each normal
    for (const normal of normals1) {
      if (!this.overlapOnAxis(polygon1, polygon2, normal)) {
        return false;
      }
    }
    for (const normal of normals2) {
      if (!this.overlapOnAxis(polygon1, polygon2, normal)) {
        return false;
      }
    }

    // If all normals have been checked and there was no separation,
    // the polygons must be colliding
    return true;
  }
  transform(transform,polygon){
    const transformed = [];
    for (let i = 0; i < polygon.length; i++) {
      const point = {
          x: polygon[i].x+transform.x,
          y: polygon[i].y+transform.y
      };
      transformed.push(point);
    }
    return transformed;
  }

  getNormals(polygon) {
    const normals = [];
    for (let i = 0; i < polygon.length; i++) {
      const p1 = polygon[i];
      const p2 = polygon[(i + 1) % polygon.length];
      const normal = {
        x: p2.y - p1.y,
        y: p1.x - p2.x,
      };
      normals.push(normal);
    }
    return normals;
  }
  overlapOnAxis(polygon1, polygon2, axis) {
    // Find the minimum and maximum points of projection for each polygon
    const minMax1 = this.getMinMaxProjection(polygon1,axis);
    const minMax2 = this.getMinMaxProjection(polygon2,axis);

    // Check if there is overlap between the projections
    if (minMax1.max < minMax2.min || minMax2.max < minMax1.min) {
      return false;
    }

    return true;
  }


  handleCollision(collider, collidee,normal) {
    // Add the collision to the activeCollisions list of both collider and collidee
    collider.getComponent('collision').handleCollision(collider,collidee, normal);
    collidee.getComponent('collision').handleCollision(collidee,collider, {x:-normal.x,y:-normal.y});

  }


  getMinMaxProjection(vertices, axis) {
  let min = new Vector(vertices[0]).dotProduct(axis);
  let max = min;
  for (let i = 1; i < vertices.length; i++) {
    const projection = new Vector(vertices[i]).dotProduct(axis);
      if (projection < min) {
        min = projection;
      } else if (projection > max) {
        max = projection;
      }
    }
    return { min, max };
  }

}
