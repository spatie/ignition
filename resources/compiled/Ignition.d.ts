/// <reference types="react" />
import { ErrorOccurrence } from '@flareapp/ignition-ui';
import { IgniteData } from './types';
declare type Props = {
    errorOccurrence: ErrorOccurrence;
    igniteData: IgniteData;
};
export default function Ignition({ errorOccurrence, igniteData }: Props): JSX.Element;
export {};
