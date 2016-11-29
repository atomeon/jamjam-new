$(document).foundation();

$(document).ready(function () {

    $('.basket__form, .basket__thanks').hide(); // ЧАСТИ ФОРМЫ КОТОРЫЕ БУДУТ ПОЯВЛЯТСЯ ПОЭТАПНО

    $('#offerStepOne').click(function (e) { 
        $('.basket__table').hide();
        $('.basket__form').show();
    });

    // $('#offerStepTwo').click(function (e) { 
    //     $('.basket__form').hide();
    //     $('.basket__thanks').show();

    //     var that = this;
    //     setTimeout(function() {
    //         console.log(that.currentForm);
    //         $(that.currentForm)[0].submit();
    //     }, 700);
    // });

    $(window).scroll(function () {
        $('.basket-closed-scrolls').css("top", Math.max(0, (($(window).height() - $('.basket-closed-scrolls').outerHeight()) / 2) +
            $(window).scrollTop()) + "px");

    });

    $('.basket__close, .offer__desk-btn').click(function (e) {
        $('#basket').removeClass('opacity-zero');
        $('#basket').toggleClass('basket__iSopen');
        if ($(window).innerWidth() < 768) {
            $('#basket').toggleClass('basket-closed-scrolls');
        }
    });

    // ************************ FORM VALIDATION *******************************

    $('#basketForm').validate({

        errorClass: 'error-mess',
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            phone: {
                required: true,
                minlength: 7
            }
        },
        messages: {
            name: {
                required: "Пожалуйста, заполните это поле",
                minlength: jQuery.validator.format("Минимальная длина имени {0} буквы!")
            },
            phone: {
                required: "Введите номер",
                minlength: jQuery.validator.format("Минимальная длина номера {0} цифр!")
            }
        },
        highlight: function (element, errorClass) {
            $(element)
                .closest('input')
                .addClass('has-error');
        },

        unhighlight: function (element, errorClass) {
            $(element)
                .closest('input')
                .removeClass('has-error');
        },

        submitHandler: function () {
            $('.basket__form').hide();
            $('.basket__thanks').show();

            // ga('send', 'event', 'knopka', 'lead');
            var that = this;
            console.log('ASDASDASDASDSDS');
            setTimeout(function () {
                console.log(that.currentForm);
                $(that.currentForm)[0].submit();
            }, 1500);
        }
    });
});
