$(document).foundation();

$(document).ready(function () {

    $('.basket__form, .basket__thanks').hide(); // ЧАСТИ ФОРМЫ КОТОРЫЕ БУДУТ ПОЯВЛЯТСЯ ПОЭТАПНО


    $(window).scroll(function() {
        // $('.basket-closed-scrolls').css('top', $(this).scrollTop() + "px");
        $('.basket-closed-scrolls').css("top", Math.max(0, (($(window).height() - $('.basket-closed-scrolls').outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
        
    });
    
        
    

    // function incrementValue()
    // {
    //     var value = parseInt(document.getElementByClass('number').value, 10);
    //     value = isNaN(value) ? 0 : value;
    //     value++;
    //     document.getElementByClass('number').value = value;
    // }

    $('.basket__close, .offer__desk-btn').click(function (e) {
        $('#basket').toggleClass('basket__iSopen');
        if($(window).innerWidth() < 768) {
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
            // errorElement: "div",
            highlight: function(element, errorClass) {
                $(element)
                .closest('input')
                .addClass('has-error');
            },

            unhighlight: function(element, errorClass) {
                $(element)
                .closest('input')
                .removeClass('has-error');
            },

            // errorPlacement: function(error, element) {
            //     error.insertBefore(element);
            // },

            submitHandler: function() {
                $('.basket__thanks').show();
                ga('send', 'event', 'knopka','lead');
                // window.yaCounter40746319.reachGoal('lead');
                var that = this;
                setTimeout(function() {
                    console.log(that.currentForm);
                    $(that.currentForm)[0].submit();
                }, 700);
            }
        });

});
