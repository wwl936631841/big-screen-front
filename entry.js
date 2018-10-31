// 引入布局

// 上部单极左侧导航
import '@layouts/frame'

// 上侧边栏
import '@layouts/halo'

// 左侧边栏
import '@layouts/hola'

import './packages'

import './modules'


import './styles/index.scss'
import './styles/gis.scss'

// //地图设置store
// import gisSetStore from './pages/sysconfig/store'
// nenv.loader({ store: gisSetStore })

//地图store
import mapStore from './pages/gis/MapFrame/store'
nenv.loader({ store: mapStore })

import { loadScript } from 'esri-loader'

// "nenv": "git+http://192.168.37.5/nenv/nenv.git"

// preload the ArcGIS API
const options = {
    // url: 'http://js.arcgis.com/3.23/',
    // url: 'http://192.168.37.4/arcgis_js_v325_api/arcgis_js_api/library/3.25/3.25/init.js',
    url: 'http://113.100.142.125:8580/arcgis_js_v325_api/arcgis_js_api/library/3.25/3.25/init.js',

    // tell Dojo where to load other packages
    dojoConfig: {
        async: true,
        packages: [{
            name: 'dextra',
            location: location.pathname.replace(/\/[^/]+$/, "") + "static/lib"
        }]
    }
};
loadScript(options)