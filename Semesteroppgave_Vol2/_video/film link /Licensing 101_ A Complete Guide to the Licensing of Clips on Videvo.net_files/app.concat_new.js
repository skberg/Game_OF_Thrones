// ::::::::::::::: /wp-content/themes/ViDEVO/js/liviu.js

$(".video-thumb-inner").click(function(){
    var link = $(this).find("a").attr("href"); 
    if (link == "#next")
        return;
    window.location = $(this).find("a").attr("href"); 
    return false;
})

function stopMediaRequest() {

        for (var i = 0; i < 5; i++) {
            if(window.stop !== undefined) {
                 window.stop();
            }
            else if(document.execCommand !== undefined) {
                 document.execCommand("Pause", false);
            }
        }

}

$(document).ready(function(){

    if (window.location.href.indexOf('new_style=1') != -1) {

        $(document).on("mouseenter", "#shutterstock-results .video-responsive-sponsored", function() {
            //get video path
            //
            var videoPathWebm = $( this ).find('img.preview').attr('src').replace(".jpg", ".webm");
            var videoPathmp4 = $( this ).find('img.preview').attr('src').replace(".jpg", ".mp4");

            //if video exists, just play
            if ($( this ).find('video').length) {
                //play it!
                $( this ).find('video').show().get(0).play();
            } else {//else we load and play the clip
                //console.log('doesnt exists');
                //set video path along with the hardcoded markup
                //to do
                //to replace the hardcoded videvo path with the dinamic one once we release the product
                $( this ).find('.video-thumb-inner a').append('<video ref="video" class="" preload="auto" loop muted="muted"><source src="'+videoPathWebm+'" type="video/webm"><source src="'+videoPathmp4+'" type="video/mp4">Your browser does not support the html video player.</video>');

                //play it!
                $( this ).find('video').show().get(0).play();
                $(this).find('video')[0].ontimeupdate = function() {
                    var percentage = ( $(this)[0].currentTime / $(this)[0].duration ) * 100;
                    console.log(percentage);
                    $(this).closest(".video-responsive-sponsored").find('.progress_bar_seek').css("width", percentage+"%");
                }
            }
        }).on("mouseleave", "#shutterstock-results .video-responsive-sponsored", function() {
            //stop the clip
            stopMediaRequest();
            $( this ).find('video').remove();
            // $( this ).find('video').hide().get(0).pause();
            // $( this ).find('video').hide().get(0).currentTime = 0;
        });

        $(document).on("mouseenter", "#list-videos .video-responsive", function() {

            var args = JSON.parse(window.videvoParameters);

            //get video path
            var videoPathWebm = $( this ).find('img.preview').attr('data-video-preview');
            if (args.clip_type == 'Music' || args.clip_type == 'Sound Effects')
                videoPathWebm = $( this ).find('img.preview').attr('data-video-source');
            //hotfix till the proper system is in place. we remove the last 4 characters and replace the preview to videos
            var videoPathmp4 = videoPathWebm.replace("preview", "videos").slice(0, -4)+'mp4';


            //if video exists, just play
            if ($( this ).find('video').length) {
                //play it!
                $( this ).find('video').show().get(0).play();
            } else {//else we load and play the clip
                //console.log('doesnt exists');
                //set video path along with the hardcoded markup
                //to do
                //to replace the hardcoded videvo path with the dinamic one once we release the product
                //$( this ).find('.video-thumb-inner').append('<video preload="auto" controls="controls" loop muted="muted"><source src="'+videoPathWebm+'" type="video/webm"><source src="'+videoPathmp4+'" type="video/mp4">Your browser does not support the html video player.</video>');
                if (args.clip_type == 'Music' || args.clip_type == 'Sound Effects') {
                    $( this ).find('.video-thumb-inner').append('<video ref="video" class="" preload="auto" loop><source src="'+(videoPathWebm.startsWith("http") ? '' : 'https://www.videvo.net/')+videoPathWebm+'" type="audio/mp3">Your browser does not support the html video player.</video><div class="custom-seekbar-container"><div></div></div>');
                    $(this).find('video')[0].ontimeupdate = function() {
                        var percentage = ( $(this)[0].currentTime / $(this)[0].duration ) * 100;
                        $(this).parent().find('.custom-seekbar-container').find('div').css("width", percentage+"%");
                    }
                    var vid = $(this).find('video')[0];
                    $(this).find(".custom-seekbar-container").on("click", function(e){
                        /* TO DO LAST TWEAK FOR HOMEPAGE */
                        var offset = $(this).offset();
                        var left = (e.pageX - offset.left);
                        var totalWidth = $(this).width();
                        var percentage = ( left / totalWidth );
                        var vidTime = vid.duration * percentage;
                        vid.currentTime = vidTime;
                        vid.play();
                    });
                }
                else {
                    $( this ).find('.video-thumb-inner a').append('<video ref="video" class="" preload="auto" loop muted="muted"><source src="'+(videoPathWebm.startsWith("http") ? '' : 'https://www.videvo.net/')+videoPathWebm+'" type="video/webm"><source src="'+(videoPathmp4.startsWith("http") ? '' : 'https://www.videvo.net/')+videoPathmp4+'" type="video/mp4">Your browser does not support the html video player.</video>');
                    $(this).find('video')[0].ontimeupdate = function() {
                        var percentage = ( $(this)[0].currentTime / $(this)[0].duration ) * 100;
                        $(this).closest(".video-responsive").find('.progress_bar_seek').css("width", percentage+"%");
                    }
                }

                //play it!
                $( this ).find('video').show().get(0).play();
            }
        }).on("mouseleave", "#list-videos .video-responsive", function() {
            //stop the clip
            stopMediaRequest();
            $( this ).find('video').not(".ref-video").remove();
            $( this ).find('video.ref-video').show().get(0).pause();
            // $( this ).find('video').hide().get(0).pause();
            // $( this ).find('video').hide().get(0).currentTime = 0;
        });

    }

    if(typeof window.videoResponsive == "undefined") {

        window.videoResponsive = new VideoResponsive();

    } else {

        window.videoResponsive.resize();

    }

    // $('[name="password"], [name="password_confirm"]').attr("placeholder", "");

    var registerWaitingInterval = false;

    // $('.loader').addClass('active');

    $(document).on('click', '#simplr-form .simplr-field .submit', function(e) {

        e.preventDefault();

        // return;





        $this = $(this);

        $errors = $('.error-message');

        if($this.hasClass('disabled')) return ;



        $('.input-error').removeClass('input-error');

        $errors.slideUp();

        $errors.html('');



        $('.loader').addClass('active');

        $this.addClass('disabled');

        $this.val('Processing...');



        setTimeout(function(){

            $('.loader').removeClass('active');

            $this.removeClass('disabled');

            $this.val('Join For Free');

        },2000)



        clearInterval(registerWaitingInterval);



        registerWaitingInterval = setInterval(function() {

            $('.waiting-registration').slideDown();

            clearInterval(registerWaitingInterval);

        }, 10000);

        $.post(location.href, $('#simplr-reg').serialize() + '&ejump_reg=1&ajax=1')

                .done(function (data) {

                    clearInterval(registerWaitingInterval);

                    try {

                        window.json = $.parseJSON(data);

                    } catch(error) {

                        // location.reload();

                        newUrl = window.location.origin + '?checkemail=true';

                        location.href = newUrl;

                        return;

                    }



                    if(typeof json.errors == "string") {



                        $errors.html('<p>' + json.errors + '</p>');

                    } else if (typeof json.errors == "object") {

                        var error = '';

                        var cont = true;

                        for (var i = 0; i <= 2 && cont; i++) {



                            if(typeof json.errors[i] == "string") {

                                error += '<p>' + json.errors[i] + '</p>';

                            } else if(typeof json.errors[i] == "undefined") {

                                cont = false;

                            }

                        }

                        $errors.html(error);

                        $errors.slideDown();

                        grecaptcha.reset();

                        if(typeof json.errors.fields == "object") {

                            for (var j = json.errors.fields.length - 1; j >= 0; j--) {

                                $('input[name="' + json.errors.fields[j] + '"]').addClass('input-error').focus();

                            }

                        }

                    }

                    if(typeof json.redirect != "undefined") {

                        location.href = json.redirect;

                    }

                    if(typeof json.success != "undefined") {

                        //DOM changes

                        $('#menu-headertoprightmenu2').html('<li id="menu-item-393" class="join menu-item menu-item-type-custom menu-item-object-custom menu-item-393"><a href="https://videvo.net/upload-video/"><i class="fa fa-upload"> </i> Upload</a></li><li id="menu-item-394" class="login menu-item menu-item-type-custom menu-item-object-custom menu-item-394"><a href="https://videvo.net/your-profile"><i class="fa fa-user"></i> My Account</a></li> <li id="menu-item-394" class="login menu-item menu-item-type-custom menu-item-object-custom menu-item-394"><a href="https://videvo.net/logout/"><i class="fa fa-sign-out"></i> Logout</a></li><a href="https://videvo.net/logout/?_wpnonce=9894cacbb3"></a>');

                        $('#ModalRegister .modal-body').slideUp();



                        setTimeout(function() {



                            $('#ModalRegister .modal-body div').remove();

                            $('#ModalRegister .modal-body p').html(json.success.description);

                            $('#ModalRegister .modal-body h2').html(json.success.title);

                            $('#ModalRegister').addClass('thanks');

                            $('#ModalRegister .modal-body').slideDown();



                        }, 300);

                        window.showedPopup = 1; // this is magic :)

                    } else {



                    }

                        $('.loader').removeClass('active');

                        $this.removeClass('disabled');

                        $this.val('join for free');

                        $('.waiting-registration').slideUp();

                });

    });



    window.video = document.getElementById('featuredMovie');

    if(typeof video != "undefined" && video != null) {



        var hideVideoLayer = setInterval(function () {

            if(!video.paused) {

                $('#videoLayer').remove();

                clearInterval(hideVideoLayer);

            }

        },500)

    }

});



