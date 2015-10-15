$(document).ready(function () {
  $('.registration-tabs').each(function(index) {
    $(this).children('div').first().children('a').addClass('is-active').next().addClass('is-open').show();
  });
  $('.registration-tabs').on('click', 'div > a.tab-link', function(event) {
    if (!$(this).hasClass('is-active')) {
      event.preventDefault();
      var registrationTabs = $(this).closest('.registration-tabs');
      registrationTabs.find('.is-open').removeClass('is-open').hide();

      $(this).next().toggleClass('is-open').toggle();
      registrationTabs.find('.is-active').removeClass('is-active');
      $(this).addClass('is-active');
    } else {
      event.preventDefault();
    }
  });
});
