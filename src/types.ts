/**
 * Geographical bounds.
 */
export interface LngLatBounds {
    /**
     * The south-west point of the bounds `[longitude, latitude]`.
     */
    southWest: number[];
    /**
     * The north-east point of the bounds `[longitude, latitude]`.
     */
    northEast: number[];
}

/**
 * Possible position of the control.
 */
export type ControlPosition = 'topLeft' | 'topCenter' | 'topRight' | 'centerLeft' | 'centerRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';

/**
 * Style options - paths to icons and fonts.
 */
export interface StyleOptions {
    /**
     * The url to the styles.
     */
    stylePath?: string;
    /**
     * The url to the icons.
     */
    iconsPath: string;
    /**
     * The url to the fonts.
     */
    fontsPath: string;
    /**
     * The url to the models.
     */
    modelsPath: string;
}

export type GraphicsPresetName = 'light' | 'normal' | 'immersive';

/**
 * Padding in pixels on different sides of the container.
 */
export interface Padding {
    /**
     * Top padding in pixels.
     */
    top: number;
    /**
     * Right padding in pixels.
     */
    right: number;
    /**
     * Bottom padding in pixels.
     */
    bottom: number;
    /**
     * Left padding in pixels.
     */
    left: number;
}

export type WebGLVersion = 1 | 2;

/**
 * Style state.
 * _activeFloorBuildingIds — an array of building IDs with active floor plans;
 * _activeFloorIds — an array of active floor IDs from buildings with active floor plans;
 * _activeFloorIsMetro - a flag which tells if active floors plan is a metro schema;
 * trafficOn - a flag which tells if traffic is enabled;
 * parkingOn - a flag which tells if parking is enabled (used in native version of 2gis);
 * navigatorOn - a flag which tells if navigator is enabled (used in native version of 2gis);
 * immersiveRoadsOn - a flag which tells if immersive roads are enabled;
 * terrainEnabled - a flag which tells if 3d terrain is enabled;
 * graphicsPreset - current graphics preset. Available values: 'light', 'normal', 'immersive'.
 */
export interface StyleState {
    [key: string]: number | string | boolean | number[] | string[] | object | undefined;
}

/**
/**
 * Map initialization options.
 */
