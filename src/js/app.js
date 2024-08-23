$( document ).ready(function() {
    // active or hide dropdown
    const submitBtn = $('.form-step-btn button');
    const dropdown = $('.dropdown-text');
    const form = $('.main-form');
    
    dropdown.on('click', function() {
        $(this).parent().toggleClass('active');
    })

    // dropdown list click event
    $(document).on('click', '.dropdown ul li', function(){
        $(submitBtn).prop('disabled', false)
        $(this).parent().find('li').removeClass('selected');
        $(this).addClass('selected');
        $(this).parents('.dropdown').removeClass('active');
        $(this).parents('.dropdown').find('.dropdown-text').text($(this).text());
        $(this).parents('.dropdown').find('input[type="hidden"]').val($(this).text());
    })

    // submit btn click event
    submitBtn.on('click', function(e){
        e.preventDefault();

        if($(e.target).is('button[type="submit"]')){
            if(validateForm()){
                var formData = $(form).serializeArray();
                var dataObject = {};
                
                $.each(formData, function() {
                    dataObject[this.name] = this.value;
                });

                $.ajax({
                    url: 'https://httpbin.org/post',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(dataObject),
                    success: function(response) {
                        console.log('Success:', response);
                        if(response){
                            $('.steps').fadeOut();
                            $('.form-step').fadeOut();
                            $('.form-step-btn').fadeOut();
                            $('.terms-condition').fadeOut();
                            $('.success-text').fadeIn().addClass('active');
                        }
                    },
                    error: function(xhr, status, error) {
                        console.error('Error:', status, error);
                    },
                    complete: function(xhr, status) {
                        console.log('Request complete:', status);
                    }
                });
            };
        }

        setTimeout(() => {            
            activeNextStep();
            if(!$('.form-step.active:last').hasClass('personal-info')){
                $(submitBtn).prop('disabled', true)
            } else if ($('.form-step.active:last').hasClass('personal-info')){
                $(submitBtn).attr('type', 'submit');                
                $('.terms-condition').show();
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

        if(!$(activeItem).hasClass('personal-info')){
            activeSteps.removeClass('active').addClass('complete');
            nextSteps.addClass('active');
            
            nextItem.fadeIn().addClass('active');
            activeItem.hide().removeClass('active');
        }

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

    function validateFirstName(){
        let isValid = true;
        const firstName = $('#firstName').val().trim();
        if (!firstName) {
            $('#firstNameError').text('First name is required.');
            $('#firstNameError').addClass('active');
            $('#firstName').addClass('not-valid');
            isValid = false;
        } else if (!validateName(firstName)) {
            $('#firstNameError').text('First name can only contain letters, spaces, and hyphens.');
            $('#firstNameError').addClass('active');
            $('#firstName').addClass('not-valid');
            isValid = false;
        } else {
            $('#firstNameError').text('');
            $('#firstNameError').removeClass('active');
            $('#firstName').removeClass('not-valid');
        }
        return isValid;
    }

    function validateLastName(){
        let isValid = true;
        const lastName = $('#lastName').val().trim();
        if (!lastName) {
            $('#lastNameError').text('First name is required.');
            $('#lastNameError').addClass('active');
            $('#lastName').addClass('not-valid');
            isValid = false;
        } else if (!validateName(lastName)) {
            $('#lastNameError').text('First name can only contain letters, spaces, and hyphens.');
            $('#lastNameError').addClass('active');
            $('#lastName').addClass('not-valid');
            isValid = false;
        } else {
            $('#lastNameError').text('');
            $('#lastNameError').removeClass('active');
            $('#lastName').removeClass('not-valid');
        }
        return isValid;
    }

    function validateEmailAddress(){
        let isValid = true;
        const email = $('#email').val().trim();
        if (!email) {
            $('#emailError').text('Email is required.');
            $('#emailError').addClass('active');
            $('#email').addClass('not-valid');
            isValid = false;
        } else if (!validateEmail(email)) {
            $('#emailError').text('Invalid email address.');
            $('#emailError').addClass('active');
            $('#email').addClass('not-valid');
            isValid = false;
        } else {
            $('#emailError').text('');
            $('#emailError').removeClass('active');
            $('#email').removeClass('not-valid');
        }
        return isValid;
    }

    function validatePhoneNumber() {
        let isValid = true;
        const phone = $('#tel').val().trim();
        if (!phone) {
            $('#phoneError').text('Phone number is required.');
            $('#phoneError').addClass('active');
            $('#tel').addClass('not-valid');
            isValid = false;
        } else if (!validatePhone(phone)) {
            $('#phoneError').text('Invalid phone number. Use international format.');
            $('#phoneError').addClass('active');
            $('#tel').addClass('not-valid');
            isValid = false;
        } else {
            $('#phoneError').text('');
            $('#phoneError').removeClass('active');
            $('#tel').removeClass('not-valid');
        }
        return isValid;
    }

    $('#firstName, #lastName, #email, #tel').on('focus', function(e) {
        if($(e.target).hasClass('not-valid')){
            $(e.target).removeClass('not-valid')
            $(e.target).next().removeClass('active')
        }
    });

    $('#firstName').on('blur', function(e) {
        validateFirstName()
    });

    $('#lastName').on('blur', function(e) {
        validateLastName()
    });

    $('#email').on('blur', function(e) {
        validateEmailAddress()
    });

    $('#tel').on('blur', function(e) {
        validatePhoneNumber()
    });

    function validateForm(){
       let isValid = true;

       if(!validateFirstName() ||  !validateLastName() || !validateEmailAddress() || !validatePhoneNumber()){
            isValid = false
       }

       return isValid;
    }
});