$( document ).ready(function() {
    // active or hide dropdown
    const dropdown = $('.dropdown-text');
    
    dropdown.on('click', function() {
        $(this).parent().toggleClass('active');
    })
});