export interface MapOptions {
    /**
     * Map center in geographical coordinates (`[longitude, latitude]`).
     */
    center?: number[];
    /**
     * Map zoom.
     */
    zoom?: number;
    /**
     * Map style zoom.
     * Use this option if you want to set the same zoom that is used in the style settings. The styleZoom and zoom options set the same map scale but in different projections.
     * If both options are set, the styleZoom has a higher priority than the zoom option.
     */
    styleZoom?: number;
    /**
     * Minimum map styleZoom.
     */
    minZoom?: number;
    /**
     * Maximum map styleZoom.
     */
    maxZoom?: number;
    /**
     * The map will be constrained to the given bounds, if set.
     */
    maxBounds?: LngLatBounds;
    /**
     * Loop the map when rendering at large scales or near the anti-meridian
     */
    loopWorld?: boolean;
    /**
     * Map rotation in degrees.
     */
    rotation?: number;
    /**
     * Map rotation threshold with multitouch in degrees. 10 by default.
     */
    touchRotationThreshold?: number;
    /**
     * Map pitch in degrees.
     */
    pitch?: number;
    /**
     * Minimum map pitch in degrees.
     */
    minPitch?: number;
    /**
     * Maximum map pitch in degrees.
     */
    maxPitch?: number;
    /**
     * Maximum map pitch in degrees for low zoom (zoom < 16.5).
     */
    lowZoomMaxPitch?: number;
    /**
     * The key that allows usage of the API.
     */
    key: string;
    /**
     * Whether a zoom control should be added during the map initialization. By default it's `"topRight"`.
     * Set to `false` to not add the control.
     */
    zoomControl?: ControlPosition | boolean;
    /**
     * Whether a traffic control should be added during the map initialization. By default it's `false`.
     * Set to `true` to add the traffic control at `"topRight"` position.
     */
    trafficControl?: ControlPosition | boolean;
    /**
     * Whether traffic layer is enabled on the map.
     */
    trafficOn?: boolean;
    /**
     * Whether a scale control should be added during the map initialization. By default it's `false`.
     * Set to `true` to add the scale control at `"bottomLeft"` position.
     */
    scaleControl?: ControlPosition | boolean;
    /**
     * Whether a floor control should be added during the map initialization. By default it's `false`.
     * Set to `true` to add the floor control at `"topRight"` position.
     */
    floorControl?: ControlPosition | boolean;
    /**
     * Where to add copyright control during the map initialization. By default it's `"bottomRight"`.
     */
    copyright?: ControlPosition;
    /**
     * Enables OSM copyright auto hide after 5 sec
     *
     * **[DEPRECATED]** This option is no longer supported and will be removed in the next major release.
     * @deprecated
     */
    autoHideOSMCopyright?: boolean;
    /**
     * Sets padding for controls layout
     */
    controlsLayoutPadding?: Partial<Padding>;
    /**
     * Disables hiding POIs behind objects such as buildings, 3D models, etc. False by default.
     */
    disableHidingPois?: boolean;
    /**
     * Disables map zoom on scrolling over the map container.
     */
    disableZoomOnScroll?: boolean;
    /**
     * Prevents users from rotating the map.
     */
    disableRotationByUserInteraction?: boolean;
    /**
     * Prevents center changing while user is zooming or rotating the map by touch.
     */
    keepCenterWhileUserZoomRotate?: boolean;
    /**
     * Prevents users from pitching the map.
     */
    disablePitchByUserInteraction?: boolean;
    /**
     * Prevents the map from dragging.
     */
    disableDragging?: boolean;
    /**
     * Enables map dragging using two touches.
     * If set to true, three touches will pitch map.
     * Single touch drag will be enabled also, use `disableDragging: true` to disable it.
     */
    enableTwoFingerDragging?: boolean;
    /**
     *  Dimensions in pixels applied on each side of the viewport for shifting the vanishing point.
     *  the padding on each side has a clamp to a positive value no larger than the map canvas size for either side
     */
    padding?: Padding;
    /**
     * Sets preserveDrawingBuffer option to WebGLRenderingContext.
     */
    preserveDrawingBuffer?: boolean;
    /**
     * Sets default background color, while style is loading
     */
    defaultBackgroundColor?: string;
    /**
     * The map style ID, that you can get at https://styles.2gis.com
     */
    style?: string | "dark" | "light";
    /**
     * Map style global variables
     */
    styleState?: StyleState;
    /**
     * Map style options. Containts path to style assets - icons, fonts, models etc.
     * Warning: If the options are incompatible, a broken style might be applied.
     * Map styles are constantly evolving in order to display new cartographic data.
     * By storing the style on your own side, you assume the responsibility to update it periodically and take care of its relevance.
     * It is recommended to use map.setStyleById to update styles during runtime.
     */
    styleOptions?: Partial<StyleOptions>;
    /**
     * The desired map language.
     * short language code 'en', 'ru', ...etc
     */
    lang?: string;
    /**
     * Enables map to download additional plugin for RTL-text rendering. Values are:
     *  - 'always-on' - plugin will be downloaded at map initialization.
     *  - 'always-off - plugin will not be downloaded.
     *  - 'depends-on-language' - plugin will be downloaded only if "ar" language is selected.
     *
     * Default value is 'depends-on-language'. If the language of the map is not rtl (eg. 'en')
     * and tiles contain rtl labels, you should use 'always-on' to render rtl label properly.
     */
    useRtlTextPlugin?: 'always-on' | 'always-off' | 'depends-on-language';
    /**
     * Tracks changes of the map container size and automatically updates the size of the map.
     */
    enableTrackResize?: boolean;
    /**
     * Disables fullscreen AntiAliasing when map is idle. True by default.
     */
    disableAntiAliasing?: boolean;
    /**
     * Disable render caching.
     */
    disableRenderingCache?: boolean;
    /**
     * Sets the map WebGL version. It can be helpful if you use CustomLayer with other WebGL libraries.
     */
    webglVersion?: WebGLVersion;
    /**
     * Sets active graphics preset.
     *
     * If set map will work in graphics preset mode:
     *   - map takes into an account configured graphics presets in style
     *   - map.getGraphicsPreset() method becomes available
     *
     * Otherwise, map will ignore graphics presets from style object.
     *
     * Available values:
     *   - 'light' - light graphics preset
     *   - 'normal' - normal graphics preset
     *   - 'immersive' - immersive graphics preset
     *   - 'auto' - *EXPERIMENTAL* graphics preset will be set depending on benchmark result
     */
    graphicsPreset?: 'auto' | GraphicsPresetName;
}

