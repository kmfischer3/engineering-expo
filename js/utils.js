var utils = {};

/*
 * Add the filters string to the header view, but only
 *   if filters (excluding day) have been selected.
 */
utils.display_filter_string = function(element) {
    var filter_string = get_filter_string();
    if ( filter_string != null ) {
        element.html("<small>Filters: " + filter_string + "</small>").show();
    } else {
        element.hide();
    }
};

utils.sort_companies = function(a, b) {
    if (data[a].name < data[b].name)
        return -1;
    else if (data[a].name > data[b].name)
        return 1;
    else
        return 0;
};

function get_day_string(day) {

    if ( day == 0 )
        return "Monday, Sept. 19";
    if ( day == 1 )
        return "Wednesday, Sept. 21";
    if ( day == 2 )
        return "Wednesday, Sept. 28";

    return "No Map Data";
}

function get_map_string(map) {

    if ( map == 0 )
        return "Engineering Campus / Outdoor Map";
    if ( map == 1 )
        return "Engineering Hall (EH) 1st Floor";
    if ( map == 2 )
        return "Engineering Hall (EH) 2nd Floor";
    if ( map == 3 )
        return "Mechanical Engineering (ME) 1st Floor"; 
    if ( map == 4 )
        return "Mechanical Engineering (ME) 2st Floor";
    if ( map == 5 )
        return "Engineering Centers Building (ECB) 1st Floor";           

    return "No Map Data";
}

function get_filter_string() {

	// loop through form elements, if element is checked, add it to the return string
	var filters = document.getElementById("filter");
    var ret_array = [];

    ATTRIBUTES.forEach(function(attribute) {
        var attribute_index = ATTRIBUTE_INDEXES[attribute];
        if (filters.elements[attribute + '_input'].checked) {
            ret_array.push(ATTRIBUTE_STRINGS[attribute]);
        }
    });

    console.log(ret_array);

    if (ret_array.length != 0)
        return ret_array.join(", ");

    // return null if no filters selected.
    return null;

}
