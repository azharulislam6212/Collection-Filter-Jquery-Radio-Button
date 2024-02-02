// ---------------- Filter
var my_filter = {};
var s_filter_val = {};
var filter_path = '';
var sort_value = $('.select__select').val();


$('.filters__input').change(function () {
  var filter_path = window.location.pathname;
  var s_filter = "";
  var filter_count = 0;
  sort_value = $('.select__select').val();
  $('.filters__input:checked').each(function (index) {
    my_filter[index] = $(this).attr('name');
    s_filter_val[index] = $(this).val();
    s_filter += '&' + my_filter[index] + '=' + s_filter_val[index];
    filter_count ++;
  });
  
  if($('.filters__input_price:checked').length >= 2){
    filter_count --;
  }

  filter_path = filter_path + "?" + s_filter + "&sort_by=" + sort_value;
  
  fetch(filter_path + "&section_id=collection-grid")
      .then((response) => response.text())
      .then((collectionData) => {
        var collection_html = $(collectionData);
        var collection_items = $(".shop-products", collection_html);
        $(".shop-products").replaceWith(collection_items);
      });

      if(filter_count >= 1){
        $('.filter-count').text('('+filter_count+')');
      }else{
        $('.filter-count').text('');
      }

  console.log(filter_path);
});

$('.shop__filter-reset, .shop__filter-clear').click(function(){
  var filter_path = window.location.pathname;
  fetch(filter_path + "?section_id=collection-grid")
      .then((response) => response.text())
      .then((collectionData) => {
        var collection_html = $(collectionData);
        var collection_items = $(".shop-products", collection_html);
        $(".shop-products").replaceWith(collection_items);
      });
      $('.filter-count').text('');
      $('.filters__input:checked').prop("checked", false);
});

$('.filter-label_price').click(function(){
  $('.filters__input_price').prop("checked", false);
  $(this).parent().find('input').prop("checked", true).trigger('change');
});

$('.shop-filter-trigger').click(function(){
  $('body').addClass('show-filter')
  windowHeight = window.innerHeight + 'px';
  var filter_height = window.innerHeight - 60 + 'px';
  $('.shop__left').css('height', filter_height);
});
$('.btn_filter-apply, .shop__filter-close').click(function(){
  $('body').removeClass('show-filter')
});

// --------------- end of filter