export interface LeafletLatLng {
    lat: number;
    lng: number;
}

export interface MapEventState {
    zoom: number | null; // getZoom(): number;
    rotation: number | null; // getRotation(): number;
    pitch: number | null; // getPitch(): number;
    center: number[] | null; // getCenter(): number[];
    styleZoom: number | null; // getStyleZoom(): number;
    latlng: LeafletLatLng | null;
}

export interface MapEvent {


    isUser: boolean;
};
/**
 * Emitted when traffic visibility state changes
 */
export interface TrafficVisibilityEvent {
}
export interface TrafficScoreEvent {
    /**
     * Current traffic score
     */
    score: number;
}

/**
 * Contains an appeared floor plan data.
 */
export interface FloorPlanShowEvent {
    /**
     * An id of an appeared floor plan.
     */
    floorPlanId: string;
    /**
     * An index of a current displayed floor level.
     */
    currentFloorLevelIndex: number;
    /**
     * All available floor plan levels.
     */
    floorLevels: FloorLevel[];
}
/**
 * Contains a floor level data.
 */
export interface FloorLevel {
    /**
     * A floor level index
     */
    floorLevelIndex: number;
    /**
     * A floor level name
     */
    floorLevelName: string;
}

/**
 * Contains a disappeared floor plan data.
 */
export interface FloorPlanHideEvent {
    /**
     * An id of a disappeared floor plan.
     */
    floorPlanId: string;
}

/**
 * Contains a current floor level data.
 */
export interface FloorLevelChangeEvent {
    /**
     * An id of a floor plan.
     */
    floorPlanId: string;
    /**
     * A current level index of a floor plan.
     */
    floorLevelIndex: number;
    /**
     * A current level name of a floor plan.
     */
    floorLevelName: string;
}

/**
 * Stub type representing the style.
 *
 * Real style types will appear a little bit later.
 */
export interface Style extends Record<string, any> {
}

/**
 * Contains currently loaded style response
 */
export interface StyleLoadEvent {
    /**
     * Style object, ID or URL. Depends on the way the style was set.
     */
    style: string | Style;
}

/**
 * Contains currently loaded error style response
 */
export interface StyleLoadErrorEvent {
    /**
     * ID or URL. Depends on the way the style was set.
     */
    style: string | Style;
}

/**
 * Contains current map language
 */
export interface ChangeLanguageEvent {
    /**
     * Language short name.
     */
    lang: string;
}

/**
 * Destroy event.
 */
export interface DestroyMapEvent {
}

/**
 * Graphics preset feature flags.
 */
export type GraphicsPresetFeatureFlag = 'skyOff' | 'fogOff' | 'shadowsOff' | 'immersiveRoadsOff' | 'modelsOff' | 'globeOff';


export interface GraphicsPreset extends Partial<Record<GraphicsPresetFeatureFlag, boolean>> {
}

export interface GraphicsPresetChangeEvent {
    name: GraphicsPresetName;
    preset: GraphicsPreset;
}
/**
 * A set of easing functions (https://easings.net/en).
 */
export type Easing = 'linear' | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad' | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic' | 'easeInQuart' | 'easeOutQuart' | 'easeInOutQuart' | 'easeInQuint' | 'easeOutQuint' | 'easeInOutQuint' | 'easeInSine' | 'easeOutSine' | 'easeInOutSine' | 'easeInExpo' | 'easeOutExpo' | 'easeInOutExpo' | 'easeInCirc' | 'easeOutCirc' | 'easeInOutCirc' | 'easeInElastic' | 'easeOutElastic' | 'easeInOutElastic' | 'easeInBack' | 'easeOutBack' | 'easeInOutBack' | 'easeOutBounce';


export interface AnimationOptions {
    /**
     * Determines if the transform should be animated.
     */
    animate?: boolean;
    /**
     * Duration of the animation in milliseconds.
     */
    duration?: number;
    /**
     * Easing function to be used with the animation.
     */
    easing?: Easing;
}

/**
 * Animation options for zoom.
 */
