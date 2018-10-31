import { loadModules } from "esri-loader";

export async function createLayer(layerInfo) {
    let modules = await loadModules(["esri/layers/GraphicsLayer", "esri/layers/FeatureLayer", "esri/layers/ArcGISTiledMapServiceLayer"])
        .catch(err => {
            console.error(err);
        });

    let [GraphicsLayer, FeatureLayer, ArcGISTiledMapServiceLayer] = modules;

    if (!layerInfo) return null;
    let layer;
    switch (layerInfo.feature_type) {
        case "1": //SDE-点
        case "2": //SDE-线
        case "3": //SDE-面
            /*因为从sde数据库读取数据比较耗时,此时并未真正加载数据，待图层树中勾选时候再加载*/
            layer = new GraphicsLayer();
            layer.id = layerInfo.layer_name ? layerInfo.layer_name : "";
            if (layerInfo.type && layerInfo.json) {
                layer.setRenderer(createSimpleRender(layerInfo));
            }
            layer.visible = false;
            break;
        case "4": //ArcGIS动态地图服务-点
        case "5": //ArcGIS动态地图服务-线
        case "6": //ArcGIS动态地图服务-面
            layer = new FeatureLayer(layerInfo.tile_url, {
                mode: FeatureLayer.MODE_SNAPSHOT
            });
            //layer.minScale=layerInfo.min_scale?layerInfo.min_scale:0;
            //layer.maxScale=layerInfo.max_scale?layerInfo.max_scale:0;
            layer.id = layerInfo.layer_name ? layerInfo.layer_name : "";
            if (layerInfo.type && layerInfo.json) {
                layer.setRenderer(createSimpleRender(layerInfo));
            }
            layer.visible = layerInfo.default_visible;
            break;
        case "7": //ArcGIS瓦片地图服务
            layer = new ArcGISTiledMapServiceLayer(layerInfo.tile_url);
            break;
        case "8": //天地图
            //layer = new Mage();
            break;
        case "9": //ArcGIS动态地图服务
            //layer = new Archer();
            break;
        case "10": //视图数据
            layer = new GraphicsLayer();
            layer.minScale = layerInfo.min_scale ? layerInfo.min_scale : 0;
            layer.maxScale = layerInfo.max_scale ? layerInfo.max_scale : 0;
            layer.id = layerInfo.layer_name ? layerInfo.layer_name : "";
            if (layerInfo.render_type && layerInfo.render_json) {

                let renderInfo = { type: layerInfo.render_type, json: layerInfo.render_json };
                let render = await createRender(renderInfo);
                layer.setRenderer(render);
            }
            layer.visible = layerInfo.default_visible;
            break;
        default:
            layer = null;
    }

    //console.log(3, layer);
    return layer;
}

//创建渲染
export async function createRender(renderInfo) {
    let modules = await loadModules(['esri/renderers/SimpleRenderer', 'esri/renderers/UniqueValueRenderer', 'esri/renderers/ClassBreaksRenderer'])
        .catch(err => {
            console.error(err);
        });

    let [SimpleRenderer, UniqueValueRenderer, ClassBreaksRenderer] = modules;

    if (!renderInfo) return null;
    let render = null;

    switch (renderInfo.type) {
        case "simple":
            render = new SimpleRenderer(renderInfo.json);
            break;
        case "uniqueValue":
            render = new UniqueValueRenderer(renderInfo.json);
            break;
        case "classBreaks":
            render = new ClassBreaksRenderer(renderInfo.json);
            break;
        default:
            break;
    }
    return render;
}

//创建热力图
export async function CreateHeatMapLayer(heatLayerId, mapInstance) {
    let modules = await loadModules(["esri/layers/FeatureLayer", "esri/renderers/HeatmapRenderer"])
        .catch(err => {
            console.error(err);
        });

    let [FeatureLayer, HeatmapRenderer] = modules;

    let layerDefinition = {
        "geometryType": "esriGeometryPoint",
        "fields": [{
                "name": "X",
                "type": "esriFieldTypeDouble",
                "alias": "X"
            },
            {
                "name": "Y",
                "type": "esriFieldTypeDouble",
                "alias": "Y"
            }
        ]
    };

    let featureCollection = {
        layerDefinition: layerDefinition,
        featureSet: null
    };

    let hFeatureLayer = new FeatureLayer(featureCollection, {
        id: heatLayerId,
        mode: FeatureLayer.MODE_SNAPSHOT,
        opacity: 1
    });
    mapInstance.addLayer(hFeatureLayer);

    let heatmapRenderer = new HeatmapRenderer({
        // colors: ["rgba(173, 175, 245, 0)", "rgb(230, 235, 208)", "rgb(238, 219, 78)", "rgb(205, 116, 122)"],//原型色带
        // colors: ["rgba(255, 0, 0,0)", "rgb(255, 255, 0)", "rgb(0, 128, 0)", "rgb(0, 0, 255)"], //百度地图色带
        // colors: ["rgba(0, 0, 255,0)", "rgb(0, 128, 0)", "rgb(255, 255, 0)", "rgb(255, 0, 0)"], //百度地图色带
        colors: ["rgba(0, 0, 225,0)", "rgb(117, 211, 248)", "rgb(0, 255, 0)", "rgb(255, 234, 0)", "rgb(255, 0, 0)"], //高德地图色带
        blurRadius: 40,
        maxPixelIntensity: 230,
        minPixelIntensity: 8
    });
    hFeatureLayer.setRenderer(heatmapRenderer);
    return hFeatureLayer;
};

export function ZoomToExtent(points, map) {

    loadModules(["esri/graphicsUtils"])
        .then(([graphicsUtils]) => {
            //缩放至可见图层范围
            if (points.length > 1) {
                let myExtent = graphicsUtils.graphicsExtent(points).expand(1.5);
                map.setExtent(myExtent);
            } else if (points.length === 1) {
                //缩放并居中
                let geometry = points[0].geometry;
                map.centerAndZoom(geometry, 15);
            }
        })
        .catch(
            err => { console.error(err); }
        );
}

export function ZoomToPoint(x, y, map) {
    loadModules(["esri/geometry/Point", "esri/SpatialReference"])
        .then(([Point, SpatialReference]) => {
            //缩放并居中
            let geometry = new Point(x, y, new SpatialReference({ wkid: 4326 }));
            map.centerAndZoom(geometry, 15);
        })
        .catch(
            err => { console.error(err); }
        );
}