$(document).ready(function(){
    // kill form action on pressing Enter
    $('#moin-long-searchform').submit(function(e){
        e.preventDefault();
        return false;
    });

    $(document).on("click", "#moin-long-searchform .button", (function(){
        $('.moin-search-query').change();
    }));

    $(document).on("click", "label", (function(){
        $('.moin-search-query').keyup();
    }));

    $(document).on("click", ".moin-search-option-bar", (function(){
        $('.moin-searchoptions').toggleClass('hidden');
    }));

    $('.moin-loginsettings').addClass('navbar-right');

    function ajaxify(query, allrevs, time_sorting, filetypes, is_ticket) {
        var wiki_root = $('#moin-wiki-root').val();
        $.ajax({
            type: "GET",
            url: wiki_root + "/+search",
            data: { q: query, history: allrevs, time_sorting: time_sorting, filetypes: filetypes, boolajax: true, is_ticket: is_ticket }
        }).done(function( html ) {
            $('#finalresults').html(html)
        });
    }

    $('.moin-search-query').keyup(function() {
        var allrev, time_sorting;
        var mtime = false;
        var filetypes= '';
        var is_ticket = '';
        if( $('input[name="meta_summary"]').length ){
            is_ticket = true;
        }
        allrev = $('[name="history"]:checked').val() === "all";
        time_sorting = $('[name="modified_time"]:checked').val();
        $('[name="itemtype"]:checked').each(function() {
            filetypes += $(this).val() + ',';
        });
        ajaxify($(this).val(), allrev, time_sorting, filetypes, is_ticket);
    });
});
