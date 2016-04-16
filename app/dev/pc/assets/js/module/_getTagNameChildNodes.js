function getTagNameChildNodes($target, $array, $tag) {
    var e = $target.childNodes;
    var i = -1;
    var j = 0;
    while (++i < e.length) {
        if (e[i].nodeType == 1) {
            if (e[i].nodeName.toLowerCase() == $tag) {
                $array[j] = e[i];
                j++;
            }
        }
    }
}
