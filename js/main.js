// Once the DOM is ready, display the company list
$(document).ready(function() {
    //views.load_companies();
    var attribute_mask = encode_attribute_input();
    var view_options = filter_exhibits(attribute_mask, DEFAULT_DAY_ID);
    view("display_companies_list", view_options);

    // attach events to buttons
    $("#search-button").click(function() {
        view('search_page', null);
    });
    $("#home-button").click(function() {
        view('display_companies_list', {
            day: DEFAULT_DAY_ID,
            company_ids: filter_by_day(DEFAULT_DAY_ID)
        });
    });
    $("#list-button").click(function() {
        view('display_companies_list', {
            day: DEFAULT_DAY_ID,
            company_ids: filter_by_day(DEFAULT_DAY_ID)
        });
    });
    $("#maps-button").click(function() {
        view('maps_page', null);
    });
    $("#info-button").click(function() {
        view('info_page', null);
    });
    $(".dropdown-menu > li > a").click(function() {
        view('switch_map', $(this).attr("value"));
    });    

    search_init();
});

window.addEventListener("load", function() {
    map.loadMaps();
});