jQuery(document).ready(function($){

    function getSearchParameters() {

      var prmstr = window.location.search.substr(1);

      return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};

    }



    function transformToAssocArray( prmstr ) {

        var params = {};

        var prmarr = prmstr.split("&");

        for ( var i = 0; i < prmarr.length; i++) {

            var tmparr = prmarr[i].split("=");

            params[tmparr[0]] = tmparr[1];

        }

        return params;

    }



    var params = getSearchParameters();

    if (params.checkemail) {

        // console.log(params.checkemail);

        // console.log("!@#!@#!@#!@#");

        // message  = '<div id="mod-message" class="success checkemail" style="z-index: 100; display: none; position: absolute; top: 0; left: 0; right: 0; height: 50px; line-height: 50px; text-align: center; font-weight: 600;"><div class="message">Check your email to validate the account!</div></div>';

        // message = '<div id="mod-message" class="failure check_email_message"> <div class="message"> <div class="message">Check your email to validate the account! <div class="close">X<div></div> </div> </div> </div> </div>';

        message = '<div id="mod-message" class="failure check_email_message"> <div class="message"> <div class="message">Check your email to activate your account <div class="close">X<div></div> </div> </div> </div> </div>';

        // message += '<div id="mod-message-fog" style="z-index: 50; display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8)"></div>';

        $('body').prepend(message);

        setTimeout(function(){



            $('#mod-message.check_email_message').slideDown(500);

            // // $('#mod-message-fog').fadeIn(300);

            // setTimeout(function(){

            //     $('#mod-message.checkemail').slideUp(500);

            //     // $('#mod-message-fog').fadeOut(600);

            //     setTimeout(function(){

            //         $('#mod-message.checkemail').remove();

            //     }, 1000)

            // }, 7000)



        }, 50)

        $(document)

        .on('click', '#mod-message .close', function(){

            $('#mod-message').attr('style', '');

            $('#mod-message').slideUp(500);

            setTimeout(function(){

                $('#mod-message').remove();

            }, 700);

        })

    }

})



/**

 * GA tracking events

 * @author  Liviu M.@ejump

 */

function gaTrack(cmd, type, e) {



    var exec_ga = eval(cmd);



    switch (type) {

        case 'download':

            e.preventDefault();

            window.open( $(e.target).parents('a').attr('href') );

        break;



        case 'share-fb':

        break;



        case 'share-tw':

            e.preventDefault();

            window.open( $(e.target).parents('a').attr('href'), 'Twitter Share', 'width=600, height=600' );

        break;



        case 'share-google':

            e.preventDefault();

            window.open( $(e.target).attr('href'), 'Google Share', 'width=600, height=600' );

        break;



        case 'registration':

        break;

    }

}

+(function($){

    $(document)

    .ready(function(){

        if ( $('#modal-register').length > 0 ) {

            $('#modal-register [name="submit-reg"]').attr('onclick',

                "gaTrack(\"ga('send', 'event', { eventCategory: 'Registration', eventAction: 'Clicked', eventLabel: 'Join'})\", \"registration\", event)"

            );

        }

    })

    .on('click', '[data-ga-event]', function(e){

        // e.preventDefault();

        // console.log($(this).data('ga-event'));



        // var exec_ga = eval($(this).data('ga-event'));

        // console.log(exec_ga);



        // if ( $(this).data('ga-event-type') == 'share-fb' ) {

        //     postToFeed();

        // }



        // window.open($(this).attr('href'));



        // setTimeout(function(){

        //     console.log('xo');

        // },6000);



        // console.log( checkvalid );

        // return checkvalid();

    })

})(jQuery);





// Shutterstock gaTrack

+(function($){

    $(window)

    .load(function(){

        var fuel = true;
/*
        var loop = false;

        console.log('&^&^$^');



        loop = setInterval(function(){

            // console.log('searching Shutterstock content...');

            // console.log($('#shutterstock-results .shut-results .columns a, #shut-results a').length);

            if ( $('#shutterstock-results .shut-results .columns a, #shut-results a').length > 0 ) {

                clearInterval(loop);

                $('#shutterstock-results .shut-results .columns, #shut-results').each(function(){

                    $(this).find('a').addClass('shutterstock-ga-track');

                });

            }

        }, 10);

*/

        // setTimeout(function(){

        //     $('#shutterstock-results .shut-results .columns, #shut-results').each(function(){

        //         $(this).find('a').addClass('shutterstock-ga-track');

        //     });

        // }, 2000);

    })

    $(document)

    .on('click', '#shutterstock-results .shut-results .columns a.shutterstock-ga-track, #shut-results a.shutterstock-ga-track', function(e){

        // console.log('###TEST###');

        // e.preventDefault();

        var label = decodeURIComponent($(this).attr('href'));

        if ( $(this).find('.preview').length == 0 ) {

            label = label.split('www.shutterstock.com');

            label = label[1];

        } else {

            label = $(this).find('.preview').data('description');

        }

        ga('send', 'event', { eventCategory: 'Shutterstock', eventAction: 'Clicked', eventLabel: 'Shutterstock: '+label});

        // window.open( $(this).attr('href') );

    });

    // function params_unserialize(p){

    //     var ret = {},

    //         seg = p.replace(/^\?/,'').split('&'),

    //         len = seg.length, i = 0, s;

    //     for (;i<len;i++) {

    //         if (!seg[i]) { continue; }

    //         s = seg[i].split('=');

    //         ret[s[0]] = s[1];

    //     }

    //     return ret;

    // }

})(jQuery);





// ::::::::::::::: /wp-content/themes/ViDEVO/js/jquery.passstrength.min.js

