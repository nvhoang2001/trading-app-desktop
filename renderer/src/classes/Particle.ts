import { Point, Velocity } from '@/@types/particles';
import distanceOfTwoPoint from '@/helper/distance';

const MAX_RADIUS = 10,
    MIN_RADIUS = 5;

class Particle {
    static activeAreaRadius = 50;
    static adjacentArea = 100;
    static boundary = {
        width: globalThis?.innerWidth || 0,
        height: globalThis?.innerHeight || 0,
    };

    adjacentPoints: Particle[];

    constructor(
        public x: number,
        public y: number,
        public radius: number,
        public color: string,
        private velocity: Velocity
    ) {
        this.adjacentPoints = [];
    }

    update(mouse: Point, particles: Particle[], context: CanvasRenderingContext2D) {
        this.adjacentPoints = [];

        if (this.x - this.radius <= 0 || this.x + this.radius >= Particle.boundary.width) {
            this.velocity.x *= -1;
        }

        if (this.y - this.radius <= 0 || this.y + this.radius >= Particle.boundary.height) {
            this.velocity.y *= -1;
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if (distanceOfTwoPoint(this, mouse) <= Particle.activeAreaRadius) {
            this.radius = this.radius >= MAX_RADIUS ? MAX_RADIUS : this.radius + Math.abs(this.velocity.x / 5);
        } else {
            this.radius = this.radius <= MIN_RADIUS ? MIN_RADIUS : this.radius - Math.abs(this.velocity.x / 5);
        }

        for (const particle of particles) {
            if (particle === this) {
                continue;
            }

            if (
                distanceOfTwoPoint(this, particle) <= Particle.adjacentArea &&
                !particle.adjacentPoints.includes(this)
            ) {
                this.adjacentPoints.push(particle);
            }
        }

        this.draw(context);
    }

    draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = this.color;
        context.fill();

        for (const particle of this.adjacentPoints) {
            context.moveTo(this.x, this.y);
            context.lineTo(particle.x, particle.y);
        }
        context.strokeStyle = this.color;
        context.stroke();

        context.closePath();
    }
}

export default Particle;
