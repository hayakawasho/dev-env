function setIntervalEvent($target, $time) {
    let queue = null;
    let wait = $time;
    clearTimeout(queue);
    queue = setTimeout(() => {
        $target();
    }, wait);
}
