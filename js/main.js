'use strict';
// import '../scss/main.scss';
import '../dist/main.bundle.css';
//webpack-dev-server --config webpack.config.js --port 1729 --progress --inline

require('bootstrap-loader');

// require('../dist/main.bundle.css')
const Spinner = require('spin.js');
import Common from './common';

class Main extends Common {
    constructor() {
        super(self);
        this.main();
    }

    main(e, base) {
        console.log('main');
        $('body').append(`
        <div class="container">
            <div class="panel panel-primary">
                <div class="panel-heading" id="accordion">
                    <span class="glyphicon glyphicon-comment"></span> Chat
                    <div class="btn-group pull-right">
                        <a type="button" class="btn btn-default btn-xs" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
                            <span class="glyphicon glyphicon-chevron-down"></span>
                        </a>
                    </div>
                </div>
                <div class="panel-collapse collapse" id="collapseOne">
                    <div class="panel-body">
                        <ul class="chat chat-content-list">
                        </ul>
                    </div>
                    <div class="panel-footer">
                        <form id="textual-response-form">
                            <div class="input-group">
                                <input id="text-response" type="text" class="form-control input-sm" placeholder="Type your message here..." />
                            <span class="input-group-btn">
                            <button class="btn btn-warning btn-sm" type="submit" id="send-button">Send</button>
                        </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        `);
        $(document).on('submit', '#textual-response-form', (e) => {
            // prevent default form submission
            e.preventDefault();

            var text = $('#text-response').val();
            console.log('main' + text);
            var messageHTML = this.getUserMessageHTML(text);
            var context = $('.list-group').data('selected-context');

            $('.list-group').data('user-text', text);

            $('.chat-content-list').append(messageHTML);
            this.scrollToBottom('.panel-body');
            //
            $('#text-response').val('');
            // $(".chat-content-list").html(this.getAnalyzingHTML());
            // // get suggestions for the next response
            this.getBotSuggestions(text, context, function (json) {
                    console.log('json: '+ json);
                //     //saveAndDisplayBotSuggestions(json);
                    sendAgentResponse(json);
            });

        });
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

    getUserMessageHTML(message) {
        var prefix = '<li class="left clearfix"><span class="chat-img pull-left">\
                                    <img src="http://placehold.it/50/55C1E7/fff&text=U" alt="User Avatar" class="img-circle" />\
                                    </span>\
                                    <div class="chat-body clearfix">\
                                    <div class="header">\
                                    <strong class="primary-font">Jack Sparrow</strong> <small class="pull-right text-muted">\
                                    <span class="glyphicon glyphicon-time"></span>Now</small>\
                                </div>\
                                <p>';
        var suffix = '</p>\
                               </div>\
                               </li>';

        return prefix + message + suffix;
    }

    scrollToBottom(elem_selector) {
        $(elem_selector).animate({scrollTop: $(elem_selector).prop("scrollHeight")}, 100);
    }

    getAnalyzingHTML() {
        return '<div>Analyzing...<img src="images/Spinner.gif" style="display: block; margin: auto;"></div>'
    }
    getBotSuggestions(message, context, afterFunction) {
        var data = "{\n\t\"confidence_level\": 0.3,\n    \"max_results\": 3,\n    \"message_text\": \" " + message + "\",\n    \"context\": " + JSON.stringify(context) + "}";
        var settings = {
            "async": true,
            "crossDomain": true,
            "crossOrigin": true,
            // "url": "http://192.168.21.40:5000/message",
            "url": "http://127.0.0.1:3200/message?text="+message,
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "Cache-Control": "",
                "X-Requested-With": ""
            },
            "processData": false,
            "data": data
        }

        $.ajax(settings).done(afterFunction);
        // $.ajax(settings).done(function(e){
        //   console.log('return: '+e);
        // });
    }
    sendAgentResponse(response) {
        // send the response in the chat panel
        $('.chat-content-list').append(this.getAgentResponseHTML(response));
        this.scrollToBottom('.panel-body');

        // clear suggestion panel
        // clearPanel(".suggestions-panel-body .list-group");

        // simulateChat('Jack');
    }
    getAgentResponseHTML(message) {
        var prefix = '<li class="right clearfix"><span class="chat-img pull-right">\
        <img src="http://placehold.it/50/FA6F57/fff&text=ME" alt="User Avatar" class="img-circle" />\
            </span>\
            <div class="chat-body clearfix">\
            <div class="header">\
            <small class=" text-muted"><span class="glyphicon glyphicon-time"></span>Now</small>\
        <strong class="pull-right primary-font">Bhaumik Patel</strong>\
        </div>\
        <p>';
        var suffix = '</p>\
        </div>\
        </li>\
        ';

        return prefix + message + suffix
    }
}
export default Main;

(()=> {
    // $(document).foundation();
    new Main();
})();