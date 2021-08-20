/* ----------SVG的宽度和高度---------- */

var mainSVG_WIDTH = 700,
    mainSVG_HEIGHT = 350;

/* ----------投影中心---------- */

var lon = lat = gamma = 0;

/* ----------颜色---------- */

var landColor = "#dfc57b",
    oceanColor = "#46a3c4",
    graticuleColor = "#777777",
    strokeColor = "#000000";

/* ----------json，不能是路径，只能是链接---------- */

var jsonURL = "https://static.observableusercontent.com/files/f75ca3dc7c0b65cf225cea300e01e5e3cb5abf4ad75592936a2b6c79b797e933a208355d31d5b160f5b1db2a7de61fa402fe279d036a052211cd09462f524cad?response-content-disposition=attachment%3Bfilename*%3DUTF-8%27%27land-110m.json";

/* ----------meau的选项---------- */

var options = [
    {name: "Aitoff", projection: d3.geoAitoff()},
    {name: "Albers", projection: d3.geoAlbers().parallels([20, 50])},
    {name: "August", projection: d3.geoAugust()},
    {name: "Baker", projection: d3.geoBaker()},
    {name: "Boggs", projection: d3.geoBoggs()},
    {name: "Bonne", projection: d3.geoBonne()},
    {name: "Bottomley", projection: d3.geoBottomley()},
    {name: "Bromley", projection: d3.geoBromley()},
    {name: "Collignon", projection: d3.geoCollignon()},
    {name: "Conic Equal Area", projection: d3.geoConicEqualArea()},
    {name: "Conic Equidistant", projection: d3.geoConicEquidistant()},
    {name: "Craster Parabolic", projection: d3.geoCraster()},
    {name: "Cylindrical Equal-Area", projection: d3.geoCylindricalEqualArea()},
    {name: "Eckert I", projection: d3.geoEckert1()},
    {name: "Eckert II", projection: d3.geoEckert2()},
    {name: "Eckert III", projection: d3.geoEckert3()},
    {name: "Eckert IV", projection: d3.geoEckert4()},
    {name: "Eckert V", projection: d3.geoEckert5()},
    {name: "Eckert VI", projection: d3.geoEckert6()},
    {name: "Eisenlohr", projection: d3.geoEisenlohr()},
    {name: "Equirectangular", projection: d3.geoEquirectangular()},
    {name: "Fahey", projection: d3.geoFahey()},
    {name: "Foucaut", projection: d3.geoFoucaut()},
    {name: "Gilbert", projection: d3.geoGilbert()},
    {name: "Ginzburg IX", projection: d3.geoGinzburg9()},
    {name: "Goode Homolosine", projection: d3.geoHomolosine()},
    {name: "Gringorten", projection: d3.geoGringorten()},
    {name: "Guyou", projection: d3.geoGuyou()},
    {name: "Hammer", projection: d3.geoHammer()},
    {name: "Hill", projection: d3.geoHill()},
    {name: "Kavrayskiy VII", projection: d3.geoKavrayskiy7()},
    {name: "Lambert cylindrical equal-area", projection: d3.geoCylindricalEqualArea()},
    {name: "Lagrange", projection: d3.geoLagrange()},
    {name: "Larrivée", projection: d3.geoLarrivee()},
    {name: "Laskowski", projection: d3.geoLaskowski()},
    {name: "Loximuthal", projection: d3.geoLoximuthal()},
    {name: "Miller", projection: d3.geoMiller()},
    {name: "McBryde–Thomas Flat-Polar Parabolic", projection: d3.geoMtFlatPolarParabolic()},
    {name: "McBryde–Thomas Flat-Polar Quartic", projection: d3.geoMtFlatPolarQuartic()},
    {name: "McBryde–Thomas Flat-Polar Sinusoidal", projection: d3.geoMtFlatPolarSinusoidal()},
    {name: "Mollweide", projection: d3.geoMollweide()},
    {name: "Natural Earth", projection: d3.geoNaturalEarth()},
    {name: "Nell–Hammer", projection: d3.geoNellHammer()},
    {name: "Orthographic", projection: d3.geoOrthographic()},
    {name: "Patterson", projection: d3.geoPatterson()},
    {name: "Polyconic", projection: d3.geoPolyconic()},
    {name: "Rectangular Polyconic", projection: d3.geoRectangularPolyconic()},
    {name: "Robinson", projection: d3.geoRobinson()},
    {name: "Sinusoidal", projection: d3.geoSinusoidal()},
    {name: "Sinu-Mollweide", projection: d3.geoSinuMollweide()},
    {name: "Times", projection: d3.geoTimes()},
    {name: "van der Grinten", projection: d3.geoVanDerGrinten()},
    {name: "van der Grinten IV", projection: d3.geoVanDerGrinten4()},
    {name: "Wagner IV", projection: d3.geoWagner4()},
    {name: "Wagner VI", projection: d3.geoWagner6()},
    {name: "Wagner VII", projection: d3.geoWagner7()},
    {name: "Winkel Tripel", projection: d3.geoWinkel3()}
];

