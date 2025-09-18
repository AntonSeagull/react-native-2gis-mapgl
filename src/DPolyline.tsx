import {
    useEffect,
    useRef,
} from 'react';

import { useDMapContext } from './DMap';
import type { PolylineProps } from './types';

export const DPolyline = (props: PolylineProps) => {


    const { addPolyline, removePolyline } = useDMapContext();

    const lastRenderProps = useRef<string>("");

    useEffect(() => {


        if (lastRenderProps.current !== JSON.stringify(props)) {


            addPolyline(props);
            lastRenderProps.current = JSON.stringify(props);
        }

    }, [props]);

    useEffect(() => {
        return () => {
            removePolyline(props);
        };
    }, []);

    return null;
}
