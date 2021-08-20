/* ----------menu CSS---------- */

const css = `.download-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: inline-block;
  float: left;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  list-style: none;
  font-size: 14px;
  background-color: #fff;
  border: 1px solid #ccc;
  border: 1px solid rgba(0,0,0,.15);
  border-radius: 4px;
  -webkit-box-shadow: 0 6px 12px rgba(0,0,0,.175);
  box-shadow: 0 6px 12px rgba(0,0,0,.175);
  background-clip: padding-box;
}

.download-menu>li>a {
  display: block;
  padding: 3px 20px;
  clear: both;
  font-weight: 400;
  line-height: 1.42857143;
  color: #333;
  white-space: nowrap;
  text-decoration: none;
  background: 0 0;
}

.download-menu>li>a:hover, .download-menu>li>a:focus {
  text-decoration: none;
  color: #262626;
  background-color: #f5f5f5;
}`

/* ----------ID---------- */

var parentDivId = '#main-card';
var svgId = 'mainSVG';

/* ----------execute---------- */

downloadableSVG();

/* ----------function---------- */

function downloadableSVG() {
    
    let filename = 'image';
    
    // 如果没找到downloadable-css，就把开头的css写入
    if ( d3.select('#downloadable-css').empty() ) {
        d3.select('head')
            .append('style')
            .attr('id', 'downloadable-css')
            .text(css);
    }
    
    // 右键的回调
    d3.select(parentDivId)
        .on('contextmenu', () => {
        console.log(d3.event)
        const f = () => {
            // 鼠标位置
            pos = [d3.event.pageX - 10, d3.event.pageY - 10];
            // 生成右键菜单
            createMenu(pos, filename);
            // 
            d3.event.preventDefault();
        }
        
        if (d3.event == null) {
            d3.customEvent(window.event, f); // Hack for React
        } else {
            f();
        }
    } ) // end of selection.on
}

function createMenu(pos, filename) {
    
    // 生成右键菜单
    const menu = d3.select('body')
        .append('ul')
        .classed('download-menu', true)
        .style('left', `${pos[0]}px`)
        .style('top', `${pos[1]}px`)
        .on('mouseleave', () => {
            menu.remove();
        } )
    const list = menu.append('li');
    
    // svgURL
    var svgURL = genernateURL();
    
    // 添加选项
    list.append('a')
        .text('Save as SVG')
        .attr('download', filename + '.svg')
        .attr('href', svgURL);
    list.append('a')
        .text('Save as PNG')
        .attr('download', filename + '.png')
        .attr('id', 'savepng');
    list.append('a')
        .text('Save as JPG')
        .attr('download', filename + '.jpeg')
        .attr('id', 'savejpg');
    
    // svg2image
    var svg = document.getElementById(svgId); // 用于获取宽和高
    var image = new Image;
    image.src = svgURL;
    var canvas = document.createElement("canvas");
    canvas.width = svg.getAttribute("width");
    canvas.height = svg.getAttribute("height");
    var context = canvas.getContext("2d");
    context.fillStyle = '#fff'; // #fff设置保存后的png背景是白色
    context.fillRect(0, 0, 10000, 5000); // 背景尽量设得大一点
    
    // 等图片加载好之后再执行，否则会输出空白
    image.onload = function() {
        context.drawImage(image, 0, 0);
        pngURL = canvas.toDataURL("image/png");
        jpgURL = canvas.toDataURL("image/jpeg");
        d3.select('#savepng').attr('href',pngURL);
        d3.select('#savejpg').attr('href',jpgURL);
    };
}

function genernateURL() {
    
    // get svg element.
    var svg = document.getElementById(svgId);
    
    // get svg source.
    var serializer = new XMLSerializer();
    var source = '<?xml version="1.0" standalone="no"?>\r\n' + serializer.serializeToString(svg);
    
    // add name spaces.
    if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg" ');
    }
    if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
        source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
    }
    
    // convert svg source to URI data scheme.
    var svgURL = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
    
    return svgURL
}