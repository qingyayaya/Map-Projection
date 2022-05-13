class Map {

    static options = [
        { name: 'Aitoff', projection: d3.geoAitoff() },
        { name: 'Albers', projection: d3.geoAlbers().parallels([20, 50]) },
        { name: 'August', projection: d3.geoAugust() },
        { name: 'Baker', projection: d3.geoBaker() },
        { name: 'Boggs', projection: d3.geoBoggs() },
        { name: 'Bonne', projection: d3.geoBonne() },
        { name: 'Bottomley', projection: d3.geoBottomley() },
        { name: 'Bromley', projection: d3.geoBromley() },
        { name: 'Collignon', projection: d3.geoCollignon() },
        { name: 'Conic Equal Area', projection: d3.geoConicEqualArea() },
        { name: 'Conic Equidistant', projection: d3.geoConicEquidistant() },
        { name: 'Craster Parabolic', projection: d3.geoCraster() },
        { name: 'Cylindrical Equal Area', projection: d3.geoCylindricalEqualArea() },
        { name: 'Cylindrical Stereographic', projection: d3.geoCylindricalStereographic() },
        { name: 'Eckert I', projection: d3.geoEckert1() },
        { name: 'Eckert II', projection: d3.geoEckert2() },
        { name: 'Eckert III', projection: d3.geoEckert3() },
        { name: 'Eckert IV', projection: d3.geoEckert4() },
        { name: 'Eckert V', projection: d3.geoEckert5() },
        { name: 'Eckert VI', projection: d3.geoEckert6() },
        { name: 'Eisenlohr', projection: d3.geoEisenlohr() },
        { name: 'Equirectangular', projection: d3.geoEquirectangular() },
        { name: 'Fahey', projection: d3.geoFahey() },
        { name: 'Foucaut', projection: d3.geoFoucaut() },
        { name: 'Foucaut Sinusoidal', projection: d3.geoFoucautSinusoidal() },
        { name: 'Gilbert', projection: d3.geoGilbert() },
        { name: 'Ginzburg IV', projection: d3.geoGinzburg4() },
        { name: 'Ginzburg V', projection: d3.geoGinzburg5() },
        { name: 'Ginzburg VI', projection: d3.geoGinzburg6() },
        { name: 'Ginzburg VIII', projection: d3.geoGinzburg8() },
        { name: 'Ginzburg IX', projection: d3.geoGinzburg9() },
        { name: 'Gringorten', projection: d3.geoGringorten() },
        { name: 'Guyou', projection: d3.geoGuyou() },
        { name: 'Hammer', projection: d3.geoHammer() },
        { name: 'Hill', projection: d3.geoHill() },
        { name: 'Homolosine', projection: d3.geoHomolosine() },
        { name: 'Hufnagel', projection: d3.geoHufnagel() },
        { name: 'Hyperelliptical', projection: d3.geoHyperelliptical() },
        { name: 'Kavrayskiy VII', projection: d3.geoKavrayskiy7() },
        { name: 'Lagrange', projection: d3.geoLagrange() },
        { name: 'Larrivée', projection: d3.geoLarrivee() },
        { name: 'Laskowski', projection: d3.geoLaskowski() },
        { name: 'Loximuthal', projection: d3.geoLoximuthal() },
        { name: 'Miller', projection: d3.geoMiller() },
        { name: 'Mollweide', projection: d3.geoMollweide() },
        { name: 'McBryde–Thomas Flat-Polar Parabolic', projection: d3.geoMtFlatPolarParabolic() },
        { name: 'McBryde–Thomas Flat-Polar Quartic', projection: d3.geoMtFlatPolarQuartic() },
        { name: 'McBryde–Thomas Flat-Polar Sinusoidal', projection: d3.geoMtFlatPolarSinusoidal() },
        { name: 'Natural Earth I', projection: d3.geoNaturalEarth1() },
        { name: 'Natural Earth II', projection: d3.geoNaturalEarth2() },
        { name: 'Nell–Hammer', projection: d3.geoNellHammer() },
        { name: 'Nicolosi', projection: d3.geoNicolosi() },
        { name: 'Orthographic', projection: d3.geoOrthographic() },
        { name: 'Patterson', projection: d3.geoPatterson() },
        { name: 'Polyconic', projection: d3.geoPolyconic() },
        { name: 'Rectangular Polyconic', projection: d3.geoRectangularPolyconic() },
        { name: 'Robinson', projection: d3.geoRobinson() },
        { name: 'Satellite', projection: d3.geoSatellite() },
        { name: 'Sinusoidal', projection: d3.geoSinusoidal() },
        { name: 'Sinu-Mollweide', projection: d3.geoSinuMollweide() },
        { name: 'Times', projection: d3.geoTimes() },
        { name: 'van der Grinten', projection: d3.geoVanDerGrinten() },
        { name: 'van der Grinten II', projection: d3.geoVanDerGrinten2() },
        { name: 'van der Grinten III', projection: d3.geoVanDerGrinten3() },
        { name: 'van der Grinten IV', projection: d3.geoVanDerGrinten4() },
        { name: 'Wagner', projection: d3.geoWagner() },
        { name: 'Wagner IV', projection: d3.geoWagner4() },
        { name: 'Wagner VI', projection: d3.geoWagner6() },
        { name: 'Wagner VII', projection: d3.geoWagner7() },
        { name: 'Winkel III', projection: d3.geoWinkel3() }
    ].map(opt => {
        opt.projection.rotate([0, 0]).center([0, 0]);
        return opt;
    });

    static getRandomOption() {
        var idx = Math.floor(Math.random() * Map.options.length);
        return Map.options[idx].name;
    }

    static validateProjection(name) {
        return Map.options.filter(obj => {
            return name == obj.name;
        })[0];
    }

    _landColor = '#dfc57b';
    _oceanColor = '#46a3c4';
    _graticuleColor = '#777777';
    _strokeColor = '#000000';
    jsonURL = './json/world-110m.json';

    constructor(envID, width = 700, height = 350, ...projection) {
        this.envID = envID;
        this.width = width;
        this.height = height;

        // 投影中心
        this.lon = 0;
        this.lat = 0;
        this.gamma = 0;

        // 指定了两种投影的前提下，表示混合度
        this.blend = 0;

        // 在html上生成Map
        this.genernateMap();

        // 
        if (projection.length > 2) {
            console.warn('Not support 3 or large than 3 projections');
            projection.splice(2);
        }
        this.projection = projection;
        this.projection.forEach((proj, idx) => {
            this.setProjection(proj, idx);
        });
    }

    genernateMap() {
        this.env = d3.select(`#${this.envID}`);

        // 给this.env添加右键回调
        this.env.on('contextmenu', () => {
            const contextMenu = () => {
                // 生成右键菜单
                this.createContextMenu(d3.event.pageX - 10, d3.event.pageY - 10);
                // 
                d3.event.preventDefault();
            }

            if (d3.event == null) {
                d3.customEvent(window.event, contextMenu);
            } else {
                contextMenu();
            }
        });

        // 生成SVG
        var svg = this.env.append('svg')
            .attr('width', this.width)
            .attr('height', this.height);

        svg.append('defs')
            .append('path')
            .datum({ type: 'Sphere' })
            .attr('id', `${this.envID}sphere`);

        svg.append('use')
            .attr('class', 'stroke')
            .attr('fill', 'none')
            .attr('stroke-width', '2px')
            .attr('stroke', this._strokeColor)
            .attr('xlink:href', `#${this.envID}sphere`);

        svg.append('use')
            .attr('class', 'ocean')
            .attr('fill', this._oceanColor)
            .attr('xlink:href', `#${this.envID}sphere`);

        svg.append('path')
            .datum(d3.geoGraticule())
            .attr('class', 'graticule')
            .attr('fill', 'none')
            .attr('stroke-width', '.5px')
            .attr('stroke-opacity', '.5')
            .attr('stroke', this._graticuleColor);

        this.getTopoJSON();
        this.svg = svg;
    }

    draggable(tf) {
        const dragged = () => {
            this.lon += d3.event.dx / 4.0;
            this.lat -= d3.event.dy / 4.0;
    
            if (this.lon > 180) {
                this.lon -= 360;
            } else if (this.lon < -180) {
                this.lon += 360;
            }
    
            if (this.lat > 180) {
                this.lat -= 360;
            } else if (this.lat < -180) {
                this.lat += 360;
            }
    
            this.ondrag && this.ondrag(); // 用户设置的回调
            this.refresh();
        }

        if (tf) {
            this.env.call(d3.drag().on('drag', dragged));
        } else {
            this.env.on('.drag', null);
        }
    }

    createContextMenu(x = 0, y = 0) {

        var filename = 'image';

        // 生成右键菜单
        const menu = d3.select('body')
            .append('ul')
            .classed('save-menu', true)
            .style('left', `${x}px`)
            .style('top', `${y}px`)
            .on('mouseleave', () => {
                menu.remove();
            });

        var svgURL = this.ToSVG();

        // 添加选项
        const list = menu.append('li');
        list.append('a')
            .text('Save as SVG')
            .attr('download', `${filename}.svg`)
            .attr('href', svgURL);
        list.append('a')
            .text('Save as PNG')
            .attr('download', `${filename}.png`)
            .attr('id', 'savepng');
        list.append('a')
            .text('Save as JPG')
            .attr('download', `${filename}.jpeg`)
            .attr('id', 'savejpg');

        // svg2image
        var image = new Image();
        image.src = svgURL;
        var canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        var context = canvas.getContext('2d');
        context.fillStyle = '#fff'; // #fff设置保存后的png背景是白色
        context.fillRect(0, 0, 10000, 5000); // 背景尽量设得大一点

        // 等图片加载好之后再执行，否则会输出空白
        image.onload = () => {
            context.drawImage(image, 0, 0);
            d3.select('#savepng').attr('href', canvas.toDataURL('image/png'));
            d3.select('#savejpg').attr('href', canvas.toDataURL('image/jpeg'));
        };
    }

    ToSVG() {
        // get svg source.
        var source = '<?xml version="1.0" standalone="no"?>' + new XMLSerializer().serializeToString(this.svg.node());

        // add name spaces.
        if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
            source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg" ');
        }
        if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
            source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
        }

        // convert svg source to URI data scheme.
        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
    }

    getTopoJSON() {
        d3.json(this.jsonURL, (error, data) => {
            if (error) throw error;
            this.svg.insert('path', `#${this.envID} .graticule`)
                .datum(topojson.feature(data, data.objects.land))
                .attr('class', 'land')
                .attr('fill', this._landColor);
            this.refresh();
        });
    }

    refresh() {

        const getProjection = (d) => {

            const blendFcn = (λ, φ) => {
                λ *= 180 / Math.PI;
                φ *= 180 / Math.PI;
        
                var p0 = this.projection[0]([λ, φ]),
                    p1 = this.projection[1]([λ, φ]);
        
                var t = this.blend;
        
                return [
                    (1 - t) * p0[0] + t * p1[0],
                    (1 - t) * -p0[1] + t * -p1[1]
                ];
            }

            // 单一投影or混合投影
            if (this.projection.length == 1) {
                var projection = this.projection[0];
            } else {
                var projection = d3.geoProjection(blendFcn);
            }
        
            projection.rotate([this.lon, this.lat, this.gamma])
                .fitExtent([[10, 10], [this.width - 10, this.height - 10]], {
                    type: 'Sphere'
                });
        
            var path = d3.geoPath(projection);
        
            return path(d)
        }

        this.svg.selectAll('path').attr('d', getProjection);
    }

    setProjection(name, idx) {
        // 验证name是否有效
        var opt = Map.validateProjection(name);
        // 保险起见
        if (idx != 1 && idx != 2) {
            idx = 1;
        }
        //
        if (opt) {
            this.projection[idx - 1] = opt.projection;
            this.refresh();
        }
    }

    setBlend(value) {
        this.blend = value || 0;
        this.refresh();
    }

    setLongitude(value) {
        this.lon = value || 0;
        this.refresh();
    }

    setLatitude(value) {
        this.lat = value || 0;
        this.refresh();
    }

    setGamma(value) {
        this.gamma = value || 0;
        this.refresh();
    }

    setLandColor(color) {
        d3.selectAll(`#${this.envID} .land`).attr('fill', color || this._landColor);
    }

    setOceanColor(color) {
        d3.selectAll(`#${this.envID} .ocean`).attr('fill', color || this._oceanColor);
    }

    setGraticuleColor(color) {
        d3.selectAll(`#${this.envID} .graticule`).attr('stroke', color || this._graticuleColor);
    }

    setStrokeColor(color) {
        d3.selectAll(`#${this.envID} .stroke`).attr('stroke', color || this._strokeColor);
    }

    setDefaultColor() {
        this.setLandColor();
        this.setOceanColor();
        this.setGraticuleColor();
        this.setStrokeColor();
    }

    setDefaultView() {
        this.lon = 0;
        this.lat = 0;
        this.gamma = 0;
        this.refresh();
    }

}

