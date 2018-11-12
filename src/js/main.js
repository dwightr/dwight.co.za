// $(function () {
//     $('nav a').click(function () {
//         var $linkClicked = $(this).attr('href');
//         document.location.hash = $linkClicked;
//         var $pageRoot = $linkClicked.replace('#page', '');
//         if (!$(this).hasClass("active")) {
//             $("header nav a").removeClass("active");
//             $(this).addClass("active");
//             $.ajax({
//                 type: "POST",
//                 url: "load.php",
//                 data: 'page=' + $pageRoot,
//                 dataType: "html",
//                 success: function (msg) {
//                     if (parseInt(msg) != 0) {
//                         $('#main-content').html(msg);
//                         $('#main-content section').hide().fadeIn();
//                     }
//                 }
//             });
//         } else {
//             event.preventDefault();
//         }
//     });
// });

$(function () {
    var nav = $('nav');
    var navCloseHandler = (function(){
        
        return function(){
                nav.removeClass('open');
                // $('nav ul').fadeOut(180);
            }
    }());
    
    // Navigation functionality
    $('.menu').click(function () {
        $(this).toggleClass('open');
        $('html').toggleClass('locked');
        $('body').toggleClass('locked');
        if (nav.hasClass('open')) {
            navCloseHandler();
        } else {
            nav.addClass('open');
        }
        $(nav).on('transitionend', function () {
            if (nav.hasClass('open')) {
                // $('nav ul').fadeIn(200);
            } 
            // Decided to not wait for the transitionend event to fadeOut nav items
            // else {
            //     $('nav ul').fadeOut();
            // }
            return false;
        });
    });

    // if(window.width < 768){
    //     $('nav ul li a').on('click', function () {
    //         $(this).closest('ul').fadeOut();
    //         nav.removeClass('open');
    //     });
    // } 

    $('nav a').click(function(e){
        // link = $(this).attr('href');
        // $.ajax({
        //     url: link,
        // }).done(function(html){
        //     $('#page').empty().append(html);
        //     window.history.pushState('Data', 'Title', link);
        // }).fail(function(){
        //     console.log('error!!');
        // }).always(function(){
        //     console.log('complete!!');
        // });
        
        // e.preventDefault();
        // navCloseHandler();
        // return false;
    });

    $('.skillbar').each(function(){
		$(this).find('.skillbar-bar').animate({
			width:$(this).attr('data-percent')
		},6000);
    }); $('.skillbar').each(function () {
        $(this).find('.skillbar-bar').animate({
            width: $(this).attr('data-percent')
        }, 6000);
    });

    $(document).on("scroll", onScroll);

    //smoothscroll
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');

        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top + 2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });

});

var TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 100;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    // var css = document.createElement("style");
    // css.type = "text/css";
    // css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    // document.body.appendChild(css);
};

$(function () {
    // Get the form.
    var form = $('#ajax-contact');

    // Get the messages div.
    var formMessages = $('#form-messages');

    // Set up an event listener for the contact form.
    $(form).submit(function (event) {
        // Stop the browser from submitting the form.
        event.preventDefault();

        // Serialize the form data.
        var formData = $(form).serialize();

        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        }).done(function (response) {
            // Make sure that the formMessages div has the 'success' class.
            $(formMessages).removeClass('error');
            $(formMessages).addClass('success');

            // Set the message text.
            $(formMessages).text(response);

            // Clear the form.
            $('#name').val('');
            $('#email').val('');
            $('#subject').val('');
            $('#message').val('');
            }).fail(function (data) {
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass('success');
                $(formMessages).addClass('error');

                // Set the message text.
                if (data.responseText !== '') {
                    $(formMessages).text(data.responseText);
                } else {
                    $(formMessages).text('Oops! An error occured and your message could not be sent.');
                }
            });
    });

    // Smoothe scroll to section
    $(".nav-items li a").click(function () {
        var $anchor = $(this).attr('href');
        $('html').removeClass('locked');
        $('body').removeClass('locked');
        $('.menu').removeClass('open');
        $('nav').removeClass('open');
        $('html, body').animate({
            scrollTop: $($anchor).offset().top
        }, 600);
    });
});

function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $('.nav-items a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.nav-items a').removeClass("active");
            currLink.addClass("active");
        }
        else {
            currLink.removeClass("active");
        }
    });
}