(function(h){h.fn.passStrengthify=function(a){var q=h(this),m,r=[[0,8,16,32,48,64,72],[0,16,32,48,64,78,92],[0,32,64,78,92,108,128]],s=["Very weak","Very weak","Weak","Weak","Moderate","Good","Strong","Very strong"],n=["gray","red","red","#C00000","orange","#0099FF","blue","green"],i=r[0],u=h("<span>").css("margin-left","1em"),t=[],e=0,v=0,w=false,B=function(b){var c=0,d={"[a-z]":26,"[A-Z]":26,"(\\d[^\\d])|(^\\d+$)":10,"[\\W_]":32};b=b.replace(/(.)(\1)(\1)+/gi,"$1$2");b=b.replace(/(a)(b(c(d(e(f(g(h(i(j(k(l(m(n(o(p(q(r(u(v(w(x(y(z)?)?)?)?)?)?)?)?)?)?)?)?)?)?)?)?)?)?)?)?)?)?)?/gi,

"$1");b=b.replace(/(0)(1(2(3(4(5(6(7(8(9)?)?)?)?)?)?)?)?)?/g,"$1");b=b.replace(/(1)(2(3(4(5(6(7(8(9(0)?)?)?)?)?)?)?)?)?/g,"$1");b=b.replace(/([^\d])(\d)(\d)+$/,"$1$2");if(!b.length)return 0;for(var j in d)if(b.search(RegExp(j))!=-1)c+=d[j];if(!c)return 0;for(j=d=0;j<b.length;j++){var f;var k=b,o=j;f=c;var l=k.charAt(o),y=[0.08064249900208098,0.015373768624831691,0.026892340312538593,0.04328667139002636,0.1288623426065769,0.0244847137116921,0.019625534749730816,0.06098726796371807,0.06905550211598431,

0.0011176940633901926,0.006252182367878119,0.04101676132771116,0.02500971934780021,0.06984975410235668,0.07378315126621263,0.017031440203182008,0.0010648594165322703,0.06156572691936394,0.063817324270356,0.09024664994930598,0.0278568510204016,0.010257964235274787,0.021192261444145363,0.0016941732664605912,0.01806326249861108,9.695838238376564E-4],z=[0.11617102232902775,0.04708120556723741,0.035155702413137084,0.02673475518173626,0.020026033843997197,0.0378391909482327,0.01952538299789727,0.07241413837989387,

0.06294182437168319,0.006318213677781116,0.006908981676179033,0.027085210774006212,0.04379693601682187,0.02368078502052669,0.06272153799939922,0.025483128066486435,4.305597276459397E-4,0.016551516972063685,0.07765094623009913,0.16692700510663863,0.014889356163011918,0.006198057474717133,0.06669670571743266,5.0065084609993E-5,0.01622108741363773,5.0065084609993E-4],A=[2.835E-4,0.0228302,0.0369041,0.042629,0.0012216,0.0075739,0.0171385,0.0014659,0.0372661,2.353E-4,0.0110124,0.0778259,0.0260757,0.2145354,

5.459E-4,0.0195213,1.749E-4,0.110477,0.093429,0.131796,0.0098029,0.0306574,0.0088799,9.562E-4,0.0233701,0.0018701,0.0580027,0.0058699,7.91E-5,0.0022625,0.3416714,2.057E-4,4.272E-4,3.639E-4,0.0479084,0.0076894,0,0.115056,0.0012816,3.481E-4,0.0966553,1.58E-5,0,0.0740301,0.0226884,0.010743,0.1196127,0.001155,3.16E-5,0,0.0864502,0,0.1229841,2.71E-5,0.0215451,5.246E-4,0.1715916,9.0E-6,0,0.1701716,0.056549,0,0.0453966,0.0488879,0,3.62E-5,0.1759242,9.0E-6,0.0017185,0.0376812,0.0010492,0.0906756,0.0358361,

0,0,0,0.0041969,9.0E-6,0.0280345,5.057E-4,2.585E-4,0.0081086,0.1224833,6.799E-4,0.0054844,7.08E-4,0.0794902,3.484E-4,1.911E-4,0.0092662,0.0021466,0.0030456,0.0397283,1.63E-4,2.25E-5,0.0178918,0.0307037,9.159E-4,0.0178805,0.0027759,0.0013655,0,0.0076478,0,0.0545873,0.0012798,0.0224322,0.0843434,0.0317097,0.008564,0.0052834,0.0017762,0.0127186,2.605E-4,0.0010967,0.0339975,0.0186268,0.0815271,0.0032334,0.0101307,0.0021424,0.1307517,0.0712793,0.0241537,0.0014289,0.0157312,0.0070879,0.0105139,0.0125997,

1.831E-4,0.0638579,2.384E-4,3.179E-4,2.086E-4,0.0928264,0.0500293,1.99E-5,9.93E-5,0.0820576,0,1.99E-5,0.0266638,3.97E-5,8.94E-5,0.1545186,1.689E-4,9.9E-6,0.0825344,0.0039539,0.034194,0.0334986,9.9E-6,1.987E-4,0,0.00152,0,0.0592435,3.842E-4,5.205E-4,0.0020078,0.1482326,2.727E-4,0.0101631,0.1420108,0.0501091,2.48E-5,3.72E-5,0.0395122,0.002987,0.0127906,0.0573224,5.577E-4,0,0.0884686,0.0261142,0.0062466,0.0256309,3.72E-5,3.47E-4,0,0.003272,1.363E-4,0.1580232,7.737E-4,0.002046,5.185E-4,0.4597035,4.627E-4,

3.59E-5,7.18E-5,0.1252667,0,4.0E-6,0.0014278,0.0013042,0.0012922,0.0700557,4.39E-5,3.191E-4,0.0117178,0.0022056,0.0297253,0.0131497,0,0.001029,0,0.0072309,0,0.0166996,0.0069144,0.0486793,0.0363474,0.0480664,0.0271435,0.0307856,7.75E-5,4.826E-4,3.5E-6,0.0073125,0.0526842,0.0412929,0.2618995,0.0497818,0.0062698,4.333E-4,0.043762,0.1157982,0.1198384,7.01E-4,0.0235788,2.11E-5,0.001881,0,0.0032265,0.2106638,0,0,0,0.190642,0,0,0,4.353E-4,0,0,0,0,0,0.2644178,0,0,0,0,0,0.3299238,0,0,0,2.176E-4,0,0.0169234,

0.0011671,5.058E-4,0.0017118,0.3321662,0.0041628,4.669E-4,7.781E-4,0.1300965,0,3.112E-4,0.0185963,9.726E-4,0.100957,0.0113601,0.001206,0,4.279E-4,0.0613523,0.0022954,0.0029956,0,0.0041239,0,0.0086757,0,0.10168,5.515E-4,0.0020459,0.0668636,0.1657445,0.0134024,0.0011801,1.542E-4,0.1107889,1.19E-5,0.0053728,0.135518,0.0055389,9.726E-4,0.0826499,0.0022654,5.9E-6,0.0018443,0.0230153,0.0180635,0.0144461,0.004163,0.0025797,0,0.0968765,2.37E-5,0.1539307,0.0285939,1.653E-4,0.0025384,0.2496134,0.0017798,1.95E-5,

3.015E-4,0.0877464,1.95E-5,0,0.0015756,0.0221846,0.0029567,0.1098532,0.0485124,0,0.016991,0.0249954,8.461E-4,0.0385435,2.92E-5,1.167E-4,0,0.0505257,0,0.0240107,5.432E-4,0.0423173,0.1767352,0.0849166,0.0053036,0.1188694,0.0028799,0.0295789,0.0012223,0.0071353,0.0087755,6.582E-4,0.0085073,0.0653564,3.343E-4,9.716E-4,4.144E-4,0.0427003,0.0956004,0.0093814,0.00335,8.497E-4,3.343E-4,0.012115,1.288E-4,0.0083175,0.0072923,0.0127087,0.0203076,0.0029439,0.1135873,0.0060659,0.0018527,0.0087857,1.978E-4,0.0106912,

0.0268647,0.0580447,0.1459838,0.0330625,0.0138659,2.308E-4,0.1175433,0.032268,0.0492657,0.1337201,0.0164801,0.0488371,5.374E-4,0.0033923,8.571E-4,0.1284508,4.427E-4,4.427E-4,4.713E-4,0.2213542,1.428E-4,8.57E-5,0.0221226,0.0538854,2.86E-5,1.143E-4,0.0957597,0.0010854,5.856E-4,0.1212242,0.0607692,0,0.1362487,0.0222939,0.0408603,0.0270926,0,0.0011711,0,0.0042274,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2.284E-4,2.284E-4,0,0.9949749,0,0,0,0,0,0.0733524,0.0032081,0.0116789,0.028407,0.234553,0.0056616,0.0107385,

0.0026432,0.0792432,4.35E-5,0.0087196,0.0117263,0.0192448,0.0221961,0.0919374,0.0048043,3.16E-5,0.0189406,0.0459213,0.0421561,0.0173721,0.0070603,0.0019873,4.0E-6,0.0284504,0.0055945,0.0349781,6.441E-4,0.0157796,0.0015208,0.1179849,0.0010558,4.688E-4,0.0569819,0.0506053,4.95E-5,0.005378,0.0114497,0.006552,0.0022488,0.0491264,0.0287844,8.309E-4,1.906E-4,0.0463897,0.1269191,0.0330152,8.0E-5,0.0053856,0,0.0020925,0,0.0393295,1.59E-4,0.0037195,6.74E-5,0.0892434,9.218E-4,4.04E-5,0.3352928,0.0666758,5.4E-6,

1.62E-5,0.0146273,9.11E-4,0.0011051,0.0913053,8.09E-5,2.7E-6,0.0310281,0.0245378,0.0171177,0.0185732,2.7E-6,0.0078702,0,0.0121422,2.776E-4,0.0261517,0.0181796,0.0459729,0.0223272,0.0308931,0.0058765,0.0505571,6.99E-5,0.0298191,8.7E-6,1.572E-4,0.1066327,0.0308669,0.1156002,0.002017,0.0448465,1.746E-4,0.1626908,0.1207345,0.1249869,3.49E-5,9.343E-4,2.008E-4,8.819E-4,2.969E-4,0.0010042,0.1022242,0,0,0.0049559,0.6796927,0,0,2.371E-4,0.1467561,0,0,1.423E-4,0,0.0128284,0.0429195,0,0,8.299E-4,3.083E-4,0,

0.0025847,5.928E-4,0,0,0.0038888,0,0.1832539,3.329E-4,2.984E-4,0.0018938,0.1605624,0.0013085,3.44E-5,0.1893372,0.1788924,0,5.05E-4,0.0089412,2.755E-4,0.0372798,0.0933831,8.03E-5,1.15E-5,0.0082066,0.0126485,0.0018135,0.0011707,0,3.214E-4,0,6.887E-4,0,0.0600144,0,0.1573582,0.001005,0.05542,0,1.436E-4,0.0132089,0.1122757,0,0,0.0014358,1.436E-4,0,0.0055994,0.2157933,0.0031587,0,0.0027279,0.2360373,0.0195262,0.0051687,1.436E-4,0.0093324,0.0020101,0,0.0072178,0.0039321,0.0011985,0.0020738,0.0562745,0.0015217,

3.097E-4,7.137E-4,0.0141393,1.35E-5,2.69E-5,0.0031914,0.0039051,0.0022488,0.1205478,0.0027875,0,0.0048882,0.0324935,0.0109613,5.925E-4,6.73E-5,0.0016025,1.347E-4,9.43E-5,2.02E-4,0.4219769,7.526E-4,0.0060211,0.0067737,0.3038133,0,0,5.018E-4,0.0709985,2.509E-4,0,0.0198194,0,0,0.0730055,0,0,2.509E-4,0.0017561,5.018E-4,0.0037632,0.0010035,0,0,0.0100351,0.026844],p={"1":"l","3":"e","4":"a","5":"s","7":"t","@":"a",$:"s"};if(typeof p[l]!="undefined")l=p[l];if(l.match(/^[a-zA-Z]$/)){l=l.toLowerCase().charCodeAt(0)-

"a".charCodeAt(0);var g=void 0;g=null;if(o){g=k.charAt(o-1);if(typeof p[g]!="undefined")g=p[g]}if(g!=null&&g.match(/^[a-zA-Z]$/)){k=void 0;k=g.toLowerCase().charCodeAt(0)-"a".charCodeAt(0);g=A[l+26*k]}else g=(o?y:z)[l];if(f>=26)g*=26/f;f=g}else f=1/f;d+=Math.max(-7,Math.log(f)/0.6931471805599453)}return-1*d},C=function(b){var c=0,d=0;d=B(b);if(i.length&&i[0]instanceof RegExp)jQuery.each(i,function(j,f){c+=b.search(f)!=-1});else for(e=0;e<i.length;e++){if(d<i[e])break;c=e+1}return[d,c]},x=function(){var b=

h(this).val(),c=!b.length||b.length<v,d;b=C(b);d=b[0];b=c?0:b[1];var j=t.length,f,k;k=c?a.labels.tooShort:w?Math.round(d*100)/100+" bits":s[b];f=n[b];c=n[b];d=n[0];u.text(k).css("color",f);for(e=0;e<j;e++)t[e].css("background-color",e<b?c:d)};if(typeof a=="undefined")a={};if(typeof a.labels==="undefined")a.labels={};a.labels=h.extend({tooShort:"Too short",passwordStrength:"Password strength:"},a.labels);m=h("<span>").css("display","inline-block").addClass("passStrengthify");return h(this).each(function(){a.element?

a.element.append(m):h(this).parent().append(m);if(a.minimum)v=a.minimum;if(typeof a.security=="undefined")a.security=1;if(a.security>=0&&a.security<r.length)i=r[a.security];if(!a.levels)a.levels=s;if(!a.colours)a.colours=n;if(!a.tests)a.tests=i;if(a.levels&&a.colours&&a.tests)if(a.levels.length==a.colours.length&&a.colours.length==a.tests.length+1){s=a.levels;n=a.colours;i=a.tests}if(a.rawEntropy)w=true;m.append(h("<div>").append(h("<span>").css("font-size","smaller").text(a.labels.passwordStrength).append(u)));

var b=Math.round((125-3*i.length)/i.length);for(e=0;e<i.length;e++){var c=h("<span>").addClass("segment");t.push(c);m.append(c)}q.keypress(x);q.keyup(x);q.trigger("keyup")})}})(jQuery);



// ::::::::::::::: /wp-content/themes/ViDEVO/js/upload_progress.js

$.fn.uploadProgress = function(options){

    $(this).each(function(){

        var form=$(this)

        var action=form.attr('action') || window.location.href



        var setDownloadedContents = function(contents){

            if (contents.responseText)

                contents=contents.responseText

            if (!opts.onBeforeComplete(contents))

                return;

            try{ // option 1, try to replace contents

                $('body').html($('<body>').html(contents))

                // Now set the new URL with tricks.. FIXME

            }

            catch(e){ // option 2, reload page with GET. Sorry, two full renderings lost.

                action=action.split('#')[0]

                window.location_=action

            }

        }





        var opts

        opts = jQuery.extend({

            onProgress:function(p){}, // function to be called with ammount of progress done, from 0 to 1.

            onBeforeSend:function(){},

            onBeforeComplete:function(){ return true; }, // returns whether to replace/reload content or not

            onComplete:setDownloadedContents,

            onError:setDownloadedContents,

            onStart:function(){}

        },options)

        opts.form=form



        form.submit(function(ev){

            if (ev.isDefaultPrevented())

                return false

            if (opts.form.find('[type=file]').filter(function(){ return $(this).val()!='' }).length==0)

                return true // go on normally, no files to upload.

            opts.onStart()

            var formData = new FormData(form[0]);

            $.ajax({

                url: action,

                type: 'POST',

                xhr: function() {  // custom xhr

                    myXhr = $.ajaxSettings.xhr();

                    if(myXhr.upload){ // check if upload property exists

                        myXhr.upload.addEventListener('progress',function(ev){



                            opts.onProgress(Math.round(ev.loaded * 10000.0 / ev.total)/100.0, ev)

                        }, false); // for handling the progress of the upload

                    }

                    return myXhr;

                },

                //Ajax events

                beforeSend: opts.onBeforeSend,

                success: opts.onComplete,

                error: opts.onError,

                // Form data

                data: formData,

                //Options to tell JQuery not to process data or worry about content-type

                cache: false,

                contentType: false,

                processData: false

            })

            ev.preventDefault()

        })

    })

}



// ::::::::::::::: /wp-content/themes/ViDEVO/assets/js/app.js

