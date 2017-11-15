'use strict';
import '../scss/main.scss';
// import 'bootstrap/dist/css/boostrap.min.css';
//import '../dist/css/bootstrap.min.css';
// require('bootstrap');
// require('bootstrap/dist/css/bootstrap.css');
// require('font-awesome/css/font-awesome.css')
// require('../scss/main.scss');
// import jQuery from 'jquery';
// import 'bootstrap';

//$icon-font-path: "~bootstrap-sass/assets/fonts/bootstrap/";
//@import "bootstrap-sass/assets/stylesheets/_bootstrap.scss";
require('bootstrap-loader');

require('../dist/main.bundle.css')
const Spinner = require('spin.js');
import Common from './common';

class Main extends Common{
    constructor() {
        super(self);
        this.main();
    }

    main(e, base) {
        console.log('main');
        // var td = $('table tr td');
        // td.each(function(elem){
        //     var bodyColor = $(this).css("backgroundColor");
        //     var color = $(this).css("color");
        //     if(color == bodyColor){
        //         $(this).remove();
        //     }
        // });
        // var value = $('table tr td').text();
        // console.log(value);
        //
        //
        // let rows = document.getElementsByTagName("table")[0].rows;
        // var last = rows[rows.length - 1];
        // var cell = last.cells[0];
        // var value = cell.innerHTML;
        // console.log(last);
        //
        //
        // // valid form - ajax post new item form
        // $('#item_form').on('submit', (ev) => {
        //     ev.preventDefault();
        // });
        // $(document).on("formvalid.zf.abide.item_form", function(ev,frm) {
        //     ev.preventDefault();
        //     var $form = $("#item_form");
        //     let data = $form.serialize();
        //     console.log(data);
        //     var _this = this;
        //     console.log("Form id  is valid");
        //     console.log(data);
        //     $.ajax({
        //         type: "POST",
        //         url: location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '')+ '/~oshry/test/' + $form.attr("action"),
        //         data: data,
        //         success: function(data){
        //             $(".message").show();
        //             $(".message").html('Saved Successfully');
        //         },
        //         error: function (xhr, status, error) {
        //             $(".message").show();
        //             $(".message").html('');
        //             $(".message").append(_this.print_r(JSON.parse(xhr.responseText)));
        //         }
        //     });
        // });
    }

}
export default Main;

(()=> {
    // $(document).foundation();
    new Main();
})();