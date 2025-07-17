import React, { useMemo, useReducer } from 'react';
import { getFrameType } from '../helpers';
import stackReducer from '../reducer';
import allVendorFramesAreExpanded from '../selectors/allVendorFramesAreExpanded';
import getFrameGroups from '../selectors/getFrameGroups';
import getSelectedFrame from '../selectors/getSelectedFrame';
import useKeyboardShortcut from '../../../hooks/useKeyboardShortcut';
import SmallButton from '../../ui/SmallButton';
import FrameGroup from './FrameGroup';
import EditorLink from '../../ui/EditorLink';
import FrameCodeSnippet from './FrameCodeSnippet';
import { ErrorFrame } from '../../../types';
import findIndex from 'lodash/findIndex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import FrameArguments from 'components/stackTrace/components/FrameArguments';

type Props = {
    openFrameIndex?: number;
    frames: ErrorFrame[];
};

export default function StackTraceExplorer({ frames, openFrameIndex }: Props) {
    const initialState = useMemo(() => {
        let selectedFrame = 1;

        const firstAppFrameIndex = findIndex(frames, (frame) => getFrameType(frame) === 'application');

        if (firstAppFrameIndex !== -1) {
            selectedFrame = frames.length - firstAppFrameIndex;
        }

        if (openFrameIndex) {
            selectedFrame = frames.length - openFrameIndex;
        }

        return stackReducer({ frames, expanded: [], selected: selectedFrame }, { type: 'COLLAPSE_ALL_VENDOR_FRAMES' });
    }, [frames]);

    const [state, dispatch] = useReducer(stackReducer, initialState);

    const vendorFramesExpanded = useMemo(() => allVendorFramesAreExpanded(state), [state]);
    const frameGroups = useMemo(() => getFrameGroups(state), [state]);
    const selectedFrame = useMemo(() => getSelectedFrame(state), [state]);

    useKeyboardShortcut('j', () => {
        dispatch({ type: 'SELECT_NEXT_FRAME' });
    });

    useKeyboardShortcut('k', () => {
        dispatch({ type: 'SELECT_PREVIOUS_FRAME' });
    });

    return (
        <>
            <aside className="z-30 flex flex-col border-r ~border-gray-200 relative">
                <div className="max-h-[33vh] @4xl:max-h-[none] @4xl:absolute inset-0 flex flex-col overflow-hidden ~bg-white rounded-t-lg">
                    <header className="flex-none px-6 @lg:px-10 h-16 flex items-center justify-start ~bg-white border-b ~border-gray-200">
                        <SmallButton
                            onClick={() =>
                                dispatch({
                                    type: vendorFramesExpanded
                                        ? 'COLLAPSE_ALL_VENDOR_FRAMES'
                                        : 'EXPAND_ALL_VENDOR_FRAMES',
                                })
                            }
                        >
                            <div className={`flex ${vendorFramesExpanded ? 'flex-col-reverse' : 'flex-col'}`}>
                                <FontAwesomeIcon
                                    icon={faAngleUp}
                                    className="-my-px text-[8px] ~text-gray-500 group-hover:text-indigo-500"
                                />
                                <FontAwesomeIcon
                                    icon={faAngleDown}
                                    className="-my-px text-[8px] ~text-gray-500 group-hover:text-indigo-500"
                                />
                            </div>
                            {vendorFramesExpanded ? 'Collapse vendor frames' : ' Expand vendor frames'}
                        </SmallButton>
                    </header>
                    <div id="frames" className="flex-grow overflow-auto scrollbar-hidden-y mask-fade-frames">
                        <ol className="text-sm pb-16">
                            {frameGroups.map((frameGroup, i) => (
                                <FrameGroup
                                    key={i}
                                    frameGroup={frameGroup}
                                    onExpand={() =>
                                        dispatch({
                                            type: 'EXPAND_FRAMES',
                                            frames: frameGroup.frames.map((frame) => frame.frame_number),
                                        })
                                    }
                                    onSelect={(frameNumber) => {
                                        dispatch({ type: 'SELECT_FRAME', frame: frameNumber });
                                    }}
                                />
                            ))}
                        </ol>
                    </div>
                </div>
            </aside>
            <section className="flex flex-col border-t @4xl:border-t-0 ~border-gray-200 relative">
                {selectedFrame && (
                    <>
                        <header className="~text-gray-500 flex-none z-30 h-16 px-6 @lg:px-10 flex items-center justify-end">
                            <EditorLink
                                path={selectedFrame.file}
                                lineNumber={selectedFrame.line_number}
                                className="flex items-center text-sm"
                            />
                        </header>

                        <FrameCodeSnippet frame={selectedFrame} />
                    </>
                )}
            </section>
            {selectedFrame?.arguments && selectedFrame.arguments.length > 0 && (
                <section className="border-t ~border-gray-200 @4xl:col-span-2">
                    <header className="font-bold text-xs ~text-gray-500 uppercase tracking-wider h-16 px-6 @lg:px-10 flex items-center">
                        arguments
                    </header>
                    <FrameArguments frame={selectedFrame} />
                </section>
            )}
        </>
    );
}