/*********** Loader *************/



    var Loader = function (data) {

        if(!data) data = {};



        this.parent = data.parent ? data.parent : 'main';

        this.responsive = data.responsive ? true : false;

        this.fullWidth  = typeof data.fullWidth != "undefined" ? data.fullWidth : true;

        this.speed  = 500;

        this.delayDestroy = 0;



        if($(this.parent).children('.video-loader').length) {

            return ;

        }

        this.init();



    };



    Loader.prototype.init = function() {



        this.id = ('loader' + Math.random().toString()).replace('.','');

        this.render();

    }



    Loader.prototype.render = function() {

        // $(this.parent).css('height','231px');

        var margin;
        if ($(this.parent).offset() != null) {
            margin = -$(this.parent).offset().left;
        }

        var style = 'display:none;';

        if(this.fullWidth == true || this.fullWidth == "true") {

            // style += 'margin-left: ' + margin + 'px; width: 100vw;';

        } else {

            style += 'width:100%;height:' + parseInt($(this.parent).height()) + 'px;top:3px;left:0px'

        }



        $(this.parent).append('<div class="video-loader ' + (this.responsive ? 'responsive' : '') + '" id="' + this.id + '" style="' + style + '"><div class="left-eye"></div><div class="right-eye"></div><div class="mouth"></div></div>')

        //console.log("Animation");

        //console.log(this.id);

        $('#' + this.id).slideDown();

    }



    Loader.prototype.destroy = function () {

        var $loader = $('#' + this.id);

        var $parent = $(this.parent);

        // setTimeout(function() {

        //     // $loader.stop().fadeOut(this.speed)

        //     setTimeout(function() {

                $loader.remove();



        //             // $parent.css('min-height','auto');



        //     }, this.speed + 100);

        // }, this.delayDestroy);

    }



/*********      Shutterstock API  *********/

    window.shutterstock_no_clips_found = false;

    window.shutterstock_results_done = false;

    var shutterstockReload = 0;

    /**

     * Constructor

     * @param {Object} data informations about the connection

     */

    var ShutterstockAPI = function (data) {

        if ($("#shutterstock-results").length == 0) {
            if (window.location.href.indexOf('new_style=1') == -1) new VideoTooltip();
            return 0;
        }

        if(!data) data = {};



        this.init(data);

        //this.search();

    };



    /**

     * create authorization for ajax call

     * @return {String} Authorization String

     */

    ShutterstockAPI.prototype.encodeAuthorization = function () {



        if (!this.credentials.clientId || !this.credentials.clientSecret) {



            console.warn('Shutterstock clientId or clientSecret doesn\'t match.');

            return;

        }

        return 'Basic ' + btoa(this.credentials.clientId + ':' + this.credentials.clientSecret);

    }



    /**

     * run the search and fetch the response

     * @return {[type]} [description]

     */

    ShutterstockAPI.prototype.init = function(data) {

        this.urlParameters  = JSON.parse(window.videvoParameters);

        this.API_URL        = data.API_URL ? data.API_URL : 'https://api.shutterstock.com/v2';

        this.options        = data.options ? data.options : {

                                                per_page: 40,

                                                resolution: "high_definition",

                                                sort: "popular"

                                            };



        this.credentials    = data.credentials ? data.credentials : {clientId: '3352aeffbd24d33f8859',clientSecret:'097f832242ad371d9f012770cabdb1e6cebc433a'};

        this.container      = data.container ? data.container : '#shutterstock-results';



        this.options.query = "";



        // custom query

        if(typeof(this.urlParameters.clip_type) != "undefined") {

            //console.log("clip type = " + this.urlParameters.clip_type);

            if (this.urlParameters.clip_type == "Motion Graphics")

                this.options.query = "Motion graphics";

            if (this.urlParameters.clip_type == "Footage")

                this.options.query = "Footage Motions";

            if (this.urlParameters.clip_type == "Music")

                this.options.query = "Music";

            if (this.urlParameters.clip_type == "Sound Effects")

                this.options.query = "Sound Effects";


        }



        if (this.urlParameters.category) {

            this.options.query += (" " + this.urlParameters.category);



            this.options.query = this.options.query.trim();

        }





        if(this.urlParameters.search) {

            this.options.query = this.urlParameters.search;

        }



        if (typeof(window.relatedSearchStringShutterstock) !== "undefined")

        {

            this.options.query = window.relatedSearchStringShutterstock;

        }





        if(!this.options.resolution && !(this.urlParameters.resolution == '720p' || this.urlParameters.resolution == '1080p')) {

            this.options.resolution = '4k';

        }



        if(!this.options.page && this.urlParameters.pge) {

            this.options.page = 1;

            /*

            this.urlParameters.pge + 1;



            if(this.options.page > 20) {

                this.options.page = Math.floor(Math.random() * 20) + 1;

            }

            */

        }





        this.search();

        this.search_bottom();



    };





    ShutterstockAPI.prototype.restartEqualizer = function (obj) {

        clearTimeout(obj.timeout);



        obj.timeout = setTimeout(function() {

            obj.equalizer();

        }, 100);

        setTimeout(function(){

            $(obj.container + " .shut-results").css({overflow: "visible"});

        },301)

    }



    ShutterstockAPI.prototype.equalizer = function () {



        var minHeight = 9999;

        $.each($(this.container + ' img.preview'), function() {



            if(minHeight > this.height) minHeight = this.height;



        })



        if(minHeight < 75) {

            this.restartEqualizer(this);

            return ;

        } else {

           $(this.container + ' .video-thumb-wrapper').css({height: minHeight, overflow: "hidden"});

           //$(this.container + ' .video-thumb-wrapper').css({height: minHeight});

        }

        $('.shut-results').css({height: "210px"});



        var _self = this;

        $(window).on("resize", function() {

            _self.restartEqualizer(_self);

        })





    }



    /**

     * the real search

     * @return {[xhr Object]}

     */

    ShutterstockAPI.prototype.search = function(selector_changer) {

        if (selector_changer) {

            var $container = $(selector_changer);

        } else {

            var $container = $(this.container);

        }

        shutterstockReload ++;

        var loader = new Loader({parent: $container});

        if('Length', $container.find('.shut-results').length)

        {

            if (shutterstockReload > 2)

                return ;

        }

        else

        {

            $container.append('<div class="row"><div class="col-sm-12"><div class="shut-results"></div></div></div>');

        }

        $container = $container.find('.shut-results');



        authorization = this.encodeAuthorization();

        if (!authorization) return;



        var _self = this;



        var jqxhr = $.ajax({

                url: this.API_URL + '/videos/search',

                data: this.options,

                headers: {

                    Authorization: authorization

                }

            }).done(function (data) {

                $("a").click(function(e){
                    if ($(this).attr("href").indexOf("shutterstock") != -1) {
                        ga('send', 'event', { eventCategory: 'Shutterstock Redirect', eventAction: 'Opened', eventLabel: 'url: '+$(this).attr("href")});
                    }
                });

                if (data.total_count === 0) {



                    if (shutterstockReload < 2)

                    {

                        loader.destroy();

                        //window.videvoParameters = "";

                        _self.options.query = "";

                        _self.search();

                    }

                    else

                    {

                        window.shutterstock_no_clips_found = true;

                        $container.append('<p>No Results</p>');

                        loader.destroy();

                    }



                    return;

                }

                data.data = shuffle(data.data);

                $.each(data.data, function (i, item) {
                    if (window.location.href.indexOf('new_style=1') != -1){
                        if (i > 4) //images per row

                        return;
                }else{
                    if (i > 24) //images per row

                        return;
                }

                    var component = _self.renderItem(item);

                    $container.append(component);

                });



                if (selector_changer) {

                    setTimeout(function(){

                        $('#shutterstock-results2 .video-responsive-sponsored:nth-child(1)').css('display', 'inline-block');

                        $('#shutterstock-results2 .video-responsive-sponsored:nth-child(2)').css('display', 'inline-block');

                        $('#shutterstock-results2 .video-responsive-sponsored:nth-child(3)').css('display', 'inline-block');

                        $('#shutterstock-results2 .video-responsive-sponsored:nth-child(4)').css('display', 'inline-block');

                    }, 500);

                }



                _self.equalizer();





                if(typeof window.videoResponsiveShutterstock == "undefined") {

                    window.videoResponsiveShutterstock = new VideoResponsive({container: '.video-responsive-sponsored'});

                } else {

                    window.videoResponsiveShutterstock.resize();

                }

                window.shutterstock_results_done = true;

                loader.destroy();

                // setTimeout(function(){

                //     loader.destroy();

                // }, 2000);


                if ( $('#shutterstock-results .shut-results .columns a, #shut-results a').length > 0 ) {

                    $('#shutterstock-results .shut-results .columns, #shut-results').each(function(){

                        $(this).find('a').addClass('shutterstock-ga-track');

                    });

                }

                setTimeout(function() {

                    if (window.location.href.indexOf('new_style=1') == -1) new VideoTooltip();

		        }, 2000);

            }).fail(function (xhr, status, err) {

                console.warn('Failed to retrieve video search results:\n' + JSON.stringify(xhr.responseJSON, null, 2));
                if (window.location.href.indexOf('new_style=1') == -1) new VideoTooltip();
            });



        return jqxhr;

    }



    ShutterstockAPI.prototype.search_bottom = function() {

        if ($('#shutterstock-results2').length > 0) {

            this.search('#shutterstock-results2');

        }

    }





    ShutterstockAPI.prototype.renderItem = function(item) {

        if (!item) return;



        var $element = $('<div class="video-responsive-sponsored columns" style="display:none">');

        var $wrapper = $('<div class="video-thumb-wrapper">');

        var $row     = $('<div class="row">');

        var $inner   = $('<div class="video-thumb-inner sponsored">');

        var $anchor  = $('<a target="_blank">');

        var $img     = $('<img class="preview">');

        if (window.location.href.indexOf('new_style=1') != -1) {

            var $title = $('<div class="thumb_title">');

            var $anchor_video_name = $('<a href="https://shutterstock.7eer.net/c/51471/43068/1305?u=https://www.shutterstock.com/video/clip-' + item.id + '">');

            var $progress_bar = $('<div class="progress_bar_video">');

            var $progress_bar_inside = $('<div class="progress_bar_seek">');

            var $video_name = $('<div class="thumb_video_name">');

            var $video_author = $('<div class="thumb_author">');

            var $video_author_name = $('<span class="thumb_author_name">');

            var $video_author_name_anchor = $('<a href="#" class="thumb_author_name_link">');

        }

        $img.attr('src', item.assets.thumb_jpg.url)

            .attr('title', item.description)

            .attr('data-description', item.description);

        $anchor.attr('href','https://shutterstock.7eer.net/c/51471/43068/1305?u=https://www.shutterstock.com/video/clip-' + item.id)

               .append($img);

        $inner.append($anchor);

        $row.append($inner);

        $wrapper.append($row);

        if (window.location.href.indexOf('new_style=1') != -1) {

            $video_author_name_anchor.html("Shutterstock");

            $video_author_name.append($video_author_name_anchor);

            $video_author.append($video_author_name);

            $anchor_video_name.html(item.description);

            $video_name.append($anchor_video_name);

            $title.append($progress_bar);

            $progress_bar.append($progress_bar_inside);

            $title.append($video_name);

            $title.append($video_author);

            $element.append($title);

        }

        $element.append($wrapper);



        return $element;

    }