var bld = new Map('view');
var sph = new Map('sphereView', 140, 140, 'Orthographic');

(function() {

    var map = [bld, sph];

    // 设置拖拽回调
    bld.ondrag = function() {
        d3.select('#slider-longitude').property('value', this.lon);
        d3.select('#slider-latitude').property('value', this.lat);
        sph.lon = this.lon;
        sph.lat = this.lat;
        sph.refresh();
    }
    bld.draggable(true);

    // 随机生成两种投影，并设置给bld
    var menu1 = Map.getRandomOption();
    var menu2 = Map.getRandomOption();
    bld.setProjection(menu1, 1);
    bld.setProjection(menu2, 2);

    // 数据绑定给控件
    d3.selectAll('.menu')
        .selectAll('option')
        .data(Map.options)
        .enter().append('option')
        .text((d) => { return d.name; });
    d3.select('#menu1').property('value', menu1);
    d3.select('#menu2').property('value', menu2);
    d3.select('#land-color').property('value', bld._landColor);
    d3.select('#graticule-color').property('value', bld._graticuleColor);
    d3.select('#ocean-color').property('value', bld._oceanColor);
    d3.select('#stroke-color').property('value', bld._strokeColor);

    var timer = d3.timer(elapsed => {
        d3.select('#slider-blend').property('value', elapsed * 0.04);
        bld.blend = elapsed / 2500;
        bld.refresh();
        if (elapsed > 2500) {
            timer.stop();
        }
    }, 100);

    /* 控件绑定回调 */
    d3.select('#menu1').on('change', function() {
        bld.setProjection(this.value, 1);
    });

    d3.select('#menu2').on('change', function() {
        bld.setProjection(this.value, 2);
    });

    d3.select('#slider-blend').on('input', function() {
        bld.setBlend(this.value / 100);
    });

    d3.select('#slider-longitude').on('input', function() {
        map.forEach(obj => obj.setLongitude(this.value));
    });

    d3.select('#slider-latitude').on('input', function() {
        map.forEach(obj => obj.setLatitude(this.value));
    });

    d3.select('#slider-gamma').on('input', function() {
        map.forEach(obj => obj.setGamma(this.value));
    });

    d3.select('#slider-latitude').on('input', function() {
        map.forEach(obj => obj.setLatitude(this.value));
    });

    d3.select('#land-color').on('input', function() {
        map.forEach(obj => obj.setLandColor(this.value));
    });

    d3.select('#graticule-color').on('input', function() {
        map.forEach(obj => obj.setGraticuleColor(this.value));
    });

    d3.select('#ocean-color').on('input', function() {
        map.forEach(obj => obj.setOceanColor(this.value));
    });

    d3.select('#stroke-color').on('input', function() {
        map.forEach(obj => obj.setStrokeColor(this.value));
    });

    d3.select('#default-view').on('click', function() {
        map.forEach(obj => obj.setDefaultView());
        d3.select('#slider-longitude').property('value', 0);
        d3.select('#slider-latitude').property('value', 0);
        d3.select('#slider-gamma').property('value', 0);
    });
    
    d3.select('#default-color').on('click', function() {
        map.forEach(obj => obj.setDefaultColor());
        d3.select('#land-color').property('value', bld._landColor);
        d3.select('#ocean-color').property('value', bld._oceanColor);
        d3.select('#graticule-color').property('value', bld._graticuleColor);
        d3.select('#stroke-color').property('value', bld._strokeColor);
    });

})();