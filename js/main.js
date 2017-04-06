// Once the DOM is ready, display the company list
$(document).ready(function() {
    //views.load_companies();
    var attribute_mask = encode_attribute_input();
    var view_options = filter_exhibits(attribute_mask, DEFAULT_DAY_ID, true);
    view_options.home = true;
    view("display_companies_list", view_options);

    // attach events to buttons
    $("#search-button").click(function() {
        view('search_page', null);
    });
    $("#home-button").click(function(e) {
        view('display_companies_list', {
            day: DEFAULT_DAY_ID,
            company_ids: filter_by_day(DEFAULT_DAY_ID)
        });
        e.preventDefault();
    });
    $("#list-button").click(function(e) {
        view('display_companies_list', {
            day: DEFAULT_DAY_ID,
            company_ids: filter_by_day(DEFAULT_DAY_ID)
        });
        e.preventDefault();
    });
    $("#maps-button").click(function(e) {
        clear_badges(); // this is the only view change that requires a badge reset
        view('maps_page', null);
        e.preventDefault();
    });
    $("#info-button").click(function(e) {
        view('info_page', null);
        e.preventDefault();
    });  

    fill_maps_dropdown();
    $(".dropdown-menu > li > a").click(function(e) {
        view('switch_map', $(this).attr("value"));
        e.preventDefault();
    });      

    search_init();
});

window.addEventListener("load", function() {
    map.loadMaps();
});