export interface ZoomAnimationOptions extends AnimationOptions {
    /**
     * Intermediate zoom values will be calculated using camera's height.
     *
     * - false (default): zoom values will be calculated using provided easing function.
     * - true: intermediate camera height calculated then converted into zoom.
     *
     * Initial and final zoom values are same for both modes, only timing function changes.
     *
     * true value is useful for simultaneous animation of map's center and zoom.
     * In that case camera will fly in a straight line.
     *
     * Example:
     * map.setCenter([82.920412, 55.030111], {easing: 'easeOutCubic', duration: 800});
     * map.setZoom(18, {easing: 'easeOutCubic', useHeightForAnimation: true, duration: 800});
     */
    useHeightForAnimation?: boolean;
}

/**
 * Options for map rotation animations.
 */
export interface RotationAnimationOptions extends AnimationOptions {
    /**
     * If enabled, the desired rotation will be normalized to (–180°; 180°], and
     * the direction of the rotation will be chosen so that the map makes less
     * than half a turn. `normalize: false` is useful for animating one of more
     * full turns of the map. Enabled by default.
     */
    normalize?: boolean;
}

/**
 * Options for fitBounds method.
 */
export interface FitBoundsOptions {
    /**
     * The amount of padding in pixels to add to the given bounds.
     */
    padding?: Partial<Padding>;
    /**
     * If true fitBounds ignores the padding property in the map options
     */
    skipMapPadding?: boolean;
    /**
     * If true the fitBounds will consider the map rotation
     */
    considerRotation?: boolean;
    /**
     * Animation options.
     */
    animation?: AnimationOptions;
    /**
     * The limit for the maximum zoom.
     */
    maxZoom?: number;
}


export type DMapRef = {
    setCenter(center: number[], options?: AnimationOptions): void;
    setZoom(zoom: number, options?: ZoomAnimationOptions): void;
    /**
     * Sets the map style zoom.
     * @param styleZoom The desired style zoom.
     * @param options Zoom animation options.
     */
    setStyleZoom(styleZoom: number, options?: AnimationOptions): void;
    /**
     * Sets the map rotation angle.
     * @param rotation The desired map rotation in degrees.
     * @param options Rotation animation options.
     */
    setRotation(rotation: number, options?: RotationAnimationOptions): void;

    /**
     * Sets the map pitch angle.
     * @param pitch The desired map pitch in degrees.
     * @param options Pitch animation options.
     */
    setPitch(pitch: number, options?: AnimationOptions): void;

    /**
     * Sets the minimum map zoom.
     * @param zoom The desired minimum zoom.
     * @param options Options for adjusting map zoom in case the current zoom is less than the new minimum.
     */
    setMinZoom(zoom: number, options?: AnimationOptions): void;

    /**
     * Sets the maximum map zoom.
     * @param zoom The desired maximum zoom.
     * @param options Options for adjusting map zoom in case the current zoom is more than the new maximum.
     */
    setMaxZoom(zoom: number, options?: AnimationOptions): void;
    /**
     * Sets the minimum map pitch.
     * @param pitch The desired minimum pitch in degrees.
     * @param options Options for animating the pitch in case the current pitch is less than the new minimum.
     */
    setMinPitch(pitch: number, options?: AnimationOptions): void;
    /**
     * Sets the maximum map pitch.
     * @param pitch The desired maximum pitch in degrees.
     * @param options Options for animating the pitch in case the current pitch is more than the new maximum.
     */
    setMaxPitch(pitch: number, options?: AnimationOptions): void;
    /**
     * Sets the maximum map pitch for low zooms (zoom < 16.5).
     * @param pitch The desired maximum pitch in degrees.
     * @param options Options for animating the pitch in case the current pitch is bigger than the new maximum.
     */
    setLowZoomMaxPitch(pitch: number, options?: AnimationOptions): void;


    /**
    * Shows the traffic layer on the map.
    */
    showTraffic(): void;
    /**
     * Hides the traffic layer from the map.
     */
    hideTraffic(): void;

    /**
     * Selects objects on the map by identifiers.
     * @param ids An array of identifiers of objects that should be selected.
     * @param scope The scope of the identifiers. If not specified default scope is used.
     */
    setLanguage(lang: string): void;



    setStyleById(styleId: string): void;

    setStyleFromUrl(styleUrl: string, options: StyleOptions): void;

    /**
     * Sets a floorLevel of the floorPlan.
     * @param floorPlanId id of the floor plan
     * @param floorLevelIndex floorLevelIndex in floorLevels list
     */
    /**
    * Sets a bound to limit movings on map
    * @param bounds 2 lon-lat points to limit square
    */
    setMaxBounds(bounds: LngLatBounds): void;
    /**
    * Sets the map padding.
    * The padding on each side has a clamp to a positive value no larger than the map canvas size for either side
    * @param padding Padding in pixels from the different sides of the map canvas
    * @param options Padding animation options.
    */
    setPadding(padding: Partial<Padding>, options?: AnimationOptions): void;
    /**
   * Pans and zooms the map to contain its visible area within the specified geographical bounds.
   * This method also resets the map pitch and rotation to 0.
   * But the map rotation can be saved by option considerRotation
   *
   * @param bounds The geographical bounds to fit in
   * @param options FitBounds options
   */
    fitBounds(bounds: LngLatBounds, options?: FitBoundsOptions): void;

    flyTo: (latlng: LatLngLiteral, zoom?: number, options?: ZoomPanOptions) => void;


}

