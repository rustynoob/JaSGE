export class Vector {
  constructor(tuple) {
    this.x = tuple.x;
    this.y = tuple.y;
  }

  add(other) {
    return new Vector({x:this.x + other.x, y:this.y + other.y});
  }

  subtract(other) {
    return new Vector({x:this.x - other.x, y:this.y - other.y});
  }

  multiply(scalar) {
    return new Vector({x:this.x * scalar, y:this.y * scalar});
  }

  divide(scalar) {
    return new Vector({x:this.x / scalar, y:this.y / scalar});
  }

  normalize() {
    const length = this.length();
    return new Vector({x:this.x / length, y:this.y / length});
  }

  length() {
    if (this.x === Infinity || this.y === Infinity) {
      return Infinity;
    }
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
   dotProduct(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  crossProduct(vector) {
    return this.x * vector.y - this.y * vector.x;
  }

  angle(vector) {
    return Math.atan2(this.crossProduct(vector), this.dotProduct(vector));
  }

  rotate(angle) {
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    this.x = this.x * cos - this.y * sin;
    this.y = this.x * sin + this.y * cos;
  }

  project(vector) {
    const scalar = this.dotProduct(vector) / vector.dotProduct(vector);
    return new Vector({x:vector.x * scalar, y:vector.y * scalar});
  }

  reflect(normal) {
    const projection = this.project(normal);
    return new Vector({x:this.x - 2 * projection.x, y:this.y - 2 * projection.y});
  }

  distanceTo(vector) {
    return Math.sqrt(Math.pow(vector.x - this.x, 2) + Math.pow(vector.y - this.y, 2));
  }
}
export function generatePolygon(sides, radius) {
  const angleIncrement = (2 * Math.PI) / sides;
  let currentAngle = 0;
  const vertices = [];
  for (let i = 0; i < sides; i++) {
    const x = Math.cos(currentAngle)*radius;
    const y = Math.sin(currentAngle)*radius;
    vertices.push({ x, y });
    currentAngle += angleIncrement;
  }
  return vertices;
}

