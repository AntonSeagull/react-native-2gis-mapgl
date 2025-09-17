


export const getWebContent = async (params: {

    mapglGisJSLink: string;
    functionsMirrorJS: string;
    injectCSS?: string;
    injectJS?: string;
    injectHTML?: string;
}) => {
    //Загружаем скрипты как текст


    const response = await fetch(params.mapglGisJSLink);
    const mapglGisJS = await response.text();




    return `<!DOCTYPE html>
<html lang="">

<head>
    <meta charset="utf-8" />
 <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title></title>

   
    <script>${mapglGisJS}</script>
    
   
   
</head>

<body>
    <div id="map" style="width: 100vw; height: 100vh"></div>
    ${params.injectHTML ? params.injectHTML : ''}
</body>

<script>



   window.onload = function () {
        document.addEventListener("message", function (event) {
            receiveMessage(event.data);
        });
        window.addEventListener("message", function (event) {
            receiveMessage(event.data);
        });
    }

    var map = null;

    var markers = {};
    var polylines = {};
    var polygons = {};
    var rectangles = {};

    var tileLayer = null;



    const receiveMessage = (message) => {

      var data = JSON.parse(message);

      var functionName = data.function;
      var params = data.params;
      
     




      try{

${params.functionsMirrorJS}

}      catch (e) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'error',
            data: {
                target: functionName,
                message: JSON.stringify(e.message),
            }
        }));
        }
    };


    ${params.injectJS ? params.injectJS : ''}
   
</script>



<style>
    html,
    body {
        overflow: hidden;
        height: 100wh;
        width: 100vw;
        margin: 0;
        padding: 0;
        background: transparent;
    }

    * {
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }


    * {
        -webkit-touch-callout: none;
        -moz-touch-callout: none;
        -ms-touch-callout: none;
        touch-callout: none;
    }

    * {
        -webkit-user-drag: none;
        -moz-user-drag: none;
        -ms-user-drag: none;
        user-drag: none;
    }

   

    ${params.injectCSS ? params.injectCSS : ''}
   
</style>


</html>`;
};
