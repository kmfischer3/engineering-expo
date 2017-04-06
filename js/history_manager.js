/*
 * Change the view. This function will also add data to the browser's
 * history stack allowing the back button to function.
 */
function view(view_name, data) {
    history_state = {view: view_name, data: data};
    history.pushState(history_state, "");
    console.log("Pushing history state:", history_state);

    $('#navbar-collapse-1').collapse('hide');
    views[view_name](data);
    $('#sidebar').addClass('sidebar-hidden');
    $(window).scrollTop(0);
}

/*
 * Register a function to handle the history popstate event, which
 * is triggered when the back button is pressed.
 */
window.addEventListener("popstate", function(event) {
    console.log("Popping history state:", event);
    if (event.state === null) {
        return;
    }
    views[event.state.view](event.state.data);
});

/*
 * Set the initial view to be the company display.
 */
window.addEventListener("load", function() {
    var view_options = {
      day: DEFAULT_DAY_ID,
      company_ids: filter_by_day(DEFAULT_DAY_ID)
    };
    history_state = {view: "display_companies_list", data: view_options};
    history.replaceState(history_state, "");
});
