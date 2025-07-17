import { ErrorFrame, FrameType } from '../../types';

export function addFrameNumbers(frames: Array<ErrorFrame>): Array<ErrorFrame & { frame_number: number }> {
    return frames.map((frame, i) => ({
        ...frame,
        frame_number: frames.length - i,
    }));
}

export function getFrameType(frame: ErrorFrame): FrameType {
    if (! frame.application_frame) {
        return 'vendor';
    }

    if (frame.relative_file === 'unknown') {
        return 'unknown';
    }

    return 'application';
}
