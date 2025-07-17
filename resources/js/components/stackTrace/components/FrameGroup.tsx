import React from 'react';
import { StackFrameGroupType } from '../../../types';
import RelaxedFullyQualifiedClassName from '../../ui/RelaxedFullyQualifiedClassName';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import RelaxedFilePath from '../../ui/RelaxedFilePath';

type Props = {
    frameGroup: StackFrameGroupType;
    onExpand: () => void;
    onSelect: (frameNumber: number) => void;
};

export default function FrameGroup({ frameGroup, onExpand, onSelect }: Props) {
    if (frameGroup.type === 'vendor' && !frameGroup.expanded) {
        return (
            <li
                className="group cursor-pointer px-6 @lg:px-10 py-4 flex gap-2 border-b ~border-gray-200 hover:~bg-gray-500/5 items-center"
                onClick={onExpand}
            >
                {frameGroup.frames.length > 1 ? `${frameGroup.frames.length} vendor frames` : '1 vendor frame'}
                <FontAwesomeIcon icon={faAngleDown} className="~text-gray-500 group-hover:text-indigo-500" />
            </li>
        );
    }

    return (
        <>
            {frameGroup.frames.map((frame, index) => (
                <React.Fragment key={index}>
                    <li
                        key={frame.frame_number}
                        className={`px-6 sm:px-10 py-4
                            ${
                                frame.selected
                                    ? 'bg-red-500 text-white'
                                    : 'cursor-pointer border-b ~border-gray-200 hover:~bg-red-500/10'
                            }
                        `}
                        onClick={() => onSelect(frame.frame_number)}
                    >
                        <div className="flex items-baseline">
                            {frame.class ? (
                                <RelaxedFullyQualifiedClassName path={frame.class} lineNumber={frame.line_number} />
                            ) : (
                                <RelaxedFilePath path={frame.file} lineNumber={frame.line_number} />
                            )}
                        </div>
                        <div className="font-semibold">{frame.method}</div>
                    </li>
                    {frame.selected && <li className="z-10 mt-[-4px] sticky top-0 bg-red-500 h-[4px]" />}
                </React.Fragment>
            ))}
        </>
    );
}