export interface ZoomOptions {
    animate?: boolean | undefined;
}

export interface PanOptions {
    animate?: boolean | undefined;
    duration?: number | undefined;
    easeLinearity?: number | undefined;
    noMoveStart?: boolean | undefined;
}


export interface ZoomPanOptions extends ZoomOptions, PanOptions { }

export interface LatLngLiteral {
    lat: number;
    lng: number;
    alt?: number;
}

export type LatLngTuple = [number, number, number?];


export type LatLngExpression = LatLngLiteral | LatLngTuple;


export type MarkerProps = {
    uniqueId: string,
    onPress?: () => void,
    options?: MarkerOptions,
    ignoreAutoFit?: boolean | undefined,
}


export interface MarkerOptions {
    /**
     * Geographical coordinates of marker center `[longitude, latitude, altitude?]`,
     * where altitude is an optional component in meters.
     */
    coordinates: number[];
    /**
     * Marker icon URL.
     */
    icon?: string;
    /**
     * Marker icon size `[width, height]` in pixels.
     */
    size?: number[];
    /**
     * The position in pixels of the "tip" of the icon (relative to its top left corner).
     * The icon will be aligned so that this point is at the marker's geographical location.
     * Centered by default if size is specified.
     */
    anchor?: number[];
    /** Marker icon opacity. */
    opacity?: number;
    /**
     * Icon clockwise rotation in the screen plane in degrees.
     */
    rotation?: number;


    /**
     * Draw order.
     */
    zIndex?: number;


}

/**
 * Defines the polyline rendering mode. Use:
 * - '3d' to use the depth buffer.
 * - '2d' to add a layer with no depth.
 */
export type PolylineRenderingMode = '2d' | '3d';

/**
 * Settings for drawing an object
 * on the surface of another map object
 */
export interface TierOption {
}
/**
 * Polyline initialization options.
 */
export interface PolylineOptions extends TierOption {
    /**
     * An array of polyline coordinates: `[firstPoint, secondPoint, ...]`.
     * Each point is a geographical point: `[longitude, latitude]`.
     */
    coordinates: number[][];
    /**
     * Draw order of the first line.
     */
    zIndex?: number;

    /**
     * The line width in pixels.
     */
    width?: number;


    /**
     * The line color in hexadecimal RGB (`#ff0000`) or RGBA (`#ff0000ff`) format.
     */
    color?: string;

    /**
     * The length of the gap in pixels. The default gap length is equal to the dash length.
     */
    gapLength?: number;
    /**
     * The gap color in hexadecimal RGB (`#ff0000`) or RGBA (`#ff0000ff`) format.
     */
    gapColor?: string;
    /**
     * The length of the dash in pixels. If no dash length is specified, a polyline will be drawn.
     */
    dashLength?: number;
    /**
     * Minimum display styleZoom.
     */
    minZoom?: number;
    /**
     * Maximum display styleZoom.
     */
    maxZoom?: number;
    /**
     * Allows the polyline to emit events (like `mouseover`). `true` by default.
     */
    interactive?: boolean;
    /**
     * User specific data.
     */
    userData?: any;
    /**
     * Rendering mode. '2d' is default.
     */
    renderingMode?: PolylineRenderingMode;
    /**
     * The color of a line section that is hidden by other objects in '3d' rendering mode
     * in RGB hexadecimal (`#ff0000`) or RGBA (`#ff0000ff`) format.
     */
    hiddenPartColor?: string;
    /**
     * The gap color of a line section that is hidden by other objects in '3d' rendering mode
     * in RGB hexadecimal (`#ff0000`) or RGBA (`#ff0000ff`) format.
     */
    hiddenPartGapColor?: string;
}


