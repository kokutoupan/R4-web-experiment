const PATH = './src/';

let canvas = document.createElement('canvas');
canvas.id = 'canvas';
canvas.width = 1600;
canvas.height = 900;
document.body.appendChild(canvas);
const gl = canvas.getContext('webgl2');


const loadVertexShader = fetch(PATH + 'vertex_shader.glsl');
const loadFragmentShader = fetch(PATH + 'fragment_shader.glsl');

Promise.all([loadVertexShader, loadFragmentShader])
    .then((response) => Promise.all([response[0].text(), response[1].text()]))
    .then((shaderSources) => {
        const vertexShaderSource = shaderSources[0];
        const fragmentShaderSource = shaderSources[1];

        // バーテックスシェーダをコンパイルします。
        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vertexShaderSource);
        gl.compileShader(vertexShader);

        // コンパイル成功したか否かをチェックします。
        const vShaderCompileStatus = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS);
        if (!vShaderCompileStatus) {
            const info = gl.getShaderInfoLog(vertexShader);
            console.log(info);
        }

        // フラグメントシェーダについても同様にします。
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fragmentShaderSource);
        gl.compileShader(fragmentShader);

        const fShaderCompileStatus = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS);
        if (!fShaderCompileStatus) {
            const info = gl.getShaderInfoLog(fragmentShader);
            console.log(info);
        }

        // シェーダプログラムを作成します。
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        // リンクできたかどうかを確認します。
        const linkStatus = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!linkStatus) {
            const info = gl.getProgramInfoLog(program);
            console.log(info);
        }

        // プログラムを使用します。
        gl.useProgram(program);

        // データを転送するためのバッファを作成します。
        const vertexBuffer = gl.createBuffer();
        const colorBuffer = gl.createBuffer();

        // バーテックスシェーダのin変数の位置を取得します。
        const vertexAttribLocation = gl.getAttribLocation(program, 'vertexPosition');
        const colorAttribLocation = gl.getAttribLocation(program, 'color');

        const VERTEX_SIZE = 3; // vec3
        const COLOR_SIZE = 4; // vec4

        // バッファ操作前には必ずバインドします。
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        // in変数を有効化します
        gl.enableVertexAttribArray(vertexAttribLocation);
        // 現在バインドしているバッファと変数を結びつけます。
        // サイズはvec3を指定してるので3にします。型はFLOATを使用します。
        // うしろ3つの引数は今は気にしないでください。
        gl.vertexAttribPointer(vertexAttribLocation, VERTEX_SIZE, gl.FLOAT, false, 0, 0);

        // 頂点色についても同様にします。
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.enableVertexAttribArray(colorAttribLocation);
        gl.vertexAttribPointer(colorAttribLocation, COLOR_SIZE, gl.FLOAT, false, 0, 0);


        // 頂点情報。vec3で宣言しているので、xyzxyzxyz…と並べていきます。
        // WebGL2では基本的にfloat型を使うので、Float32Arrayを使用します。
        const vertices = new Float32Array([
            -0.5, 0.5, 0.0,
            -0.5, -0.5, 0.0,
            0.5, 0.5, 0.0,
            -0.5, -0.5, 0.0,
            0.5, -0.5, 0.0,
            0.5, 0.5, 0.0
        ]);

        // 色情報。vec4で宣言してるのでrgbargbargba…と並べていきます。
        // すべて0.0〜1.0の範囲で指定します。
        // 頂点と同じ数だけ（今回は6つ）必要です。
        const colors = new Float32Array([
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0
        ]);

        // バインドしてデータを転送します。
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

        // 四角形を描画します。
        const VERTEX_NUMS = 6;
        gl.drawArrays(gl.TRIANGLES, 0, VERTEX_NUMS);

        // WebGLに描画を促します。
        gl.flush();
    });

(function () {
    var styles = canvas.getAttribute("style") || "";
    // var context = canvas.getContext("2d");

    // // canvasが見えるように、色を付けます
    // context.fillStyle = "rgba(0,0,16, 0.66)";
    // context.fillRect(0, 0, canvas.width, canvas.height);

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
})()