/**************    Tooltip    ****************/

    var VideoTooltip = function(data) {

        if(!data) data = {};







        this.init(data);

    }



    var canDestroy = 0;



    VideoTooltip.prototype.init = function(data) {





        this.selector       = data.selector ? data.selector : '.preview';

        this.parent         = data.parent   ? data.parent   : '.video-thumb-wrapper';

        this.procent        = data.width    ? data.width    : 25;

        this.delay          = data.delay    ? data.delay    : 200;

        this.maxWidth       = data.maxWidth ? data.maxWidth : 400;

        this.resize();



        var _self = this;



        $(this.selector).unbind('mouseenter');

        $(document).on('mouseover', this.selector, function(e) {

            clearTimeout(window.tooltipTimeout);

            window.activeTooltipVideo = $(this).attr("data-video-preview");

            _self.destroy();

            var el = this;

            window.tooltipTimeout = setTimeout(function() {

                _self.render(e, $(el));

            }, _self.delay);

        });



        $(this.selector).unbind('mouseleave');



        $(document).on('mouseleave', this.selector, function() {

            // window.activeTooltipVideo = $(this).attr("data-video-source");

            if (canDestroy == 1)

                _self.destroy();

        });


        $(document).on("mouseover", function(e){

            if (window.activeTooltipVideo) {

                setTimeout(function(){

                    hoverableItemImg = $("[data-video-preview='"+activeTooltipVideo+"']");

                    hoverableVideoPreview = $("#video-tooltip");

                    var hoverableAudio = $("#custom-seekbar-preview");

                    if (hoverableAudio.length > 0 && hoverableItemImg.length > 0 && hoverableVideoPreview.length >0) {

                        if ($(hoverableVideoPreview).find(e.target).length != 1 && hoverableVideoPreview[0] != $(e.target)[0] && hoverableItemImg[0] != $(e.target)[0]) {
                            canDestroy = 1;
                            $("#video-tooltip video")[0].pause();
                            $('#video-tooltip').css("visibility","hidden");
                        }
                        else {
                            canDestroy = 0;
                        }

                    }
                    else {

                        canDestroy = 1;

                    }

                },200);

            }

        })



        $(document).on("click", function(e) {

            hoverableVideoPreview = $("#video-tooltip");

            if ($(hoverableVideoPreview).find(e.target).length != 1) {

                canDestroy = 1;

                _self.destroy();

            }

        });



        $(window).on("resize", function() {

            _self.resize(data, _self);

        })







    }



    VideoTooltip.prototype.resetSize = function (data, _self) {

        if( typeof this.timeout != "undefined") {

            clearTimeout(this.timeout);

        }



        this.timeout = setTimeout(function() {

            this.resize(data, _self);

        }, 100);



    }



    VideoTooltip.prototype.resize = function(data, _self) {

        if(typeof _self != "undefined") this.width = _self.width;



        this.destroy();



        this.width = (this.procent/100) * $(window).width();



        if(this.width < this.maxWidth && $(window).width() > this.maxWidth) this.width = this.maxWidth;



    }



    VideoTooltip.prototype.render = function(e, $el) {

            // if video preview is true the tooltip will show the video, if it's false it will show the image.

            videoPreview = true;



            var mousePosition = {

                left: e.clientX,

                top: e.clientY

            }

            var $parent = $el.closest(this.parent);



            var parent = {position: $parent.parent().offset()};

            parent.width = parseInt($parent.parent().width()) + 2 * parseInt($parent.parent().css('padding-left')) + 2;



            // var $tooltip = $("<div id='video-tooltip'><img src='"+ $el.attr('src') +"' alt='Image preview' />"+ $el.data('description') +"</div>")



            var is_audio = 0;
            var tooltip = "";


            if (videoPreview) {
            	/* get the url of the image preview to set it as a poster */

            	if (typeof($el[0].currentSrc) !== 'undefined' && $el[0].currentSrc.substr(-4) == ".jpg")
            		poster_src = "poster='" + $el[0].currentSrc + "'";

                if ($el.attr("data-video-preview")) {

                    if ($el.attr("data-video-preview").substr(-4) == ".jpg") {

                        is_audio = 1;

                        var poster_src = "";
                        if ($el.attr("data-video-preview").indexOf("http") != 0)
                            poster_src = window.location.origin + $el.attr("data-video-preview");
                        else
                            poster_src = $el.attr("data-video-preview");

                        video_source_webm = $el.attr("data-video-source").slice(0,-3)+"webm";

                        video_source_mp4 = $el.attr("data-video-source");

                        tooltip = ("<div id='video-tooltip'><div id='audio-player-tooltip'><span id='custom-seekbar-preview'></span>"+
                        					"<video ref='video' class='' id='video-in-tooltip' width='100%' poster='"+poster_src+"'>"+
                        					"<source type='audio/mpeg' src='"+video_source_mp4+"'>"+
                        					"<source type='video/webm' src='"+video_source_webm+"'></video></div><div id='tooltip_info'>"+ $el.data('description') +"</div></div>")

                    }

                    else {

                        if ($el.attr("data-video-preview").indexOf("http") == 0)
                            video_source_webm = $el.attr("data-video-preview");
                        else
                            video_source_webm = "/" + $el.attr("data-video-preview");

                        video_source_mp4 = video_source_webm.replace("/preview/", "/videos/");

                        video_source_mp4 = video_source_mp4.replace(".webm", ".mp4");

                        tooltip = ("<div id='video-tooltip'><div id='audio-player-tooltip'>"+
                        		"<video ref='video' class='' width='100%' autoplay muted " +poster_src+ "><source type='video/webm' src='"+video_source_webm+"'>"+
                        		"<source type='video/mp4' src='"+video_source_mp4+"'></video></div><div id='tooltip_info'>"+ $el.data('description') +"</div></div>")

                    }

                } else {

                    video_source_webm = $el.attr('src').replace(".jpg", ".webm");

                    video_source_mp4 = video_source_webm.replace(".webm", ".mp4");


                    tooltip = ("<div id='video-tooltip'><div id='audio-player-tooltip'>"+
                    			"<video ref='video' class='' width='100%' autoplay muted " +poster_src+ "><source type='video/webm' src='"+video_source_webm+"'>"+
                    			"<source type='video/mp4' src='"+video_source_mp4+"'></video></div><div id='tooltip_info'>"+ $el.data('description') +"</div></div>")

                }

            } else {

                tooltip = ("<div id='video-tooltip'><img src='"+ $el.attr('src') +"' alt='Image preview' /><div id='tooltip_info'>"+ $el.data('description') +"</div></div>")

            }


            if (videoPreview && is_audio != 1)
            {
            	if ($("#video-tooltip").length > 0)
            	{
                    if ($("#video-tooltip #custom-seekbar-preview").length > 0)
                        $("#video-tooltip #custom-seekbar-preview").remove();
            		$("#video-tooltip video").attr("poster",  $el[0].currentSrc);
                    $("#video-tooltip video").attr("muted", true);
                    $("#video-tooltip video").attr("autoplay", true);
                    $("#video-tooltip video").removeAttr("id");
            		$($("#video-tooltip video source")[0]).attr("src", video_source_webm);
            		$($("#video-tooltip video source")[1]).attr("src", video_source_mp4);
            		$("#tooltip_info")[0].innerHTML = $el.data('description');
            	}
            	else
            	{
            		 $("html").append(tooltip);
            	}
            }
            else if (videoPreview && is_audio == 1)
            {

                if ($("#video-tooltip").length > 0)
                {
                    $("#video-tooltip").remove();
                    $("html").append(tooltip);
                    var poster_src = "";
                    if ($el.attr("data-video-preview").indexOf("http") != 0)
                        poster_src = window.location.origin + $el.attr("data-video-preview");
                    else
                        poster_src = $el.attr("data-video-preview");
                    $("#video-tooltip video").attr("poster",  poster_src);
                    /*
                    if ($("#video-tooltip #custom-seekbar-preview").length == 0) {
                        $("#video-tooltip #audio-player-tooltip").prepend("<span id='custom-seekbar-preview'></span>");
                        $("#video-tooltip #tooltip_info").before("</div>");
                    }
                    console.log("yyy",$el[0].currentSrc);
                    $("#video-tooltip video").attr("poster",  $el[0].currentSrc);
                    $("#video-tooltip video").attr("id", "video-in-tooltip");
                    $("#video-tooltip video").removeAttr("muted");
                    $("#video-tooltip video").removeAttr("autoplay");
                    $($("#video-tooltip video source")[0]).attr("src", video_source_webm);
                    $($("#video-tooltip video source")[1]).attr("src", video_source_mp4);
                    $("#tooltip_info")[0].innerHTML = $el.data('description');
                    */
                }
                else
                {
                     $("html").append(tooltip);
                }


            }
            else
            {
                $("html").append(tooltip);
            }

            $('#video-tooltip video')[0].load();
            $tooltip = $('#video-tooltip');
            $tooltip.css("visibility","visible");

            if (is_audio == 1) {

                $('#video-tooltip video').trigger("play");

                // $('#video-tooltip video').get(0).play();

                //audio preview trick

                var vid = document.getElementById("video-in-tooltip");

                vid.ontimeupdate = function(){

                  var percentage = ( vid.currentTime / vid.duration ) * 100;

                  $("#custom-seekbar-preview").css("left", percentage+"%");

                };



                $("#video-tooltip video").on("click", function(e){

                    var vid = document.getElementById("video-tooltip").getElementsByTagName("video")[0];

                    if (vid.paused) {

                        vid.play();

                    }else{

                        var offset = $(this).offset();

                        var left = (e.pageX - offset.left);

                        var totalWidth = $("#video-tooltip video").width();

                        var percentage = ( left / totalWidth );

                        var vidTime = vid.duration * percentage;

                        vid.currentTime = vidTime;
                    }
                })

            }

            else {

                canDestroy = 1;

            }

            var css = {width: parent.width};



            if($parent.find('.sponsored').length) {



                css.top = parent.position.top;

            } else {



                if (is_audio == 1)

                    css.top = parent.position.top - 425 + $parent.height();

                else

                    css.top = parent.position.top - 290 + $parent.height();



            }



            if(parent.position.left + this.width + parent.width <= $(window).width()) {

                css.left  =  parent.position.left + parent.width + 30; //-this.width;

                if (is_audio == 1)

                    css.left = parent.position.left + parent.width - 355;

            } else {

                css.left =  parent.position.left - this.width; //-this.width;

                if (is_audio == 1)

                    css.left = parent.position.left - this.width + 355;

            }

//            css.top = 0;

//            css.left = 0;
            $tooltip.offset({ top: css.top, left: css.left });
            $tooltip// .offset({ top: css.top, left: css.left })

//                  .css(css)

                    .stop()

                    .animate({width: this.width}, 0)

                    .css("display","block");





    }



    VideoTooltip.prototype.destroy = function () {



        clearTimeout(window.tooltipTimeout);

        if (typeof($("#video-tooltip video")[0]) != 'undefined') {

            // document.getElementsByTagName('video')[1].pause();
            $("#video-tooltip video")[0].pause();

            setTimeout(function(){

                $('#video-tooltip').css("visibility","hidden");

            },100)

        } else {

            $('#video-tooltip').css("visibility","hidden");

        }

    }