export type PolylineProps = {
    uniqueId: string,
    options?: PolylineOptions,
    ignoreAutoFit?: boolean | undefined,

}


export type LabelProps = {
    uniqueId: string,
    onPress?: () => void,
    options?: LabelOptions,
    ignoreAutoFit?: boolean | undefined,

}
/**
 * Source image for text label background.
 */
export interface LabelImage {
    /**
     * Source image URL.
     */
    url: string;
    /**
     * `[width, height]` — image size in logical pixels
     */
    size: [number, number];
    /**
     * Defines the parts of the image that can be stretched horizontally.
     */
    stretchX?: Array<[number, number]>;
    /**
     * Defines the parts of the image that can be stretched vertically.
     */
    stretchY?: Array<[number, number]>;
    /**
     * The ratio of logical pixels in the image to physical pixels on the screen.
     */
    pixelRatio?: number;
    /**
     * Sets the space in pixels between the label text box and the edge of the stretched image
     * for all four sides [top, right, bottom, left], like in CSS.
     * [0, 0, 0, 0] by default.
     */
    padding?: [number, number, number, number];
}

/**
 * Label initialization options.
 */
export interface LabelOptions {
    /**
     * An array of numbers `[longitude, latitude, height?]`, where:
     *   - 'longitude' and 'latitude' are the geographical coordinates of the top-left corner of the label.
     *     Taking into account the `relativeAnchor` option.
     *   - 'height' is an optional number in meters by which the label will be raised/lowered (depending on the sign of the value)
     *     relative to the map surface. 0 by default.
     */
    coordinates: number[];
    /**
     * Label's text.
     */
    text: string;

    /**
    * Background image for the label.
    */
    image?: LabelImage;
    /**
     * Minimum display styleZoom of the label.
     */
    minZoom?: number;
    /**
     * Maximum display styleZoom of the label.
     */
    maxZoom?: number;
    /**
     * Text color in hexadecimal RGB (`#ff0000`) or RGBA (`#ff0000ff`) format.
     */
    color?: string;
    /**
     * Text size.
     */
    fontSize?: number;
    /**
     * Use `haloRadius` to add background behind each letter.
     */
    haloRadius?: number;
    /**
     * Background color of letters (when `haloRadius` is specified). The same format as for `color`.
     */
    haloColor?: string;
    /**
     * Space between each letter.
     */
    letterSpacing?: number;
    /**
     * For multiline label `lineHeight` specify how far lines between each other.
     */
    lineHeight?: number;
    /**
     * The offset distance of text box from its `relativeAnchor`.
     * Positive values indicate left and up, while negative values indicate right and down.
     *
     * **[DEPRECATED]** Will be removed in the next major release, use the `offset` option instead.
     * @deprecated
     */
    anchor?: number[];
    /**
     * The offset distance of text box from its `relativeAnchor`.
     * Positive values indicate right and down, while negative values indicate left and up.
     */
    offset?: number[];
    /**
     * Coordinates (from 0 to 1 in each dimension) of the text box "tip" relative to its top left corner, for example:
     * [0, 0] value is the top left corner, [0.5, 0.5] — center point, and [1, 1] is the bottom right corner of the box.
     * The label will be placed so that this point is at geographical `coordinates` respects the absolute `offset`.
     */
    relativeAnchor?: number[];
    /**
     * Draw order.
     */
    zIndex?: number;
    /**
     * User specific data.
     */
    userData?: any;
    /**
     * Allows the label to emit events (like `mouseover`). `false` by default.
     */
    interactive?: boolean;
    /**
     * Labeling options
     * - none — the label is not involved in the labeling process in any way
     * - pointLabelsOnly — the label overlaps or can be overlapped
     * by labels having this labeling option specified as type
     */
    labeling?: {
        type: 'none';
    } | {
        type: 'pointLabelsOnly';
    };
}



