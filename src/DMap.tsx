import {
    createContext,
    forwardRef,
    useCallback,
    useContext,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';

import {
    Animated,
    type GestureResponderEvent,
    View,
    type ViewStyle,
} from 'react-native';
import WebView from 'react-native-webview';
import type { WebViewErrorEvent } from 'react-native-webview/lib/WebViewTypes';

import {
    type AnimationOptions,
    type ChangeLanguageEvent,
    type DestroyMapEvent,
    type DMapRef,
    type FitBoundsOptions,
    type FloorLevelChangeEvent,
    type FloorPlanHideEvent,
    type FloorPlanShowEvent,
    type GraphicsPresetChangeEvent,
    type HtmlMarkerProps,
    type LabelProps,
    type LatLngLiteral,
    type LngLatBounds,
    type MapEvent,
    type MapEventState,
    type MapOptions,
    type MarkerProps,
    type Padding,
    type PolygonProps,
    type PolylineProps,
    type RotationAnimationOptions,
    type StyleLoadErrorEvent,
    type StyleLoadEvent,
    type StyleOptions,
    type TrafficScoreEvent,
    type TrafficVisibilityEvent,
    type ZoomAnimationOptions,
    type ZoomPanOptions,
} from './types';
import { getWebContent } from './webContent';

type DMapProps = {
    fadeInOnInit?: boolean;
    fadeInDuration?: number;
    fadeInDelay?: number;
    children?: React.ReactNode;

    options: MapOptions;

    autoFitBounds?: boolean | Partial<Padding>;

    onInit?: () => void,
    style: ViewStyle;
    onTouchStart?: ((event: GestureResponderEvent) => void) & (() => void),
    onTouchEnd?: ((event: GestureResponderEvent) => void) & (() => void),

    onWebViewError?: (syntheticEvent: WebViewErrorEvent) => void,

    injectCSS?: string;
    injectJS?: string;
    injectHTML?: string;

    /* /**
        * Emitted repeatedly during any transition from one map view to another, caused by moving, zooming, rotating, or pitching.
        */
    onMove?: (event: MapEvent & MapEventState) => void;

    /**
     * Emitted before any transition from one map view to another, caused by moving, zooming, rotating, or pitching.
     */
    onMoveStart?: (event: MapEvent & MapEventState) => void;
    /**
     * Emitted after any transition from one map view to another, caused by moving, zooming, rotating, or pitching.
     */
    onMoveEnd?: (event: MapEvent & MapEventState) => void;
    /**
     * Emitted repeatedly during any change in the map's center.
     */
    onCenter?: (event: MapEvent & MapEventState) => void;
    /**
     * Emitted before any change in the map's center.
     */
    onCenterStart?: (event: MapEvent & MapEventState) => void;
    /**
     * Emitted after any change in the map's center.
     */
    onCenterEnd?: (event: MapEvent & MapEventState) => void;
    /**
     * Emitted repeatedly during any change in zoom level.
     */
    onZoom?: (event: MapEvent & MapEventState) => void;
    /**
     * Emitted before any change in zoom level.
     */
    onZoomStart?: (event: MapEvent & MapEventState) => void;
    /**
     * Emitted after any change in zoom level.
     */
    onZoomEnd?: (event: MapEvent & MapEventState) => void;
    /**
     * Emitted repeatedly during any change in the map's pitch.
     */
    onRotation?: (event: MapEvent & MapEventState) => void;
    /**
     * Emitted before any change in the map's pitch.
     */
    onRotationStart?: (event: MapEvent & MapEventState) => void;
    /**
     * Emitted after any change in the map's pitch.
     */
    onRotationEnd?: (event: MapEvent & MapEventState) => void;
    /**
     * Emitted repeatedly during any change in the map's pitch.
     */
    onPitch?: (event: MapEvent & MapEventState) => void;
    /**
     * Emitted before any change in the map's pitch.
     */
    onPitchStart?: (event: MapEvent & MapEventState) => void;
    /**
     * Emitted after any change in the map's pitch.
     */
    onPitchEnd?: (event: MapEvent & MapEventState) => void;
    /**
     * Emitted when the map is clicked.
     */

    /**
     * Emitted when the map becomes idle after some interaction (drag, zoom etc).
     * Idle means that the map is not interacting, all tiles are drawn and labeling is finished.
     * This event doesn't take into account any asset loading (for example, marker icons).
     */
    onIdle?: (event: MapEvent & MapEventState) => void;
    /**
     * Emitted after any change in the map's size.
     */
    onResize?: (event: MapEvent & MapEventState) => void;
    /**
     * Emitted before the traffic layer showed on the map.
     */
    onTrafficShow?: (event: TrafficVisibilityEvent & MapEventState) => void;
    /**
     * Emitted after the traffic layer hid from the map.
     */
    onTrafficHide?: (event: TrafficVisibilityEvent & MapEventState) => void;
    /**
     * Emitted after update current traffic score.
     */
    onTrafficScore?: (event: TrafficScoreEvent & MapEventState) => void;
    /**
     * Emitted after the floor plan is shown on the map.
     */
    onFloorPlanShow?: (event: FloorPlanShowEvent & MapEventState) => void;
    /**
     * Emitted after the floor plan is disappeared from the map.
     */
    onFloorPlanHide?: (event: FloorPlanHideEvent & MapEventState) => void;
    /**
     * Emitted after the floor plan level is changed.
     */
    onFloorLevelChange?: (event: FloorLevelChangeEvent & MapEventState) => void;
    /**
     * Emitted after the map style is loaded.
     */
    onStyleLoad?: (event: StyleLoadEvent & MapEventState) => void;
    /**
     * Emitted after the map style fails to load.
     */
    onStyleLoadError?: (event: StyleLoadErrorEvent & MapEventState) => void;
    /**
     * Emitted after the map language is changed.
     */
    onChangeLanguage?: (event: ChangeLanguageEvent & MapEventState) => void;
    /**
     * Emitted after the map is destroyed.
     */
    onDestroy?: (event: DestroyMapEvent & MapEventState) => void;
    /**
     * Emitted when map changes global style variable `graphicsPreset`.
     *
     * @hidden
     */
    onGraphicsPresetChange?: (event: GraphicsPresetChangeEvent) => void;


};

const mapEventKeys = {
    "move": "onMove",
    "movestart": "onMoveStart",
    "moveend": "onMoveEnd",
    "center": "onCenter",
    "centerstart": "onCenterStart",
    "centerend": "onCenterEnd",
    "zoom": "onZoom",
    "zoomstart": "onZoomStart",
    "zoomend": "onZoomEnd",
    "rotation": "onRotation",
    "rotationstart": "onRotationStart",
    "rotationend": "onRotationEnd",
    "pitch": "onPitch",
    "pitchstart": "onPitchStart",
    "pitchend": "onPitchEnd",
    "click": "onClick",
    "contextmenu": "onContextMenu",
    "mousemove": "onMouseMove",
    "mouseover": "onMouseOver",
    "mouseout": "onMouseOut",
    "mousedown": "onMouseDown",
    "mouseup": "onMouseUp",
    "touchstart": "onTouchStart",
    "touchend": "onTouchEnd",
    "idle": "onIdle",
    "resize": "onResize",
    "trafficshow": "onTrafficShow",
    "traffichide": "onTrafficHide",
    "trafficscore": "onTrafficScore",
    "floorplanshow": "onFloorPlanShow",
    "floorplanhide": "onFloorPlanHide",
    "floorlevelchange": "onFloorLevelChange",
    "styleload": "onStyleLoad",
    "styleloaderror": "onStyleLoadError",
    "changeLanguage": "onChangeLanguage",
    "destroy": "onDestroy",
    "error": "onError",
    "graphicspresetchange": "onGraphicsPresetChange"
};


type DMapRegistry = {
    addMarker: (propsMarker: MarkerProps) => void;
    addLabel: (propsLabel: LabelProps) => void;
    removeMarker: (propsMarker: MarkerProps) => void;
    removeLabel: (propsLabel: LabelProps) => void;
    addPolyline: (propsPolyline: PolylineProps) => void;
    removePolyline: (propsPolyline: PolylineProps) => void;
    addHtmlMarker: (propsHtmlMarker: HtmlMarkerProps) => void;
    removeHtmlMarker: (propsHtmlMarker: HtmlMarkerProps) => void;
    addPolygon: (propsPolygon: PolygonProps) => void;
    removePolygon: (propsPolygon: PolygonProps) => void;

};
const DMapContext = createContext<DMapRegistry | null>(null);



export const useDMapContext = () => {
    const ctx = useContext(DMapContext);
    if (!ctx) throw new Error('useDMapContext must be used within <DMapProvider>');
    return ctx;
};


const default_dark_theme_style_id = 'e05ac437-fcc2-4845-ad74-b1de9ce07555';
const default_light_theme_style_id = 'c080bb6a-8134-4993-93a1-5b4d8c36a59b';



export const DMap = forwardRef<DMapRef, DMapProps>((props, ref) => {



    const boundsLatLng = useRef<{
        [key: string]: number[][];
    }>({});

    const webViewRef = useRef<WebView>(null);

    const [html, setHtml] = useState<string>('');

    const sendToWebView = useCallback((message: {
        function: string;
        params: any;
    }) => {

        webViewRef.current?.postMessage(JSON.stringify(message));

    }, []);

    useEffect(() => {

        if (html) return;



        getWebContent({
            mapglGisJSLink: 'https://mapgl.2gis.com/api/js/v1',
            functionsMirrorJS: Object.keys(functionsMirror).map((key) => {
                return functionsMirror[key as keyof typeof functionsMirror].web;
            }).join('\n'),
            injectCSS: props.injectCSS ?? '',
            injectJS: props.injectJS ?? '',
            injectHTML: props.injectHTML ?? '',
        }
        ).then(res => {
            setHtml(res);
        });
    }, []);


    const fadeAnim = useRef(new Animated.Value(0)).current;


    const [inited, setInited] = useState<boolean>(false);


    useEffect(() => {
        if (inited && (props.fadeInOnInit ?? true)) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                delay: props.fadeInDelay ?? 500,
                duration: props.fadeInDuration ?? 500,
                useNativeDriver: true,
            }).start();
        }


    }, [inited]);

    const updateProps = () => {


        if (webViewRef.current) {

            if (inited) {

            }



        }

    }

    useEffect(() => {
        updateProps();
    }, [inited]);

    const onLoadEnd = () => {

        if (!inited)
            functionsMirror.init.native();

    }
    const onReceiveMessageFromWebView = (data: string) => {


        try {
            const msg = JSON.parse(data);

            if (msg.type === 'inited') {
                props.onInit?.();
                setInited(true);
                return;

            }

            if (msg.type === 'markerClick') {
                const handler = markersClickHandlers.current[msg.uniqueId];
                if (typeof handler === 'function') {
                    handler();
                }
                return;
            }


            if (msg.type === 'mapEvent') {

                // @ts-ignore
                const handlerName = mapEventKeys[msg?.event];

                const handler = (props as any)[handlerName];
                if (typeof handler === 'function') {
                    handler(msg.data);
                }
            }
        } catch (e) {
            // if (props.debug) console.warn('Invalid message from WebView:', data);
        }


    };


    const functionsMirror = {


        init: {
            native: () => {

                if (props.options?.style === 'dark') {
                    props.options.style = default_dark_theme_style_id;
                } else if (props.options?.style === 'light') {
                    props.options.style = default_light_theme_style_id;
                }

                sendToWebView({
                    function: 'init',
                    params: props.options
                });
            },
            web: `
             if(functionName === 'init') {
               

            

               map = new mapgl.Map("map", params);

               let events = ${JSON.stringify(Object.keys(mapEventKeys))};
               events.forEach(eventName => {
                   map.on(eventName, function(e) {


                  

                            if(!e) e = {};

                            e.zoom = map.getZoom();
                            e.rotation = map.getRotation();
                            e.pitch = map.getPitch();
                            e.center = map.getCenter();
                            e.styleZoom = map.getStyleZoom();
                            e.latlng = null;
                            if(e.center)
                            e.latlng = {
                                lat: e.center[1],
                                lng: e.center[0]
                            };


                       let postData = {
                           type: 'mapEvent',
                           event: eventName,
                           data: e,
                       };
                       window.ReactNativeWebView.postMessage(JSON.stringify(postData));
                   });
               });


                 window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: 'inited',
                 }));
               
                 }`

        },

        setCenter: {
            native: (center: number[], options: AnimationOptions) => {
                sendToWebView({
                    function: 'setCenter',
                    params: {
                        center,
                        options
                    }
                });
            },
            web: `
             if(functionName === 'setCenter') {

              let currentCenter = map.getCenter();
              if(currentCenter[0] !== params.center[0] || currentCenter[1] !== params.center[1])
                map.setCenter(params.center, params.options);
             }`
        },
        setZoom: {
            native: (zoom: number, options?: ZoomAnimationOptions) => {
                sendToWebView({
                    function: 'setZoom',
                    params: {
                        zoom,
                        options
                    }
                });
            },
            web: `
             if(functionName === 'setZoom') {
                map.setZoom(params.zoom, params.options);
             }`
        },
        setStyleZoom: {
            native: (styleZoom: number, options?: AnimationOptions) => {
                sendToWebView({
                    function: 'setStyleZoom',
                    params: {
                        styleZoom,
                        options
                    }
                });
            },
            web: `
             if(functionName === 'setStyleZoom') {
                map.setStyleZoom(params.styleZoom, params.options);
             }`
        },
        setRotation: {
            native: (rotation: number, options?: RotationAnimationOptions) => {
                sendToWebView({
                    function: 'setRotation',
                    params: {
                        rotation,
                        options
                    }
                });
            },
            web: `
             if(functionName === 'setRotation') {
                map.setRotation(params.rotation, params.options);
             }`
        },
        setPitch: {
            native: (pitch: number, options?: AnimationOptions) => {
                sendToWebView({
                    function: 'setPitch',
                    params: {
                        pitch,
                        options
                    }
                });
            },
            web: `
             if(functionName === 'setPitch') {
                map.setPitch(params.pitch, params.options);
             }`
        },
        setMinZoom: {
            native: (zoom: number, options?: AnimationOptions) => {
                sendToWebView({
                    function: 'setMinZoom',
                    params: {
                        zoom,
                        options
                    }
                });
            },
            web: `
             if(functionName === 'setMinZoom') {

                

                map.setMinZoom(params.zoom, params.options);
             }`
        },
        setMaxZoom: {
            native: (zoom: number, options?: AnimationOptions) => {
                sendToWebView({
                    function: 'setMaxZoom',
                    params: {
                        zoom,
                        options
                    }
                });
            },
            web: `
             if(functionName === 'setMaxZoom') {
                map.setMaxZoom(params.zoom, params.options);
             }`
        },
        setMinPitch: {
            native: (pitch: number, options?: AnimationOptions) => {
                sendToWebView({
                    function: 'setMinPitch',
                    params: {
                        pitch,
                        options
                    }
                });
            },
            web: `
             if(functionName === 'setMinPitch') {
                map.setMinPitch(params.pitch, params.options);
             }`
        },
        setMaxPitch: {
            native: (pitch: number, options?: AnimationOptions) => {
                sendToWebView({
                    function: 'setMaxPitch',
                    params: {
                        pitch,
                        options
                    }
                });
            },
            web: `
             if(functionName === 'setMaxPitch') {
                map.setMaxPitch(params.pitch, params.options);
             }`
        },
        setLowZoomMaxPitch: {
            native: (pitch: number, options?: AnimationOptions) => {
                sendToWebView({
                    function: 'setLowZoomMaxPitch',
                    params: {
                        pitch,
                        options
                    }
                });
            },
            web: `
             if(functionName === 'setLowZoomMaxPitch') {
                map.setLowZoomMaxPitch(params.pitch, params.options);
             }`
        },
        showTraffic: {
            native: () => {
                sendToWebView({
                    function: 'showTraffic',
                    params: {}
                });
            },
            web: `
             if(functionName === 'showTraffic') {
                map.showTraffic();
             }`
        },
        hideTraffic: {
            native: () => {
                sendToWebView({
                    function: 'hideTraffic',
                    params: {}
                });
            },
            web: `
             if(functionName === 'hideTraffic') {
                map.hideTraffic();
             }`
        },
        setLanguage: {
            native: (lang: string) => {
                sendToWebView({
                    function: 'setLanguage',
                    params: {
                        lang
                    }
                });
            },
            web: `
             if(functionName === 'setLanguage') {
                map.setLanguage(params.lang);
             }`
        },
        setMaxBounds: {
            native: (bounds: LngLatBounds) => {
                sendToWebView({
                    function: 'setMaxBounds',
                    params: {
                        bounds
                    }
                });
            },
            web: `
             if(functionName === 'setMaxBounds') {
                map.setMaxBounds(params.bounds);
             }`
        },
        setPadding: {
            native: (padding: Partial<Padding>, options?: AnimationOptions) => {
                sendToWebView({
                    function: 'setPadding',
                    params: {
                        padding,
                        options
                    }
                });
            },
            web: `
             if(functionName === 'setPadding') {
                map.setPadding(params.padding, params.options);
             }`
        },
        fitBounds: {
            native: (bounds: LngLatBounds, options?: FitBoundsOptions) => {
                sendToWebView({
                    function: 'fitBounds',
                    params: {
                        bounds,
                        options
                    }
                });
            },
            web: `
             if(functionName === 'fitBounds') {
                map.fitBounds(params.bounds, params.options);
             }`
        },
        setStyleById: {
            native: (styleId: string) => {

                if (styleId === 'dark') {
                    styleId = default_dark_theme_style_id;
                } else if (styleId === 'light') {
                    styleId = default_light_theme_style_id;
                }

                sendToWebView({
                    function: 'setStyleById',
                    params: {
                        styleId
                    }
                });
            },
            web: `
             if(functionName === 'setStyleById') {

               
                if(currentStyleID !== params.styleId) {
                currentStyleID = params.styleId;
                    map.setStyleById(params.styleId);
                }
             }`
        },
        setStyleFromUrl: {
            native: (styleUrl: string, options: StyleOptions) => {
                sendToWebView({
                    function: 'setStyleFromUrl',
                    params: {
                        styleUrl,
                        options
                    }
                });
            },
            web: `
             if(functionName === 'setStyleFromUrl') {
                map.setStyleFromUrl(params.styleUrl, params.options);
             }`
        },
        addMarker: {
            native: (propsMarker: MarkerProps) => {
                sendToWebView({
                    function: 'addMarker',
                    params: {
                        ...propsMarker
                    }
                });
            },
            web: `
             if(functionName === 'addMarker') {
               
               if( markers[params.uniqueId] ){
                    markers[params.uniqueId].destroy();
                     delete markers[params.uniqueId];
                }

             
             const marker = new mapgl.Marker(map,params.options);

              marker.on('click', function() {
                    window.ReactNativeWebView.postMessage(JSON.stringify({
                        type: 'markerClick',
                        uniqueId: params.uniqueId
                    }));
                });
                
             markers[params.uniqueId] = marker;

             }`
        },
        removeMarker: {
            native: (propsMarker: MarkerProps) => {
                sendToWebView({
                    function: 'removeMarker',
                    params: {
                        ...propsMarker
                    }
                });
            },
            web: `
             if(functionName === 'removeMarker') {
             
                if( markers[params.uniqueId] ){
                    markers[params.uniqueId].destroy();
                    delete markers[params.uniqueId];
                }

             }`
        },
        addPolyline: {
            native: (propsPolyline: PolylineProps) => {
                sendToWebView({
                    function: 'addPolyline',
                    params: {
                        ...propsPolyline
                    }
                });
            },
            web: `
             if(functionName === 'addPolyline') {
               
               if( polylines[params.uniqueId] ){
                    polylines[params.uniqueId].destroy();
                     delete polylines[params.uniqueId];
                }

             
             const polyline = new mapgl.Polyline(map,params.options);
                
             polylines[params.uniqueId] = polyline;

             }`
        },
        removePolyline: {
            native: (propsPolyline: PolylineProps) => {
                sendToWebView({
                    function: 'removePolyline',
                    params: {
                        ...propsPolyline
                    }
                });
            },
            web: `
             if(functionName === 'removePolyline') {
             
                if( polylines[params.uniqueId] ){
                    polylines[params.uniqueId].destroy();
                    delete polylines[params.uniqueId];
                }

             }`
        },
        addLabel: {
            native: (propsLabel: LabelProps) => {
                sendToWebView({
                    function: 'addLabel',
                    params: {
                        ...propsLabel
                    }
                });
            },
            web: `
             if(functionName === 'addLabel') {
               
               if( labels[params.uniqueId] ){
                    labels[params.uniqueId].destroy();
                     delete labels[params.uniqueId];
                }



             
             const label = new mapgl.Label(map,params.options);

                label.on('click', function() {
               
                    window.ReactNativeWebView.postMessage(JSON.stringify({
                        type: 'markerClick',
                        uniqueId: params.uniqueId
                    }));
                });

             labels[params.uniqueId] = label;

             }`
        },
        removeLabel: {
            native: (propsLabel: LabelProps) => {
                sendToWebView({
                    function: 'removeLabel',
                    params: {
                        ...propsLabel
                    }
                });
            },
            web: `
             if(functionName === 'removeLabel') {
             
                if( labels[params.uniqueId] ){
                    labels[params.uniqueId].destroy();
                    delete labels[params.uniqueId];
                }

             }`
        },
        addHtmlMarker: {
            native: (propsHtmlMarker: HtmlMarkerProps) => {
                sendToWebView({
                    function: 'addHtmlMarker',
                    params: {
                        ...propsHtmlMarker
                    }
                });
            },
            web: `
             if(functionName === 'addHtmlMarker') {
               
               if( htmlMarkers[params.uniqueId] ){
                    htmlMarkers[params.uniqueId].destroy();
                     delete htmlMarkers[params.uniqueId];
                }

             
             const htmlMarker = new mapgl.HtmlMarker(map,params.options);
            
             htmlMarkers[params.uniqueId] = htmlMarker;

             }`
        },
        removeHtmlMarker: {
            native: (propsHtmlMarker: HtmlMarkerProps) => {
                sendToWebView({
                    function: 'removeHtmlMarker',
                    params: {
                        ...propsHtmlMarker
                    }
                });
            },
            web: `
             if(functionName === 'removeHtmlMarker') {
             
                if( htmlMarkers[params.uniqueId] ){
                    htmlMarkers[params.uniqueId].destroy();
                    delete htmlMarkers[params.uniqueId];
                }

             }`
        },
        addPolygon: {
            native: (propsPolygon: PolygonProps) => {
                sendToWebView({
                    function: 'addPolygon',
                    params: {
                        ...propsPolygon
                    }
                });
            },
            web: `
             if(functionName === 'addPolygon') {
               
               if( polygons[params.uniqueId] ){
                    polygons[params.uniqueId].destroy();
                     delete polygons[params.uniqueId];
                }

             
             const polygon = new mapgl.Polygon(map,params.options);
                
             polygons[params.uniqueId] = polygon;

             }`
        },
        removePolygon: {
            native: (propsPolygon: PolygonProps) => {
                sendToWebView({
                    function: 'removePolygon',
                    params: {
                        ...propsPolygon
                    }
                });
            },
            web: `
             if(functionName === 'removePolygon') {
             
                if( polygons[params.uniqueId] ){
                    polygons[params.uniqueId].destroy();
                    delete polygons[params.uniqueId];
                }

             }`
        },


    };

    const markersClickHandlers = useRef<{ [key: string]: () => void }>({});



    const addHtmlMarker = (propsHtmlMarker: HtmlMarkerProps) => {

        if (propsHtmlMarker.options && propsHtmlMarker.options.zIndex === undefined) {
            propsHtmlMarker.options.zIndex = 10;
        }



        functionsMirror.addHtmlMarker.native(propsHtmlMarker);

        if (!propsHtmlMarker.ignoreAutoFit && propsHtmlMarker.options?.coordinates) {
            boundsLatLng.current[propsHtmlMarker.uniqueId] = [propsHtmlMarker.options?.coordinates]
        }
    };

    const removeHtmlMarker = (propsHtmlMarker: HtmlMarkerProps) => {


        functionsMirror.removeHtmlMarker.native(propsHtmlMarker);

        if (boundsLatLng.current[propsHtmlMarker.uniqueId]) {
            delete boundsLatLng.current[propsHtmlMarker.uniqueId];
        }
        autoFitBounds();

    };

    const addMarker = (propsMarker: MarkerProps) => {

        if (propsMarker.options && propsMarker.options.zIndex === undefined) {
            propsMarker.options.zIndex = 10;
        }

        if (propsMarker.onPress) {
            markersClickHandlers.current[propsMarker.uniqueId] = propsMarker.onPress;



        }
        functionsMirror.addMarker.native(propsMarker);

        if (!propsMarker.ignoreAutoFit && propsMarker.options?.coordinates) {
            boundsLatLng.current[propsMarker.uniqueId] = [propsMarker.options?.coordinates]
        }


    };


    const removeMarker = (propsMarker: MarkerProps) => {

        if (markersClickHandlers.current[propsMarker.uniqueId]) {
            delete markersClickHandlers.current[propsMarker.uniqueId];
        }

        functionsMirror.removeMarker.native(propsMarker);

        if (boundsLatLng.current[propsMarker.uniqueId]) {
            delete boundsLatLng.current[propsMarker.uniqueId];
        }
        autoFitBounds();


    }

    const addPolygon = (propsPolygon: PolygonProps) => {

        if (propsPolygon.options && propsPolygon.options.zIndex === undefined) {
            propsPolygon.options.zIndex = 2;
        }

        functionsMirror.addPolygon.native(propsPolygon);
        if (propsPolygon.options?.coordinates[0]) {
            boundsLatLng.current[propsPolygon.uniqueId] = propsPolygon.options?.coordinates[0];
        }
        autoFitBounds();
    }

    const removePolygon = (propsPolygon: PolygonProps) => {

        functionsMirror.removePolygon.native(propsPolygon);

        if (boundsLatLng.current[propsPolygon.uniqueId]) {
            delete boundsLatLng.current[propsPolygon.uniqueId];
        }
        autoFitBounds();

    }


    const addPolyline = (propsPolyline: PolylineProps) => {

        if (propsPolyline.options && propsPolyline.options.zIndex === undefined) {
            propsPolyline.options.zIndex = 5;
        }

        functionsMirror.addPolyline.native(propsPolyline);


        if (!propsPolyline.ignoreAutoFit && propsPolyline.options?.coordinates) {
            boundsLatLng.current[propsPolyline.uniqueId] = propsPolyline.options?.coordinates;
        }

        autoFitBounds();
    }


    const addLabel = (propsLabel: LabelProps) => {

        if (propsLabel.options && propsLabel.options.zIndex === undefined) {
            propsLabel.options.zIndex = 10;
        }



        if (propsLabel.onPress) {
            markersClickHandlers.current[propsLabel.uniqueId] = propsLabel.onPress;

            if (propsLabel.options && !propsLabel.options.interactive) {
                propsLabel.options.interactive = true;
            }
        }
        functionsMirror.addLabel.native(propsLabel);



        if (!propsLabel.ignoreAutoFit && propsLabel.options?.coordinates) {
            boundsLatLng.current[propsLabel.uniqueId] = [propsLabel.options?.coordinates]
        }
    };

    const removeLabel = (propsLabel: LabelProps) => {

        functionsMirror.removeLabel.native(propsLabel);

        if (boundsLatLng.current[propsLabel.uniqueId]) {
            delete boundsLatLng.current[propsLabel.uniqueId];
        }

        if (markersClickHandlers.current[propsLabel.uniqueId]) {
            delete markersClickHandlers.current[propsLabel.uniqueId];
        }

        autoFitBounds();

    }



    const autoFitBounds = () => {
        if (props.autoFitBounds) {


            let points: number[][] = Object.values(boundsLatLng.current).flat();
            if (points.length === 0) return;

            points = points.filter((point) => {
                return point && point.length === 2 && !!point[0] && !!point[1] && !isNaN(point[0]) && !isNaN(point[1]);
            });

            let southWest: number[] | null = null;
            let northEast: number[] | null = null;
            points.forEach((point) => {
                if (!southWest) {
                    southWest = [...point];
                } else {

                    if (point[0] && point[1] && southWest[0] && southWest[1]) {

                        if (point[0] < southWest[0]) southWest[0] = point[0];
                        if (point[1] < southWest[1]) southWest[1] = point[1];
                    }
                }
                if (!northEast) {
                    northEast = [...point];
                } else {

                    if (point[0] && point[1] && northEast[0] && northEast[1]) {

                        if (point[0] > northEast[0]) northEast[0] = point[0];
                        if (point[1] > northEast[1]) northEast[1] = point[1];
                    }
                }
            });

            if (!southWest || !northEast) return;
            functionsMirror.fitBounds.native(
                {
                    southWest,
                    northEast
                },
                {

                    padding: props.autoFitBounds == true ? {
                        top: 100,
                        bottom: 100,
                        left: 100,
                        right: 100
                    } : props.autoFitBounds,
                }
            );

        }
    }


    const removePolyline = (propsPolyline: PolylineProps) => {

        functionsMirror.removePolyline.native(propsPolyline);

        if (boundsLatLng.current[propsPolyline.uniqueId]) {
            delete boundsLatLng.current[propsPolyline.uniqueId];
        }

        autoFitBounds();

    }

    useImperativeHandle(ref, () => ({

        setCenter: (center: number[], options?: AnimationOptions) => {
            functionsMirror.setCenter.native(center, options ?? {});
        },
        setZoom: (zoom: number, options?: ZoomAnimationOptions) => {
            functionsMirror.setZoom.native(zoom, options);
        },
        setStyleZoom: (styleZoom: number, options?: AnimationOptions) => {
            functionsMirror.setStyleZoom.native(styleZoom, options);
        },
        setRotation: (rotation: number, options?: RotationAnimationOptions) => {
            functionsMirror.setRotation.native(rotation, options);
        },
        setPitch: (pitch: number, options?: AnimationOptions) => {
            functionsMirror.setPitch.native(pitch, options);
        },
        setMinZoom: (zoom: number, options?: AnimationOptions) => {
            functionsMirror.setMinZoom.native(zoom, options);
        },
        setMaxZoom: (zoom: number, options?: AnimationOptions) => {
            functionsMirror.setMaxZoom.native(zoom, options);
        },
        setMinPitch: (pitch: number, options?: AnimationOptions) => {
            functionsMirror.setMinPitch.native(pitch, options);
        },
        setMaxPitch: (pitch: number, options?: AnimationOptions) => {
            functionsMirror.setMaxPitch.native(pitch, options);
        },
        setLowZoomMaxPitch: (pitch: number, options?: AnimationOptions) => {
            functionsMirror.setLowZoomMaxPitch.native(pitch, options);

        },
        showTraffic: () => {
            functionsMirror.showTraffic.native();
        },
        hideTraffic: () => {
            functionsMirror.hideTraffic.native();

        },
        setLanguage: (lang: string) => {
            functionsMirror.setLanguage.native(lang);
        },

        setMaxBounds: (bounds: LngLatBounds) => {
            functionsMirror.setMaxBounds.native(bounds);
        },
        setPadding: (padding: Partial<Padding>, options?: AnimationOptions) => {
            functionsMirror.setPadding.native(padding, options);
        },
        fitBounds: (bounds: LngLatBounds, options?: FitBoundsOptions) => {
            functionsMirror.fitBounds.native(bounds, options);
        },
        setStyleById: (styleId: string): void => {
            functionsMirror.setStyleById.native(styleId);
        },

        setStyleFromUrl: (styleUrl: string, options: StyleOptions): void => {
            functionsMirror.setStyleFromUrl.native(styleUrl, options);
        },
        flyTo: (latlng: LatLngLiteral, zoom?: number, options?: ZoomPanOptions) => {
            functionsMirror.setCenter.native([latlng.lng, latlng.lat], options ?? {});
            if (zoom !== undefined) {
                functionsMirror.setZoom.native(zoom, options);
            }
        }
    }), [sendToWebView, webViewRef, props]);



    const lastProps = useRef<string | null>(JSON.stringify(props.options));

    useEffect(() => {

        if (inited) {



            if (lastProps.current !== JSON.stringify(props.options)) {

                lastProps.current = JSON.stringify([props.options]);

                if (props.options?.style) {
                    functionsMirror.setStyleById.native(props.options.style);
                }

                if (props.options?.center) {
                    functionsMirror.setCenter.native(props.options.center, {});
                }
                /*  if (props.options?.minZoom !== undefined) {
                      functionsMirror.setMinZoom.native(props.options.minZoom);
                  }
                  if (props.options?.maxZoom !== undefined) {
                      functionsMirror.setMaxZoom.native(props.options.maxZoom);
                  }
                  if (props.options?.minPitch !== undefined) {
                      functionsMirror.setMinPitch.native(props.options.minPitch);
                  }
                  if (props.options?.maxPitch !== undefined) {
                      functionsMirror.setMaxPitch.native(props.options.maxPitch);
                  }
                  if (props.options?.lowZoomMaxPitch !== undefined) {
                      functionsMirror.setLowZoomMaxPitch.native(props.options.lowZoomMaxPitch);
                  }
  
                  if (props.options?.maxBounds) {
                      functionsMirror.setMaxBounds.native(props.options.maxBounds);
                  }
                  if (props.options?.padding) {
                      functionsMirror.setPadding.native(props.options.padding);
                  }
  */




            }

        }

    }, [props.options]);



    return (<DMapContext.Provider
        value={{
            addMarker,
            removeMarker,
            addPolyline,
            removePolyline,
            addLabel,
            removeLabel,
            addHtmlMarker,
            removeHtmlMarker,
            addPolygon,
            removePolygon,

        }}
    >
        <View style={props.style}>

            <Animated.View style={{ flex: 1, opacity: inited && (props.fadeInOnInit ?? true) ? fadeAnim : 1 }}>




                <WebView
                    ref={webViewRef}
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent'
                    }}
                    originWhitelist={['*']}
                    source={{
                        html: html,
                    }}
                    onLoadEnd={onLoadEnd}
                    onMessage={event => {
                        const { data } = event.nativeEvent;
                        onReceiveMessageFromWebView(data);
                    }}

                    onError={props.onWebViewError}

                    onTouchStart={props.onTouchStart}
                    onTouchEnd={props.onTouchEnd}
                    javaScriptEnabled
                    domStorageEnabled
                    scrollEnabled={false}


                />


            </Animated.View>
            {inited && props.children}


        </View>
    </DMapContext.Provider>
    );
});
