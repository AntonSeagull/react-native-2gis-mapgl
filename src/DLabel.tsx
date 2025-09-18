import {
    useEffect,
    useRef,
} from 'react';

import { useDMapContext } from './DMap';
import type { LabelProps } from './types';

export const DLabel = (props: LabelProps) => {


    const { addLabel, removeLabel } = useDMapContext();

    const lastRenderProps = useRef<string>("");

    useEffect(() => {

        if (lastRenderProps.current !== JSON.stringify(props)) {

            addLabel(props);
            lastRenderProps.current = JSON.stringify(props);
        }



    }, [props]);

    useEffect(() => {
        return () => {
            removeLabel(props);
        };
    }, []);

    return null;
}