export type HtmlMarkerProps = {
    uniqueId: string,
    options?: HtmlMarkerOptions,
    ignoreAutoFit?: boolean | undefined,

}

/**
 * HtmlMarker initialization options.
 */
export interface HtmlMarkerOptions {
    /**
     * An array of numbers `[longitude, latitude, height?]`, where:
     *   - 'longitude' and 'latitude' are the geographical coordinates of the top-left corner of the HTML marker.
     *     Taking into account the 'anchor' option.
     *   - 'height' is an optional number in meters by which the marker will be raised/lowered (depending on the sign of the value)
     *     relative to the map surface. 0 by default.
     */
    coordinates: number[];
    /**
     * HTML content of the HTML marker.
     */
    html: HTMLElement | string;
    /**
     * The position in pixels of the "tip" of the HTML marker relative to its top-left corner.
     */
    anchor?: number[];
    /**
     * Minimum display styleZoom of the HTML marker.
     */
    minZoom?: number;
    /**
     * Maximum display styleZoom of the HTML marker.
     */
    maxZoom?: number;
    /**
     * Draw order.
     */
    zIndex?: number;
    /**
     * Capture events if set. Otherwise events will passed to the map. By default it's `true`.
     */
    preventMapInteractions?: boolean;
    /**
     * User specific data.
     */
    userData?: any;
    /**
     * HTML marker can be pointer-event target if this option is set to `true` (pointer-events: auto),
     * otherwise it can't (pointer-events: none).
     */
    interactive?: boolean;
    /**
     * If true, the marker coordinates will not be rounded. By default it's `false`.
     */
    disableRounding?: boolean;
    /**
     * HTML marker labeling options.
     * - type: 'none' — the marker is always visible and not involved in labeling
     * - type: 'full' — the marker can hide other labeling elements or can be hidden
     * - type: 'invincible' — the marker is always visible and can hide other labeling elements
     * - type: 'pinnedToPoi' — the marker can hide other labeling elements or can be hidden. It's labeling behavior is taken from the linked POI id.
     * - width — the width of the labeling box
     * - height — the height of the labeling box
     * - offset — the offset in pixels of the labeling box. Positive values indicate right and down, while negative values indicate left and up.
     * - poiId — the linked POI id
     */
    labeling?: {
        type: 'none';
    } | {
        type: 'invincible' | 'full';
        width: number;
        height: number;
        offset?: number[];
    } | {
        type: 'pinnedToPoi';
        poiId: string;
        width: number;
        height: number;
        offset?: number[];
    };
}


export type PolygonProps = {
    uniqueId: string,
    options?: PolygonOptions,
    ignoreAutoFit?: boolean | undefined,

}

/**
 * Polygon initialization options.
 */
export interface PolygonOptions extends TierOption {
    /**
     * Geographical coordinates of polygon points in format: `[outerEdges, cropEdges1, cropEdges2, ...]`.
     *
     * The first section is `outerEdges` which describes an array of outer edges: `[firstPoint, secondPoint, ..., firstPoint]`.
     * Each point is a geographical point: `[longitude, latitude]`. The last point should be the same as the first.
     *
     * Then optionally you can crop some polygons from the main one (outer) by specifying `cropEdges1`, `cropEdges2` and so on.
     * A format is the same as the main section: `[firstPoint, secondPoint, ..., firstPoint]` each point is `[longitude, latitude]`.
     *
     * Important: `outerEdges` and `cropEdgesN` must not touch or intersect each other.
     *
     * Only the first section (`outerEdges`) is required. There may be many `cropEdges` sections.
     */
    coordinates: number[][][];
    /**
     * Draw order.
     */
    zIndex?: number;
    /**
     * Minimum display styleZoom.
     */
    minZoom?: number;
    /**
     * Maximum display styleZoom.
     */
    maxZoom?: number;
    /**
     * Fill color in hexadecimal RGB (`#ff0000`) or RGBA (`#ff0000ff`) format.
     */
    color?: string;
    /**
     * Stroke color in hexadecimal RGB (`#ff0000`) or RGBA (`#ff0000ff`) format.
     */
    strokeColor?: string;
    /**
     * Stroke width in pixels.
     */
    strokeWidth?: number;
    /**
     * Allows the polygon to emit events (like `mouseover`). `true` by default.
     */
    interactive?: boolean;
    /**
     * User specific data.
     */
    userData?: any;
}