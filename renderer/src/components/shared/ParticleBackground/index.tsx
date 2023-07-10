import React, { RefObject } from 'react';
import Particle from '@/classes/Particle';
import { Point } from '@/@types/particles';
import randomIntFromRange from '@/helper/randomNumberFromRange';

interface ComponentProps {
    className: string;
}

const BACKGROUND_COLOR = '#00ffefad';

export default class ParticleBackground extends React.Component<ComponentProps> {
    canvasRef: RefObject<HTMLCanvasElement>;
    isMounting!: boolean;
    particles: Particle[];
    canvasContext: CanvasRenderingContext2D | undefined;
    size: { width: number; height: number };
    mouse: Point;

    constructor(props: ComponentProps) {
        super(props);
        this.canvasRef = React.createRef<any>();
        this.particles = [];
        this.size = { height: 0, width: 0 };
        this.mouse = { x: 0, y: 0 };

        this.animate = this.animate.bind(this);
    }

    mouseMoveHandler = (event: MouseEvent) => {
        this.mouse.x = event.clientX;
        this.mouse.y = event.clientY;
    };

    initCanvas() {
        this.particles = [];
        Particle.boundary = this.size;
        this.canvasRef.current && (this.canvasRef.current.width = this.size.width);
        this.canvasRef.current && (this.canvasRef.current.height = this.size.height);

        for (let i = 0; i < 100; i++) {
            const x = randomIntFromRange(0, this.size.width);
            const y = randomIntFromRange(0, this.size.height);
            const radius = 5;
            const color = '#fff';
            const particleVelocity = {
                x: (Math.random() - 0.5) * 1.5,
                y: (Math.random() - 0.5) * 1.5,
            };

            this.particles.push(new Particle(x, y, radius, color, particleVelocity));
        }

        this.animate();
    }

    animate() {
        if (!this.canvasContext) {
            return;
        }

        const gradient = this.canvasContext.createLinearGradient(0, 0, this.size.width, this.size.height);
        gradient.addColorStop(0, '#c850c0');
        gradient.addColorStop(1, '#4158d0');

        this.canvasContext.fillStyle = gradient;

        this.canvasContext.fillRect(0, 0, this.size.width, this.size.height);

        this.particles.forEach((particle) => {
            particle.update(this.mouse, this.particles, this.canvasContext as CanvasRenderingContext2D);
        });

        this.isMounting && requestAnimationFrame(this.animate);
    }

    componentDidMount() {
        this.isMounting = true;
        this.canvasContext = this.canvasRef.current?.getContext('2d') as CanvasRenderingContext2D;
        this.size = {
            width: window.innerWidth,
            height: window.innerHeight,
        };

        this.initCanvas();
        window.addEventListener('mousemove', this.mouseMoveHandler);
    }

    render(): React.ReactNode {
        return <canvas ref={this.canvasRef} className={this.props.className}></canvas>;
    }

    componentWillUnmount() {
        this.isMounting = false;
        console.log('Will unmount');

        window.removeEventListener('mousemove', this.mouseMoveHandler);
    }
}
