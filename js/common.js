/**
 * Created by oshry on 08/08/2016.
 */
'use strict';
import 'script-loader!jquery';
import 'what-input';
import 'foundation-sites';

import '../scss/_basic.scss';
import '../scss/_settings.scss';


module.exports = class Common{
    constructor() {
        let _this = self;
        this.base = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
        this.init(_this, this.base);
    }
    init(){
    }
}