/*************  Filters     *****************/



    var Filters = function(data) {

        if(!data) data = [];



        this.container = data.container ? data.container : '.filter-wrapper';

        this.clearButton = data.clearButton ? data.clearButton : '#filter-clear';

        this.activeFilters = 0;

        /*if (window.location.pathname.search("/search/") == 0)

            this.URL = '//' + window.location.hostname + '/search'  + "/%search%%clip_type%%category%%sort%%resolution%%license%";

        else

        */

        this.URL = '//' + window.location.hostname + "/%search%%clip_type%%category%%sort%%resolution%%license%%mood%%instrument%%freeclips%%r_rated%";



        this.init();

    }



    Filters.prototype.init = function () {

        var _self = this;



        if(Object.keys(videvoObject).length > 2) {

            if((typeof videvoObject.pge != "undefined" && Object.keys(videvoObject).length > 4) || typeof videvoObject.pge == "undefined") {



                $(this.clearButton).fadeIn();



            }

        }





        var isMobile = false; //initiate as false

            // device detection

            if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)

                || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;



        this.equalizer();

        $(this.clearButton).on('click', function () {

            _self.clear();



        });



        $(document).on('click', this.container + ' ul li:not(.selected)', function(e) {

            e.stopImmediatePropagation();

            _self.pick($(this));

        });



        $(document).on('click', this.container + ' .option-title', function (e) {

            e.stopImmediatePropagation();

            _self.show($(this).closest(_self.container));

        });



        $(document).on('click', 'body:not(' + this.container + ' .option-title)', function () {

            _self.hide();

        });



        $(document).on('click', 'body:not(' + this.container + ' .option-title)', function () {

            _self.hide();

        });



        $(document).on('click', '.filter-delete', function () {

            if(!isMobile) {



                _self.clear($(this).parent());

            }

        });



        $(document).on('click', '.option-selected', function () {



                if(isMobile) {

                    if($(this).hasClass('active')) _self.clear($(this));



                    $(this).addClass('active');

                }

        });





    }



    Filters.prototype.show = function ($el) {

        /*

        this.hide();



        var $target = $el.find('ul');

        $target.stop().slideToggle(300);



        setTimeout(function() {



            $target.css({overflow: 'auto'});

        }, 400);

        */

       var $target = $el.find('ul');

        var display = $target.css("display");

        this.hide();



        if (display=="none") {

            $target.slideDown(300);

            setTimeout(function() {

                $target.css('overflow-y','auto');

            }, 400);

        }

    }



    Filters.prototype.hide = function () {

        /*

        $(this.container).find('ul').stop().slideUp();

        $(this.container).find('ul').css('height','60vh');

        */

        $(this.container).find('ul').slideUp();



    }



    Filters.prototype.pick = function ($el) {

        var $container = $el.closest(this.container);

        var type = $container.data('type');

        var max = $container.data('max');

        var indexCurrent = $el.data('index');

        var selected = $container.children('li').length;



        if(type == 'single' || selected == max) {

            this.hide();

        }



        if(selected > max) {

            var selected = $container.children('li');

            var $elRemoved = $(selected[1]);

            this.clearNoRefresh($elRemoved, $container);



        }



        var value = $.trim($el.text());

        $container.append('<li class="option-selected" data-index="' + indexCurrent + '" data-value="' + value + '" title="' + value + '"><i class="filter-delete fa fa-minus-square" aria-hidden="true"></i>' + value + '</li>');

        $el.addClass('selected');

        this.activeFilters++;



        var _self = this;





        this.revealClearButton();

    }



    Filters.prototype.redirect = function () {

        /* Last change - 06-09-2017  by Sorin M to make the filters for tags */

        /* Last change - 11-10-2017  by Radu P to fix filtering problem */

        var URL = this.URL;

        var _self = this;



        /* This part right here extract the exact tag and clip type from the url */

        var searchFlag = false;

        var searchString = "";

        var urlParts = location.pathname.split("/");

        if (urlParts[1] == "search")

        {

        	searchFlag = true;

        	searchString = urlParts[2];

        	URL = URL.replace('%search%', "search/" + searchString + "/");

        }

        var clip_type = "";

        $(_self.container + ' .selected').each(function() {

            var data = $(this).data();

            if (data.name == "%clip_type%")

            {

                clip_type = data.url;

                if (data.url == "Footage" || data.url == "free-stock-footage")

                {

                    data.url = "free-stock-footage";

                }

                if (data.url == "Motion Graphics" || data.url == "free-motion-graphics")

                {

                    data.url = "free-motion-graphics";

                }

                if (data.url == "Music" || data.url == "royalty-free-music")

                {

                    data.url = "royalty-free-music";

                }

                if (data.url == "Sound Effects" || data.url == "royalty-free-sound-effects")

                {

                    data.url = "royalty-free-sound-effects";

                }


                if (searchFlag)

                {

                    URL = URL.replace(data.name, "clip_type/" + data.url + "/");

                }

                else

                {

                    URL = URL.replace(data.name, data.url + "/");

                }

            }

            else

                URL = URL.replace(data.name, data.url + "/");

        })



        // if no clip type was selected, replace it with default

        if (!searchFlag)

        	URL = URL.replace('%clip_type%', 'stock-video-footage/');


        var params = ['%search%', '%clip_type%', '%category%', '%sort%', '%resolution%','%license%','%mood%','%instrument%','%freeclips%','%r_rated%'];


        $.each(params, function ( key, value ) {

            if (value == '%freeclips%' &&
                typeof(document.getElementById("freeclips_set")) != 'undefined' &&
                document.getElementById("freeclips_set") != null)
                URL = URL.replace(value, document.getElementById("freeclips_set").value);
            else if (value == '%r_rated%' &&
                    typeof(document.getElementById("r_rated_set")) != 'undefined' &&
                    document.getElementById("r_rated_set") != null)
                URL = URL.replace(value, document.getElementById("r_rated_set").value);
            else
                URL = URL.replace(value, '');

        })



        location.href = URL;



        // return URL;

    }



    Filters.prototype.clearNoRefresh = function($el) {



        if(typeof $el != "undefined") {

            this.activeFilters--;

            var $container = $el.closest(this.container);

            var index = $el.data('index');

            $container.find('.option-' + index).removeClass('selected').removeClass('.selected');

            $el.remove();

        } else {

            $('.option-selected').remove();

            $('.option').removeClass('selected');

            this.activeFilters = 0;

        }





    }





    Filters.prototype.clear = function($el) {

        /* Last modified by Sorin Marica - 22-08-2017 12:39 filters bug */

        this.clearNoRefresh($el);



        if (typeof($el) == 'undefined') { //if $el is undefined it means that it's a clear all filters request. Else it is a single field clear request

        location.href = 'https://' + location.host + '/browse';

        return; // reload bug below

        }



        var _self = this;

        // In iOS URL doesn't work without this timeout.



        setTimeout(function() {

            _self.revealClearButton();

        }, 100);



    }



    Filters.prototype.revealClearButton = function () {

        this.redirect();



        // return ;

        if(this.activeFilters > 1) {

            $(this.clearButton).fadeIn();

        } else {

            $(this.clearButton).fadeOut();



        }

    }



    Filters.prototype.restartEqualizer = function (obj) {



        clearTimeout(obj.timeout);



        obj.timeout = setTimeout(function() {



            obj.equalizer();

        }, 100);

    }



    Filters.prototype.equalizer = function () {



        // var maxHeight = 0;

        // $.each($(this.container), function() {

        //     if(maxHeight < $(this).height()) maxHeight = $(this).height();



        // })

        // if(maxHeight == 0) {

        //     this.restartEqualizer(this);

        // } else {

        //     console.log("css set height filters: " + maxHeight);

        //     $(this.container).css({height: maxHeight});

        // }



        var _self = this;

        $(window).on("resize", function() {

            _self.restartEqualizer(_self);

        })





    }



/****************** List Videos *********************/



    var ListVideos = function (data) {

        if(!window.videvoParameters) return;

        if(!data) data = {};

        this.params             = JSON.parse(window.videvoParameters);


        this.API_URL            = window.location.origin + "/app/list-videos.php";

        this.container          = data.container ? data.container : '#list-videos';

        this.params.recomended  = data.recomended ? data.recomended : false;

        this.params.site_url    = window.location.origin + window.location.pathname;



        if(typeof this.params.site_url != "undefined") {



            this.params.site_url = this.params.site_url.replace('/pge/' + this.params.pge + '/rec/' + this.params.rec, '');

            if(this.params.site_url.substr(this.params.site_url.length-1, 1) != '/') {

                this.params.site_url += "/";

            }

        }



        this.init();



        var _self = this;



        if(this.params.recomended) {

            this.params.tags = new Array();

            $.each($('.tag'), function() {

                if (_self.params.tags.length < 5)

                    _self.params.tags.push($.trim($(this).text()));

            });

        }



        /*



        if (typeof(window.relatedSearchStringVidevo) !== "undefined")

        {

            this.params.search  =  window.relatedSearchStringVidevo;

        }



        */



        _self.getVideos();





        // $(window).on("resize", function() {

        //     _self.init();

        // })

        //

        // if we need recomended videos we need  to get all tags;



    }







    ListVideos.prototype.init = function () {



        var width = $(window).width();

        this.params.ads_after_rec = false;

        this.params.rec = 11;



        if (width > 1024) {

            this.params.rec = 35;

            this.params.ads_after_rec = 18;

        }

        if (width < 1025 && width > 641) {

            this.params.rec = 14;

        }

        if (window.location.href.indexOf('new_style=1') != -1)

            this.params.ads_after_rec = 15;



    }



    ListVideos.prototype.getVideos = function () {



        if (JSON.parse(window.videvoParameters).video > 0)

            return this.getVideosDetailPage();



        var _self = this;



        // $(_self.container).append('<div class="list-wrapper"></div>');

        // var container = $(_self.container).find('.list-wrapper');



        // if(typeof window.videoResponsive == "undefined") {

        //     window.videoResponsive = new VideoResponsive();

        // }

        // window.videoResponsive.resize();

        // $(_self.container).css({height: "auto"});

        //return jqxhr;

    }



    ListVideos.prototype.getVideosDetailPage = function() {

        var loader = new Loader({parent: this.container, delayDestroy: 1});

        var _self = this;

        var jqxhr = $.ajax({

                url: this.API_URL,

                data: {

                    search: window.window.relatedSearchStringVidevo,

                    is_audio: window.window.is_audio,

                    similar_clips: true

                },

            }).done(function (data) {

                data = JSON.parse(data);

                $(_self.container).append('<div class="list-wrapper"></div>');

                var container = $(_self.container).find('.list-wrapper');

                $.each(data.elements, function(key, value) {

                    $(container).append($(value));

                });

                loader.destroy();



                if(typeof window.videoResponsive == "undefined") {

                    window.videoResponsive = new VideoResponsive();

                } else {

                    window.videoResponsive.resize();

                }

                $(_self.container).css({height: "auto"});


            }).fail(function (xhr, status, err) {

                console.warn('Failed to retrieve video search results:\n' + JSON.stringify(xhr.responseJSON, null, 2));

            });



        return jqxhr;



    }