options.forEach(function(opt) {
    opt.projection.rotate([0, 0]).center([0, 0]);
});

/* ----------给控件设置颜色和callback---------- */

setDefaultColor();

d3.selectAll('.projection-menu')
        .on('change', projectionMorph)
    .selectAll("option")
        .data(options)
    .enter().append("option")
        .text(function(d) { return d.name; });

d3.select(".main-card")
    .call(d3.drag().on("drag", dragged))

/* ----------随机选择---------- */

var menu1 = d3.select("#projection-menu1")
    .property("value", options[Math.floor(Math.random()*options.length)].name);

var menu2 = d3.select("#projection-menu2")
    .property("value", options[Math.floor(Math.random()*options.length)].name);

/* ----------mainSVG---------- */

var mainSVG = d3.select("#mainSVG")
    .attr("width", mainSVG_WIDTH)
    .attr("height",mainSVG_HEIGHT)

var defs = mainSVG.append("defs")

defs.append("path")
    .datum({type: "Sphere"})
    .attr("id", "sphereMain")

mainSVG.append("use")
    .attr("class", "stroke")
    .attr("fill", "none")
    .attr("stroke-width", "2px")
    .attr("stroke", strokeColor)
    .attr("xlink:href", "#sphereMain");

mainSVG.append("use")
    .attr("class", "ocean")
    .attr("fill", oceanColor)
    .attr("xlink:href", "#sphereMain");

mainSVG.append("path")
    .datum(d3.geoGraticule())
    .attr("class", "graticule")
    .attr("fill", "none")
    .attr("stroke-width", ".5px")
    .attr("stroke-opacity", ".5")
    .attr("stroke", graticuleColor)

/* ----------sphereSVG---------- */

var sphereSVG = d3.select("#sphereSVG")

defs = sphereSVG.append("defs")

defs.append("path")
    .datum({type: "Sphere"})
    .attr("id", "sphere")

sphereSVG.append("use")
    .attr("class", "stroke")
    .attr("fill", "none")
    .attr("stroke-width", "2px")
    .attr("stroke", strokeColor)
    .attr("xlink:href", "#sphere");

sphereSVG.append("use")
    .attr("class", "ocean")
    .attr("fill", oceanColor)
    .attr("xlink:href", "#sphere");

sphereSVG.append("path")
    .datum(d3.geoGraticule())
    .attr("class", "graticule")
    .attr("fill", "none")
    .attr("stroke-width", ".5px")
    .attr("stroke-opacity", ".5")
    .attr("stroke", graticuleColor)

/* ----------timer---------- */

var t = d3.timer(function() {});

/* ----------json---------- */

d3.json(jsonURL, function(error, world) {
    if (error) throw error;
    
    mainSVG.insert("path", ".graticule")
        .datum(topojson.feature(world, world.objects.land))
        .attr("class", "land")
        .attr("fill", landColor)
    sphereSVG.insert("path", ".graticule")
        .datum(topojson.feature(world, world.objects.land))
        .attr("class", "land")
        .attr("fill", landColor)
    
    // 绘制sphere
    projectionSphere();
    // 渐变动画
    t.restart(timerFcn, 100)
}
);

