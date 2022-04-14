function trie_croissant() {
    var $wrap = $('.outer');
    $wrap.find('.child').sort(function(a, b) {
        return + a.getAttribute('data-croissant') - +b.getAttribute('data-croissant');
    })
    .appendTo($wrap);
}

function trie_decroissant() {
    var $wrap = $('.outer');
    $wrap.find('.child').sort(function(a, b) {
        return + b.getAttribute('data-croissant') - + a.getAttribute('data-croissant');
    })
    .appendTo($wrap);
}

function trie_difficulte() {
    var $wrap = $('.outer');
    $wrap.find('.child').sort(function(a, b) {
        return + a.getAttribute('data-difficultelvl') - +b.getAttribute('data-difficultelvl');
    })
    .appendTo($wrap);
}
