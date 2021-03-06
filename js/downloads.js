$(function() {
  setTimeout(function() {
    $.ajax({
      url      : document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent('http://ci.chrisgward.com/job/Glowstone/rssAll'),
      dataType : 'json',
      success  : function (data) {
        if (data.responseData != null && data.responseData.feed && data.responseData.feed.entries) {
          rows = '';
          $.each(data.responseData.feed.entries, function (i, e) {
            clazz = ((new RegExp('broken')).test(e.title)) ? 'danger' : 'success';
            element = '<tr>';
            element += '<td>';
            element += e.title;
            element += '</td>';
            element += '<td>';
            element += e.publishedDate;
            element += '</td>';
            element += '<td class="text-center">';
            element += '<a class="text-' + clazz + '" style="text-decoration: none;" href="' + e.link + '" target="_blank"><i class="fa fa-search fa-2x"></i></a>';
            element += '</td>';
            if (clazz != 'danger') {
              element += '<td class="text-center">';
              element += '<a class="text-' + clazz + '" style="text-decoration: none;" href="' + e.link + 'artifact/build/libs/glowstone.jar"><i class="fa fa-download fa-2x"></i></a>';
              element += '</td>';
            } else {
              element += '<td class="text-center">';
              element += '<a class="text-' + clazz + '" style="text-decoration: none;" href="#"><i class="fa fa-ban fa-2x"></i></a>';
              element += '</td>';
            }
            element += '</tr>';
            rows += element;
          });
          $('#loading').hide();
          $('#more-downloads').before(rows);
        } else {
          $('#loading').hide();
          $('#builds').hide();
          $('#error').show();
        }
      },
      error: function() {
        $('#loading').hide();
        $('#builds').hide();
        $('#error').show();
      }
    });
  }, 500);
})
