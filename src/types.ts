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
    apiKey: string;
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
    style?: string;
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

export const mapOptionsKeys = [
    "center",
    "zoom",
    "styleZoom",
    "minZoom",
    "maxZoom",
    "maxBounds",
    "loopWorld",
    "rotation",
    "touchRotationThreshold",
    "pitch",
    "minPitch",
    "maxPitch",
    "lowZoomMaxPitch",
    "apiKey",
    "zoomControl",
    "trafficControl",
    "trafficOn",
    "scaleControl",
    "floorControl",
    "copyright",
    "autoHideOSMCopyright",
    "controlsLayoutPadding",
    "disableHidingPois",
    "disableZoomOnScroll",
    "disableRotationByUserInteraction",
    "keepCenterWhileUserZoomRotate",
    "disablePitchByUserInteraction",
    "disableDragging",
    "enableTwoFingerDragging",
    "padding",
    "preserveDrawingBuffer",
    "defaultBackgroundColor",
    "style",
    "styleState",
    "styleOptions",
    "lang",
    "useRtlTextPlugin",
    "enableTrackResize",
    "disableAntiAliasing",
    "disableRenderingCache",
    "webglVersion",
    "graphicsPreset"
];

export interface MapEvent {
    /**
     * True if event was emitted by user's interaction.
     */
    isUser: boolean;
}
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


export type DGisMapGLMapRef = {
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


}