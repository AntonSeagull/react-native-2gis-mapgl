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
  type DGisMapGLMapRef,
  type FitBoundsOptions,
  type FloorLevelChangeEvent,
  type FloorPlanHideEvent,
  type FloorPlanShowEvent,
  type GraphicsPresetChangeEvent,
  type LngLatBounds,
  type MapEvent,
  type MapOptions,
  mapOptionsKeys,
  type Padding,
  type RotationAnimationOptions,
  type StyleLoadErrorEvent,
  type StyleLoadEvent,
  type StyleOptions,
  type TrafficScoreEvent,
  type TrafficVisibilityEvent,
  type ZoomAnimationOptions,
} from './types';
import { getWebContent } from './webContent';

type DGisMapGLMapProps = MapOptions & {
    fadeInOnInit?: boolean;
    fadeInDuration?: number;
    children?: React.ReactNode;

    apiKey: string;
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
    onMove?: (event: MapEvent) => void;

    /**
     * Emitted before any transition from one map view to another, caused by moving, zooming, rotating, or pitching.
     */
    onMoveStart?: (event: MapEvent) => void;
    /**
     * Emitted after any transition from one map view to another, caused by moving, zooming, rotating, or pitching.
     */
    onMoveEnd?: (event: MapEvent) => void;
    /**
     * Emitted repeatedly during any change in the map's center.
     */
    onCenter?: (event: MapEvent) => void;
    /**
     * Emitted before any change in the map's center.
     */
    onCenterStart?: (event: MapEvent) => void;
    /**
     * Emitted after any change in the map's center.
     */
    onCenterEnd?: (event: MapEvent) => void;
    /**
     * Emitted repeatedly during any change in zoom level.
     */
    onZoom?: (event: MapEvent) => void;
    /**
     * Emitted before any change in zoom level.
     */
    onZoomStart?: (event: MapEvent) => void;
    /**
     * Emitted after any change in zoom level.
     */
    onZoomEnd?: (event: MapEvent) => void;
    /**
     * Emitted repeatedly during any change in the map's pitch.
     */
    onRotation?: (event: MapEvent) => void;
    /**
     * Emitted before any change in the map's pitch.
     */
    onRotationStart?: (event: MapEvent) => void;
    /**
     * Emitted after any change in the map's pitch.
     */
    onRotationEnd?: (event: MapEvent) => void;
    /**
     * Emitted repeatedly during any change in the map's pitch.
     */
    onPitch?: (event: MapEvent) => void;
    /**
     * Emitted before any change in the map's pitch.
     */
    onPitchStart?: (event: MapEvent) => void;
    /**
     * Emitted after any change in the map's pitch.
     */
    onPitchEnd?: (event: MapEvent) => void;
    /**
     * Emitted when the map is clicked.
     */

    /**
     * Emitted when the map becomes idle after some interaction (drag, zoom etc).
     * Idle means that the map is not interacting, all tiles are drawn and labeling is finished.
     * This event doesn't take into account any asset loading (for example, marker icons).
     */
    onIdle?: (event: MapEvent) => void;
    /**
     * Emitted after any change in the map's size.
     */
    onResize?: (event: MapEvent) => void;
    /**
     * Emitted before the traffic layer showed on the map.
     */
    onTrafficShow?: (event: TrafficVisibilityEvent) => void;
    /**
     * Emitted after the traffic layer hid from the map.
     */
    onTrafficHide?: (event: TrafficVisibilityEvent) => void;
    /**
     * Emitted after update current traffic score.
     */
    onTrafficScore?: (event: TrafficScoreEvent) => void;
    /**
     * Emitted after the floor plan is shown on the map.
     */
    onFloorPlanShow?: (event: FloorPlanShowEvent) => void;
    /**
     * Emitted after the floor plan is disappeared from the map.
     */
    onFloorPlanHide?: (event: FloorPlanHideEvent) => void;
    /**
     * Emitted after the floor plan level is changed.
     */
    onFloorLevelChange?: (event: FloorLevelChangeEvent) => void;
    /**
     * Emitted after the map style is loaded.
     */
    onStyleLoad?: (event: StyleLoadEvent) => void;
    /**
     * Emitted after the map style fails to load.
     */
    onStyleLoadError?: (event: StyleLoadErrorEvent) => void;
    /**
     * Emitted after the map language is changed.
     */
    onChangeLanguage?: (event: ChangeLanguageEvent) => void;
    /**
     * Emitted after the map is destroyed.
     */
    onDestroy?: (event: DestroyMapEvent) => void;
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


type DGisMapGLMapRegistry = {



};
const DGisMapGLMapContext = createContext<DGisMapGLMapRegistry | null>(null);



export const useDGisMapGLMapContext = () => {
    const ctx = useContext(DGisMapGLMapContext);
    if (!ctx) throw new Error('useDGisMapGLMapContext must be used within <DGisMapGLMapProvider>');
    return ctx;
};


export const default_dark_theme_style_id = 'e05ac437-fcc2-4845-ad74-b1de9ce07555';
export const default_light_theme_style_id = 'c080bb6a-8134-4993-93a1-5b4d8c36a59b';



export const DGisMapGLMap = forwardRef<DGisMapGLMapRef, DGisMapGLMapProps>((props, ref) => {




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
                sendToWebView({
                    function: 'init',
                    params: mapOptionsKeys.reduce((acc, key) => {

                        if ((props as any)[key]) {

                            if (key == 'apiKey') {
                                (acc as any)['key'] = props.apiKey;
                            } else {

                                (acc as any)[key] = (props as any)[key];
                            }
                        }
                        return acc;
                    }, {} as any)
                });
            },
            web: `
             if(functionName === 'init') {
               

               map = new mapgl.Map('container', params);

               let events = ${JSON.stringify(Object.keys(mapEventKeys))};
               events.forEach(eventName => {
                   map.on(eventName, function(e) {
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
            native: (center: number[], options?: AnimationOptions) => {
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
                sendToWebView({
                    function: 'setStyleById',
                    params: {
                        styleId
                    }
                });
            },
            web: `
             if(functionName === 'setStyleById') {
                map.setStyleById(params.styleId);
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
        }
    };



    useImperativeHandle(ref, () => ({

        setCenter: (center: number[], options?: AnimationOptions) => {
            functionsMirror.setCenter.native(center, options);
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
        }
    }), [sendToWebView, webViewRef, props]);





    return (<DGisMapGLMapContext.Provider
        value={{

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
    </DGisMapGLMapContext.Provider>
    );
});
