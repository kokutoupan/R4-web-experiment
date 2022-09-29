document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById("canvas");
    var styles = canvas.getAttribute("style") || "";
    var context = canvas.getContext("2d");

    // canvasが見えるように、色を付けます
    context.fillStyle = "rgba(0,0,16, 0.66)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var onResize = (canvas) => {
        var scale = Math.min(
            window.innerWidth / canvas.width,
            window.innerHeight / canvas.height
        );

        var transform = "scale(" + scale + "," + scale + ");";

        canvas.setAttribute(
            "style",
            styles +
            "    -moz-transform: " +
            transform +
            "     -ms-transform: " +
            transform +
            "      -o-transform: " +
            transform +
            "         transform: " +
            transform +
            " -webkit-transform-origin: center center;" +
            "    -moz-transform-origin: center center;" +
            "     -ms-transform-origin: center center;" +
            "      -o-transform-origin: center center;" +
            "         transform-origin: center center;"
        );
    };

    onResize(canvas);
    window.addEventListener("resize", () => onResize(canvas), false);
});