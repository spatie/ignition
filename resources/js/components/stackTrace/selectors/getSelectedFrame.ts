import { State } from '../types';
import { addFrameNumbers } from '../helpers';
import { ErrorFrame } from '../../../types';

export default function getSelectedFrame(state: State): ErrorFrame | null {
    const frames = addFrameNumbers(state.frames);
    const selectedFrame = frames.find((frame) => frame.frame_number === state.selected) as ErrorFrame;

    // Fallback to first frame, just in case
    return selectedFrame || frames[0] || null;
}