/***************** Video Responsive **************/



    var VideoResponsive = function (data) {

        if(!data) data = {};

        this.defaultWidth  = data.defaultWidth ? data.defaultWidth : { desktop: 305, tablet: 225, mobile: 170};

        if (!data.defaultWidth && window.location.href.indexOf('new_style=1') != -1)
            this.defaultWidth = { desktop: 330, tablet: 250, mobile: 195};

        this.rowsShutterstock  = typeof JSON.parse(window.videvoParameters).search == "undefined" && typeof JSON.parse(window.videvoParameters).video == "undefined" ? 1 : 1;

        this.rowsVidevo        = typeof JSON.parse(window.videvoParameters).video == "undefined" ? false : 5;

        this.have_tags = false;

        //console.log(JSON.parse(window.videvoParameters).search, this);

        this.container     = data.container ? data.container : '.video-responsive';

        this.ads = '.ad-responsive';

        this.resizeParentShutterstock = 0;

        // this.loaders        = {};

        this.reinit         = 0;

        var _self = this;

        var timeout  = false;

        $(this.container + ' img').load(function() {

            // var id = $($(this).closest(_self.container).children()).data('loader');



            // _self.loaders[id].destroy();

            $(this).animate({opacity: 1}, 500);



            // if($(this).parent().parent().hasClass('sponsored') == 1) {

            //     this.resizeParentShutterstock--;

            //     if(this.resizeParentShutterstock == 0) {

            //         $(this).closest('.shut-results').css({overflow: 'visible'});

            //     }

            // }





            clearTimeout(timeout);

            timeout = setTimeout(function() {



                $('.shut-results').css('overflow', 'visible');



                $(_self.container + ' img').each(function() {

                    $(this).animate({opacity: 1}, 500);

                    // $(this).closest(_self.container).children().css('height', "auto");

                })

            }, 2000);

        })





        this.init();

    }



    VideoResponsive.prototype.init = function () {



        var _self = this;



        this.resize();



        $(window).on('resize', function() {

            _self.reset();

        })

    }



    VideoResponsive.prototype.reset = function () {

        if(typeof this.timeout != "undefined") {

            clearTimeout(this.timeout);

        }



        var _self = this;

        this.timeout = setTimeout(function() {

            _self.resize()

        }, 100);

    }



    VideoResponsive.prototype.resize = function () {



        var clipWidth = this.calculateWidth();

        $(this.container).css({width: clipWidth});



        // fix tags and keep only 2 lines of similar clips from videvo

        if (this.container != ".video-responsive-sponsored")

        {

            this.fixTags();



            if (this.have_tags)

            {

                _self = this;

                numberOfClips = $('.video-responsive').length;

                numberOfRows =  _self.rowsVidevo;

                if (numberOfClips < (_self.clipsPerRow * _self.rowsVidevo))

                {

                    numberOfRows = Math.floor(numberOfClips / _self.clipsPerRow);

                }

                $.each($('.video-responsive'), function(key, value) {

                if(key < _self.clipsPerRow * numberOfRows) {

                    $(this).closest(_self.container).fadeIn();

                } else {

                    $(this).closest(_self.container).fadeOut();

                }

            });

            }

        }



        //console.log ($("#list-videos .preview").naturalWidth + " " + $("#list-videos .preview").height() + " parent " + $("#list-videos .video-thumb-wrapper").height()) ;



        if ($("#list-videos .preview").height() < $("#list-videos .video-thumb-wrapper").height())

        {

            ampFactor = $("#list-videos .preview").width() / 100 * $("#list-videos .video-thumb-wrapper").height() / $("#list-videos .preview").height();

            // $("#list-videos .preview").height($("#list-videos .video-thumb-wrapper").height() + "px");

            //$("#list-videos .preview").width($("#list-videos .video-thumb-wrapper").height() / 0.56 + "px");

            //leftOffset = ($("#list-videos .video-thumb-wrapper").height() / 0.56 - $("#list-videos .video-thumb-wrapper").width()) / 2;

            //$("#list-videos .preview").css({position:"absolute",left:"-" + leftOffset + "px"});

        }

        this.equalizerForNextButton();

    }



    VideoResponsive.prototype.restartEqualizerForNextButton = function () {



        clearTimeout(this.timeout);



        var _self = this;

        this.timeout = setTimeout(function() {



            _self.equalizerForNextButton();

        }, 100);

    }



    VideoResponsive.prototype.equalizerForNextButton = function () {

        var prevHeight = $('.next-button').parent().prev().children().height();



        if(prevHeight < 50) {

            this.restartEqualizerForNextButton();

        } else {



            $('.next-button').find('.text').css({height: prevHeight})

            // $('.shut-results').animate({height: $('.next-button').parent().height() * this.rowsShutterstock }, 100);

        }

    }



    VideoResponsive.prototype.calculateHeight = function (width) {

        var height = width * 0.62 - parseInt($(this.container).children().css('margin-bottom')) - parseInt($(this.container).children().css('margin-top')) + parseInt($(this.container).children().css('padding'));



        // rest is just a hack for shutterstock

        if(this.reinit) return;



        this.reinit++;

        var _self = this;



        $.each($('.video-thumb-wrapper'), function() {

            $(this).css({height: height});



            // var load = new Loader({parent: this, fullWidth: false, delayDestroy: 1000});

            // _self.loaders[load.id] = load;



            // $(this).data('loader', load.id);



            if($(this).find('.sponsored').length) {



                _self.resizeParentShutterstock++;



                if(_self.resizeParentShutterstock == 1) {

                    var parent = $(this).closest('.shut-results');

                    var elHeight = parseInt($(parent).children().css('height'));

                    parent.stop();

                    // parent.stop().animate({height: _self.rowsShutterstock*elHeight}, 300);

                }

            }

            if(_self.rowsVidevo && !$(this).find('.sponsored').length) {

                var parent = $(this).closest('.list-wrapper');



                $.each($(parent).children(), function () {



                });





            }

        });





    }





    VideoResponsive.prototype.fixTags = function () {

        var tag_top = 0;

        var tag_lines = 0;

        var last_tag_index = 0;

        _self = this;



        $.each($('.tag'), function(index, value) {

            _self.have_tags = true;

            $(this).show();

            if ($(this).offset().top != tag_top)

            {

                tag_top = $(this).offset().top;

                tag_lines ++;

            }

            if (tag_lines > 4)

            {

                $(this).hide();

                if (last_tag_index == 0)

                {

                    last_tag_index = index;

                }

            }



        });

        if (last_tag_index > 0)

        {

            $($('.tag')[last_tag_index - 1]).hide();

            $('.more_tags').html("+" + ($('.tag').size() - last_tag_index) + " more");

            $('.more_tags').show();

        }

        else

        {

            $('.more_tags').hide();

        }

       //console.log(last_tag_index + " - lines " + tag_lines);

    }



    VideoResponsive.prototype.calculateWidth = function () {

        var width = this.defaultWidth.desktop;

        if (window.location.href.indexOf('new_style=1') != -1)
            width = $("#list-videos .video-responsive, #shutterstock-results .video-responsive-sponsored").width();

        if($(window).width() < 420) {

            width = this.defaultWidth.mobile;

        } else if($(window).width() < 850) {

            width = this.defaultWidth.tablet;

        }



        this.calculateHeight(width);



        var parentWidth = $(this.container).parent().width();

        var clipsPerRow = parseInt(parentWidth/width);

        var emptyWidth  = parentWidth - width * clipsPerRow;

        var clipWidth   = width;





        if(emptyWidth < width/2) {

            clipWidth += emptyWidth/clipsPerRow;

        } else {

            clipsPerRow++;

            emptyWidth  = parentWidth - width * (clipsPerRow);

            clipWidth   += emptyWidth/(clipsPerRow);

        }



        // rearrange ads

        ads_number = 0;



        this.clipsPerRow = clipsPerRow;

        var _self = this;

        $.each($(this.ads), function(key, value) {

            var clipsBefore = $(this).prevAll().length;





            {

                try

                {

                    $(this).insertBefore('#responsive-video-' + (parseInt(clipsPerRow * 3 * ads_number)) );

                }

                catch (err)

                {



                }

            }

            ads_number++;

        })



        //solve issue with shuttherstock ads

        if (this.container == ".video-responsive-sponsored")

        {

            $.each($('.sponsored'), function(key, value) {

                if(key < clipsPerRow * _self.rowsShutterstock) {

                    $(this).closest(_self.container).fadeIn();

                } else {

                    $(this).closest(_self.container).fadeOut();

                }

            })

        }





        // if (this.container == ".video-responsive")

        //     _self.rows = _self.rowsVidevo;

        // else

        //     _self.rows = _self.rowsShutterstock;

        // {

        //     if(_self.rowsVidevo && !$(this).find('.sponsored').length) {

        //         var parent = $(this).closest('.list-wrapper');

        //         $.each($(this.container).children(), function(key, value) {



        //            if(key < clipsPerRow *  _self.rowsShutterstock) {

        //                 $(this).closest(_self.container).fadeIn();

        //             } else {

        //                 $(this).closest(_self.container).fadeOut();

        //             }

        //         });

        //     }

        // }



        return clipWidth - 1;

    }

/********* Social left buttons & Feedback ******************/



function fixButtons() {





    var $socialButton = $('.supsystic-social-sharing-loaded');

    var $feedbackButton = $('#un-button');



    var socialButtonHeight  = $socialButton.height();

    var feedbackButtonHeight = $feedbackButton.width();

    var windowHeight = $(window).height();



    var center = windowHeight/2;

    var buttonsHeight = socialButtonHeight + feedbackButtonHeight;

    $socialButton.css({top: center - buttonsHeight/2 + 'px'});

    $feedbackButton.css({top: center + (buttonsHeight - socialButtonHeight) + 'px'});

}



function startFixButtons() {

    if(typeof window.timeoutFixButtons != "undefined") {

        clearTimeout(window.timeoutFixButtons);

    }



    window.timeoutFixButtons = setTimeout(function() {

        fixButtons();

    }, 100);

}

/********************** Fix Video Ratio ************/



function fixVideoRatio () {

    if($(window).width() < 1180)

    {

        $('#video').css({height: $('#video').width()/1.77});
        $('#custom-seekbar-container').css({height: $('#video').width()/1.77});

    }

    else

    {

        $('#video').css({height: "388px"});
        $('#custom-seekbar-container').css({height: "388px"});

    }

}



function startFixVideoRatio() {

    if(typeof window.timeoutFixVideoRatio != "undefined") {

        clearTimeout(window.timeoutFixVideoRatio);

    }



    window.timeoutFixVideoRatio = setTimeout(function() {

        fixVideoRatio();

    }, 100);

}



