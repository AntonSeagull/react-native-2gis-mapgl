import {
    useEffect,
    useRef,
} from 'react';

import { useDMapContext } from './DMap';
import type { HtmlMarkerProps } from './types';

export const DHtmlMarker = (props: HtmlMarkerProps) => {


    const { addHtmlMarker, removeHtmlMarker } = useDMapContext();

    const lastRenderProps = useRef<string>("");

    useEffect(() => {

        if (lastRenderProps.current !== JSON.stringify(props)) {

            addHtmlMarker(props);
            lastRenderProps.current = JSON.stringify(props);
        }



    }, [props]);

    useEffect(() => {
        return () => {
            removeHtmlMarker(props);
        };
    }, []);

    return null;
}