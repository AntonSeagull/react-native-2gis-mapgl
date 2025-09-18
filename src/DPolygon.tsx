import {
    useEffect,
    useRef,
} from 'react';

import { useDMapContext } from './DMap';
import type { PolygonProps } from './types';

export const DPolygon = (props: PolygonProps) => {


    const { addPolygon, removePolygon } = useDMapContext();

    const lastRenderProps = useRef<string>("");

    useEffect(() => {


        if (lastRenderProps.current !== JSON.stringify(props)) {


            addPolygon(props);
            lastRenderProps.current = JSON.stringify(props);
        }

    }, [props]);

    useEffect(() => {
        return () => {
            removePolygon(props);
        };
    }, []);

    return null;
}