/***************   Triggers   ******************/



$(document).ready(function () {



    // Faq Page - Accordion



    $('#accordion').find('.accordion-toggle').click(function(){

        $(this).toggleClass('active').siblings().removeClass('active');



      $(this).next().slideToggle('fast');



      $(".accordion-content").not($(this).next()).slideUp('fast');



    });









    // Read More Text



     $('.read-more').on('click',  function() {

        $('.show-on-large').show();

        $('.show-on-small').hide();

     })



   // Social Modal



        $(".more_tags").on("click", function() {

        $(".tag").show();

        $(".more_tags").hide();

    });



    $('#download-button').not(".no-popup").on('click', function() {

        if (popup_index >= 0)

        {

            setTimeout(

            function(){

                $('.wrapper-social-modal').show();



            }, 2000 );

        }



    });

    $('.download-col').not(".no-popup").on('click', function() {

        if (popup_index >= 0)

        {

            setTimeout(

            function(){

                $('.wrapper-social-modal').show();



            }, 2000 );

        }



    });


    $('.dont-ask > span').on('click', function(){

        // $('.wrapper-social-modal').css('display' , 'none');

        $.ajax({

        type: 'POST',

        url: '/wp-admin/admin-ajax.php?dontask=1',

        async: true,

        data: { action: 'update_popup' }

        });

        $('.wrapper-social-modal').hide();

    });





    $('.social-button-click').on('click', function(){

        // $('.wrapper-social-modal').css('display' , 'none');

        $.ajax({

        type: 'POST',

        url: '/wp-admin/admin-ajax.php?dontask=1',

        async: true,

        data: { action: 'update_popup' }

        });

    });



    $('.social-modal-close').on('click', function(){

        $('.wrapper-social-modal').hide();

    });



    $('.wrapper-social-modal').on('click', function(){

        $('.wrapper-social-modal').hide();

    });



    $('.wrapper-social-modal .social-modal').on('click', function(e){

        e.stopImmediatePropagation();

        e.stopPropagation();

    });





    window.videvoObject = JSON.parse(window.videvoParameters);



    if( typeof videvoObject.video != "undefined" ) {

        new ListVideos({recomended: true});

    } else {

        new ListVideos();

    }



    if($(window).width() > 1000) {

        new ShutterstockAPI();



        //new VideoTooltip();

    }



    new Filters();

    setTimeout(function() {



        fixButtons();

    }, 1000);

    $(window).on('resize', startFixButtons);



    $('#filter-option').on('click',  function(e) {

        e.preventDefault();

        $('#filters').slideToggle();

    })



    $('.menu-trigger').on('click', function(e) {

        e.preventDefault();



        $('#top-menu').slideToggle();

    })



    $( ".btn-mobile" ).on("click", function() {

      $( ".account " ).slideToggle();

    });



    $(document).on('click','.next-button', function(e) {

        e.preventDefault();

        location.replace($('.cur').next().attr('href'))

    })



    $(document).on('click', '.show-modal', function(e) {

        e.preventDefault();

        $($(this).data('target')).show();

    })



    $(document).on('click', '.modal-close', function(e) {

        e.preventDefault();

        $(this).closest('.modal').hide();

    })

    $.each($('#modal-register .social_connect_form img'), function() {

        var $this = $(this).parent();

        $this.addClass('icon');

        var title = $this.attr('title');

        $this.children().remove();

        $this.append('<div></div> Join using ' + title).addClass('icon-large');

    })

    setTimeout(function() {



        fixVideoRatio()

    }, 1000);



    $(window).on('resize', startFixVideoRatio);



})



// utility function to shuffle results from shutterstock

function shuffle(array) {

  var currentIndex = array.length, temporaryValue, randomIndex;



  // While there remain elements to shuffle...

  while (0 !== currentIndex) {



    // Pick a remaining element...

    randomIndex = Math.floor(Math.random() * currentIndex);

    currentIndex -= 1;



    // And swap it with the current element.

    temporaryValue = array[currentIndex];

    array[currentIndex] = array[randomIndex];

    array[randomIndex] = temporaryValue;

  }



  return array;

}



// Modal close on ESC



$(document).on( 'keydown', function ( e ) {

    if ( e.keyCode === 27 ) { // ESC

    $('.wrapper-social-modal ').hide().remove();



    }

});





$(document).ready(function(){

    $("#shutterstock-coupon .coupon .code").on("click", function(){

        text = $(this).text()

        copyToClipboard(text);



        $("#shutterstock-coupon .notification").fadeIn();

        setTimeout(function(){

            $("#shutterstock-coupon .notification").fadeOut();

        },2000)

    })


});




function copyToClipboard(text) {

    if (window.clipboardData && window.clipboardData.setData) {

        // IE specific code path to prevent textarea being shown while dialog is visible.

        return clipboardData.setData("Text", text);



    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {

        var textarea = document.createElement("textarea");

        textarea.textContent = text;

        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.

        document.body.appendChild(textarea);

        textarea.select();

        try {

            return document.execCommand("copy");  // Security exception may be thrown by some browsers.

        } catch (ex) {

            console.warn("Copy to clipboard failed.", ex);

            return false;

        } finally {

            document.body.removeChild(textarea);

        }

    }

}

$(document).on('mouseover',$(".video-thumb-inner .preview"), function(e) {

    if (e.target.className == "preview") {

        window.currentImgTitle = $(e.target).attr("title");

        $(e.target).attr("title", '');

    }

}).on('mouseout',$(".video-thumb-inner .preview") , function(e){

    if (e.target.className == "preview") {

        $(e.target).attr("title", window.currentImgTitle);

        window.currentImgTitle = '';

    }

})

$("[data-confirmation='true']").keyup(function(){
    if ($("[data-passwd='true']").val() != $("[data-confirmation='true']").val())
        $(".passConfirmation").css("display","inline-block");
    else
        $(".passConfirmation").css("display","none");
});



/////////Cookie functions

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

$(document).ready(function(){
    var showOverlays = getCookie('showOverlays');
    if(showOverlays == "" || showOverlays == 'true'){
        $('main').addClass('showOverlays');
    }else{
        $('main').removeClass('showOverlays');
    }
browserClass();
    // if($('.page-template-new_video_details').length > 0){
    //     console.log($._data($('.videoplayer').parent()[0], 'events'));
    //     // if(getCookie('newfeatureactive') == 'on'){

    //         $(".videowrapper").unbind('hover');
    //         $('.videoplayer').parent().unbind('click');
    //         $('.videoplayer').removeAttr('controls');
    //         $("#video-controls").removeClass('is-hidden');

    //         customControls();
    //     // }
    // }
})

var customControls = function(){

    // Video
    var video = document.getElementById("video");
    var videoOverlay = document.getElementById('video-overlay');

    // Buttons
    var playButton = document.getElementById("play-pause");
    var muteButton = document.getElementById("mute");
    var fullScreenButton = document.getElementById("full-screen");

    // Sliders
    var seekBar = document.getElementById("seek-bar");
    var volumeBar = document.getElementById("volume-bar");

    // initial volume before mute
    var initialVolume;

    var playPuaseVideo = function(){
        if (video.paused == true) {
            // Play the video
            video.play();

            // Update the button text to 'Pause'
            playButton.innerHTML = '<i class="fas fa-pause"></i>';
            videoOverlay.classList.add("playing-video");
        } else {
            // Pause the video
            video.pause();

            // Update the button text to 'Play'
            playButton.innerHTML = "<i class='fas fa-play'></i>";
            videoOverlay.classList.remove("playing-video");
        }
    };

    videoOverlay.addEventListener("click", playPuaseVideo);

    // Event listener for the play/pause button
    playButton.addEventListener("click", playPuaseVideo);


    // Event listener for the mute button
    muteButton.addEventListener("click", function() {

        if (video.muted == false) {
            initialVolume = volumeBar.value;
            volumeBar.value = 0;
            // Mute the video
            video.muted = true;

            // Update the button text
            muteButton.innerHTML = '<i class="fas fa-volume-off"></i>';
        } else {
            volumeBar.value = initialVolume;
            // Unmute the video
            video.muted = false;

            // Update the button text
            muteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    });


    // Event listener for the full-screen button
    fullScreenButton.addEventListener("click", function() {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen(); // Firefox
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen(); // Chrome and Safari
        }else if (video.msRequestFullscreen) {
            video.msRequestFullscreen(); // IE
        }
    });


    // Event listener for the seek bar
    seekBar.addEventListener("change", function() {
        // Calculate the new time
        var time = video.duration * (seekBar.value / 100);

        // Update the video time
        video.currentTime = time;
    });


    // Update the seek bar as the video plays
    video.addEventListener("timeupdate", function() {
        // Calculate the slider value
        var value = (100 / video.duration) * video.currentTime;

        // Update the slider value
        seekBar.value = value;
    });

    // Pause the video when the seek handle is being dragged
    seekBar.addEventListener("mousedown", function() {
        video.pause();
    });

    // Play the video when the seek handle is dropped
    seekBar.addEventListener("mouseup", function() {
        video.play();
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
    });

    // Event listener for the volume bar
    volumeBar.addEventListener("change", function() {
        // Update the video volume
        video.volume = volumeBar.value;
        if(volumeBar.value == 0){
            muteButton.innerHTML = '<i class="fas fa-volume-off"></i>';
        }else{
            muteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    });
}

var browserClass = function(){

    var browserClassName;
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    if((!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0){
        browserClassName = 'isOpera';
    }else if(typeof InstallTrigger !== 'undefined'){
        browserClassName = 'isFirefox'
    }else if(/constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification)){
        browserClassName = 'isSafari';
    }else if(/*@cc_on!@*/false || !!document.documentMode){
        browserClassName = 'isIE';
    }else if(!isIE && !!window.StyleMedia){
        browserClassName = 'isEdge';
    // }else if(!!window.chrome && !!window.chrome.webstore){
    }else{
        browserClassName = 'isChrome'
    };

    $('#custom-seekbar-container').addClass(browserClassName);
}

    var mq = window.matchMedia( "(min-width: 639px)" );

    $( window ).resize(function() {
      mq = window.matchMedia( "(min-width: 639px)" );
    });

    function boxAnimationSales() {
        if (mq.matches) {
            if($(this).hasClass('box_3')){
                $('#sales_page .main_banner .box.box_3').addClass( "box_3animate" );
                $( '#sales_page .main_banner .box.box_2' ).addClass( "box_2animate" );
            }else if($(this).hasClass('box_2')){
                $('#sales_page .main_banner .box.box_3').removeClass( "box_3animate" );
                $( '#sales_page .main_banner .box.box_2' ).removeClass( "box_2animate" );
            }
        }
    }

    $( "#sales_page:not(.new_design_sales_page):not(.new_design_sales_page_2) .main_banner .box" ).hover(boxAnimationSales);