/* ----------callback---------- */

function timerFcn(elapsed) {
    document.getElementById('slider-blend').value = elapsed * 4;
    projectionMorph()
    if (elapsed > 2500) t.stop()
}

function changeBlend() {
    t.stop();
    projectionMorph();
}

function changeLongitude() {
    lon = d3.select('#slider-longitude').property('value');
    lon = Number(lon);
    projectionMorph();
    projectionSphere();
}

function changeLatitude() {
    lat = d3.select('#slider-latitude').property('value');
    lat = Number(lat);
    projectionMorph();
    projectionSphere();
}

function changeGamma() {
    gamma = d3.select('#slider-gamma').property('value');
    gamma = Number(gamma);
    projectionMorph();
    projectionSphere();
}

function changeLandColor() {
    let color = d3.select('#land-color').property('value');
    d3.selectAll('.land').attr('fill',color);
}
function changeOceanColor() {
    let color = d3.select('#ocean-color').property('value');
    d3.selectAll('.ocean').attr('fill',color);
}
function changeGraticuleColor() {
    let color = d3.select('#graticule-color').property('value');
    d3.selectAll('.graticule').attr('stroke',color);
}
function changeStrokeColor() {
    let color = d3.select('#stroke-color').property('value');
    d3.selectAll('.stroke').attr('stroke',color);
}

function setDefaultColor() {
    
    document.getElementById('land-color').value = landColor;
    document.getElementById('ocean-color').value = oceanColor;
    document.getElementById('graticule-color').value = graticuleColor;
    document.getElementById('stroke-color').value = strokeColor;
    
    changeLandColor();
    changeOceanColor();
    changeGraticuleColor();
    changeStrokeColor();
}

function setDefaultView() {
    
    lon = lat = gamma = 0;
    
    document.getElementById('slider-longitude').value = lon;
    document.getElementById('slider-latitude').value = lat;
    document.getElementById('slider-gamma').value = gamma;
    
    projectionMorph();
    projectionSphere();
}

function dragged() {
    
    lon += d3.event.dx/4.0;
    lat -= d3.event.dy/4.0;
    
    if(lon > 180)
    {
        lon -= 360;
    }
    else if(lon < -180)
    {
        lon += 360;
    }
    
    if(lat > 180)
    {
        lat -= 360;
    }
    else if(lat < -180)
    {
        lat += 360;
    }
    
    document.getElementById('slider-longitude').value = lon;
    document.getElementById('slider-latitude').value = lat;
    projectionMorph();
    projectionSphere();
}

/* ----------主投影---------- */

function projectionMorph() {
    
    // blend的百分比
    var t = d3.select('#slider-blend').property('value')/10000;
    
    // 投影函数
    var projections = [menu1, menu2].map(function(p) {
        return options.filter(function(d) {
        return d.name == p.property('value')
        })[0].projection
    });
    
    mainSVG.selectAll("path")
        .attr("d", getProjection)
    
    function getProjection(d) {
        
        var projection = d3.geoProjection(project)
            .rotate([lon, lat, gamma])
            .fitExtent([[10, 10], [mainSVG_WIDTH - 10, mainSVG_HEIGHT - 10]], {
            type: "Sphere"
            });

        var path = d3.geoPath(projection);
        
        function project(λ, φ) {
            λ *= 180 / Math.PI, 
            φ *= 180 / Math.PI;

            var p0 = projections[0]([λ, φ]), 
            p1 = projections[1]([λ, φ]);
        
            return [
                (1 - t) * p0[0] + t * p1[0], 
                (1 - t) * -p0[1] + t * -p1[1]
                ];
        }
        
        return path(d)
    }

}

/* ----------三维投影---------- */

function projectionSphere() {
    
    sphereSVG.selectAll("path")
        .attr("d", getSphereProjection)
    
    function getSphereProjection(d) {
        
        var projection = d3.geoOrthographic()
            .rotate([lon, lat, gamma])
            .fitExtent([[10, 10], [130, 130]], {
            type: "Sphere"
            });
        
        var path = d3.geoPath(projection);
        
        return path(d)
    }
    
}