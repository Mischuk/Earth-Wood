// Маска для телефона
$("[name=tel]").mask("+7 999 999 99 99");

$('[name="hours"], [name="minutes"]').keydown(function (e) {
  // Allow: backspace, delete, tab, escape, enter and .
  if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
       // Allow: Ctrl+A, Command+A
      (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
       // Allow: home, end, left, right, down, up
      (e.keyCode >= 35 && e.keyCode <= 40)) {
           // let it happen, don't do anything
           return;
  }
  // Ensure that it is a number and stop the keypress
  if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
  }
});


$('[name="hours"]').on('keyup', function(){
  if ( $(this).val() > 23 ) {
    $(this).val(23);
  }
});
$('[name="minutes"]').on('keyup', function(){
  if ( $(this).val() > 59 ) {
    $(this).val(59);
  }
});

// Обработка форма на AJAX
$.validator.addMethod("minlenghtphone", function (value, element) {
    return value.replace(/\D+/g, '').length > 10;
}, "Введите полный номер.");
$.validator.addMethod("requiredphone", function (value, element) {
    return value.replace(/\D+/g, '').length > 1;
}, "Это поле необходимо заполнить.");

$("form").each(function(){
  $(this).validate({
    rules: {
      name: { required: true, },
      tel: {
          requiredphone: true,
          minlenghtphone: true
      }
    },
    submitHandler: function(form, event){
      event = event || window.event;
      $(form).ajaxSubmit({
        error: function(){
          $('.form-input').val('');
          $('#success').trigger('click');
        },
        success: function(responseText, statusText, xhr){
          $('.form-input').val('');
          $('#success').trigger('click');
          // Появление "спасибо"
          //setTimeout(function(){ }, 5 * 1000)
        }
      });
      return false;
    }
  });
});
