import {
    useEffect,
    useRef,
} from 'react';

import { useDMapContext } from './DMap';
import type { MarkerProps } from './types';

export const DMarker = (props: MarkerProps) => {


    const { addMarker, removeMarker } = useDMapContext();

    const lastRenderProps = useRef<string>("");

    useEffect(() => {

        if (lastRenderProps.current !== JSON.stringify(props)) {

            addMarker(props);
            lastRenderProps.current = JSON.stringify(props);
        }



    }, [props]);

    useEffect(() => {
        return () => {
            removeMarker(props);
        };
    }, []);

    return null;
}