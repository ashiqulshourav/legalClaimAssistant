$( document ).ready(function() {
    // active or hide dropdown
    const submitBtn = $('.form-step-btn button');
    const dropdown = $('.dropdown-text');
    
    dropdown.on('click', function() {
        $(this).parent().toggleClass('active');
    })

    // dropdown list click event
    $(document).on('click', '.dropdown ul li', function(){
        $(submitBtn).prop('disabled', false)
        $(this).parent().find('li').removeClass('selected');
        $(this).addClass('selected');
        $(this).parents('.dropdown').removeClass('active');
        $(this).parents('.dropdown').find('.dropdown-text').text($(this).text())
    })

    // submit btn click event
    submitBtn.on('click', function(e){
        e.preventDefault();

        setTimeout(() => {            
            activeNextStep();
            if(!$('.form-step.active:last').hasClass('personal-info')){
                $(submitBtn).prop('disabled', true)
            }
        }, 300)

    })

    // radio button click event
    $(document).on('click', '.form-step.active:last input[type="radio"]', function(){
        setTimeout(() => {
            activeNextStep();
        }, 300);
    })

    function activeNextStep(){
        const activeItem = $('.form-step.active:last');
        const nextItem = $(activeItem).next();

        const activeSteps = $('.steps .step.active:last');
        const nextSteps = $(activeSteps).next();

        activeSteps.removeClass('active').addClass('complete');
        nextSteps.addClass('active');

        nextItem.fadeIn().addClass('active');
        activeItem.hide().removeClass('active');

        if($(nextItem).hasClass('hasDropdown')){
            $(submitBtn).parent().addClass('active');
            $(submitBtn).prop('disabled', true)
        } else if($(nextItem).hasClass('personal-info')){
            $(submitBtn).text('Do I Qualify')
            $(submitBtn).prop('disabled', false);
        }
    }

    function validateName(name) {
        const regex = /^[A-Za-z\s\-]+$/;
        return regex.test(name);
    }

    function validateEmail(email) {
        const regex = /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        return regex.test(email);
    }

    function validatePhone(phone) {
        const regex = /^\+?[1-9]\d{1,14}$/;
        return regex.test(phone);
    }
});