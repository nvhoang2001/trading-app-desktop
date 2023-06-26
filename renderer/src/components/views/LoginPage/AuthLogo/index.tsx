import { useRef, MouseEventHandler } from 'react';

const AuthenticationPicture: React.FC = () => {
    const rfImageContainer = useRef<HTMLDivElement>(null);

    const imageMouseEnterHandler = () => {
        rfImageContainer.current!.style.setProperty('--scale-factor', '1.1');
    };

    const imageMouseLeaveHandler = () => {
        rfImageContainer.current!.style.setProperty('--scale-factor', '1');
        rfImageContainer.current!.style.setProperty('--rotage-deg-x', '0deg');
        rfImageContainer.current!.style.setProperty('--rotage-deg-y', '0deg');
    };

    const imageMouseMoveHandler: MouseEventHandler<HTMLDivElement> = (event) => {
        const cursorPosition = { x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY };
        const targetSize = (event.target as HTMLImageElement).getBoundingClientRect();
        const normalizedCursorPosition = {
            x: cursorPosition.x - targetSize.width / 2,
            y: targetSize.height / 2 - cursorPosition.y,
        };
        const cursorAngle = {
            x:
                Math.abs(Math.atan(normalizedCursorPosition.x / normalizedCursorPosition.y)) *
                (cursorPosition.x / targetSize.width) *
                0.5,
            y:
                Math.abs(Math.atan(normalizedCursorPosition.y / normalizedCursorPosition.x)) *
                (cursorPosition.y / targetSize.height) *
                0.5,
        };

        rfImageContainer.current!.style.setProperty('--rotage-deg-x', String(cursorAngle.x) + 'rad');
        rfImageContainer.current!.style.setProperty('--rotage-deg-y', String(cursorAngle.y) + 'rad');
    };

    return (
        <div
            ref={rfImageContainer}
            style={{
                transform:
                    'perspective(300px) rotateX(var(--rotage-deg-x, 0deg)) rotateY(var(--rotage-deg-y, 0deg)) scale3d(var(--scale-factor, 1), var(--scale-factor, 1), var(--scale-factor, 1))',
                willChange: 'transform',
            }}
            className="transition-transform"
            onMouseEnter={imageMouseEnterHandler}
            onMouseLeave={imageMouseLeaveHandler}
            onMouseMove={imageMouseMoveHandler}
        >
            <img src="/images/login.webp" alt="" />
        </div>
    );
};

export default AuthenticationPicture;
