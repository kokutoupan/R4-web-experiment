class MyVec2 {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
    }

    add(_pos) {
        this.x += _pos.x;
        this.y += _pos.y;

        return this;
    }
}

class Othello {
    constructor() {
        this.lineNum = Math.sqrt(this.stones.length);
    }

    stones = [//1黒,2白
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 2, 0, 0, 0,
        0, 0, 0, 2, 1, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0
    ]

    nowSquare = new MyVec2(3, 3);
    turn = 1;

    #isOver(pos) {
        //console.log(pos);
        if (pos.x < 0) {
            return true;
        }
        if (pos.y < 0) {
            return true;
        }
        if (pos.x >= this.lineNum) {
            return true;

        }
        if (pos.y >= this.lineNum) {
            return true;
        }

        return false;
    }

    getStone(pos) {
        return this.stones[this.lineNum * pos.y + pos.x];
    }

    getReverseStone(stone) {
        if (stone === 1) {
            return 2;
        }
        else if (stone === 2) {
            return 1;
        }
        else {
            return -1;
        }
    }

    setStone(pos, type) {
        this.stones[this.lineNum * pos.y + pos.x] = type;
    }

    selectSquare(keyCode) {
        let tmp = new MyVec2(this.nowSquare.x, this.nowSquare.y);
        if (keyCode === 'KeyA') {
            tmp.x--;
        }
        if (keyCode === 'KeyD') {
            tmp.x++;
        }
        if (keyCode === 'KeyW') {
            tmp.y--;
        }
        if (keyCode === 'KeyS') {
            tmp.y++;
        }

        // if (this.nowSquare.x < 0) {
        //     this.nowSquare.x = 0;
        // }
        // else if (this.nowSquare.x >= this.lineNum) {
        //     this.nowSquare.x = this.lineNum - 1;
        // }
        // else if (this.nowSquare.y < 0) {
        //     this.nowSquare.y = 0;
        // }
        // else if (this.nowSquare.y >= this.lineNum) {
        //     this.nowSquare.y = this.lineNum - 1;
        // }
        if (!this.#isOver(tmp)) {
            this.nowSquare = tmp;
        }

        if (keyCode === 'Enter') {
            if (this.getStone(this.nowSquare) === 0) {
                const OverTurnData = this.checkOverTurn(this.nowSquare, this.turn);
                console.log(OverTurnData);
                if (OverTurnData.num != 0) {
                    this.setStone(this.nowSquare, this.turn);
                    this.#changeStones(OverTurnData.lineStones, this.nowSquare, this.turn);
                    this.#changeTurn();
                }

            }
        }

        console.log(this.nowSquare);
    }

    rotation = 0;
    drawStone(modelLocation, indexSize, deltaTime) {
        let modelMat = mat4.create();
        let distance = 45;
        let offset = [distance * (this.lineNum - 1) / 2, distance * (this.lineNum - 1) / 2];

        // let black = mat4.create();
        // black = mat4.fromXRotation(black,Math.PI);
        // mat4.translate(black,black,[100,100,100]);
        // console.log(black);


        this.stones.forEach((data, index) => {
            let up = 0;
            if (this.nowSquare.x === index % this.lineNum && this.nowSquare.y === Math.floor(index / this.lineNum)) {
                up = 10;
                const isBlack = this.turn === 1 ? 1 : 0;
                if (data === 0) {
                    mat4.fromRotationTranslation(modelMat, [isBlack, 0, 0, 0],
                        [distance * (index % this.lineNum) - offset[0], up, distance * Math.floor(index / this.lineNum) - offset[1]]);
                    gl.uniformMatrix4fv(modelLocation, false, modelMat);

                    gl.drawElements(gl.TRIANGLES, indexSize, gl.UNSIGNED_SHORT, 0);
                }
            }

            if (data === 1) {
                //console.log(index, '黒');
                // console.log(lineNum);
                //console.log(black);
                //mat4.fromXRotation(black, Math.PI);

                //  mat4.fromTranslation(modelMat, [distance * (index % lineNum), 0, distance * Math.floor(index / lineNum)])
                mat4.fromRotationTranslation(modelMat, [1, 0, 0, 0],
                    [distance * (index % this.lineNum) - offset[0], up, distance * Math.floor(index / this.lineNum) - offset[1]]);
                gl.uniformMatrix4fv(modelLocation, false, modelMat);

                gl.drawElements(gl.TRIANGLES, indexSize, gl.UNSIGNED_SHORT, 0);
            }
            else if (data === 2) {
                //console.log(index, '白');
                mat4.fromRotationTranslation(modelMat, [0, 0, 0, 0],
                    [distance * (index % this.lineNum) - offset[0], up, distance * Math.floor(index / this.lineNum) - offset[1]]);
                gl.uniformMatrix4fv(modelLocation, false, modelMat);

                gl.drawElements(gl.TRIANGLES, indexSize, gl.UNSIGNED_SHORT, 0);
            }
            else if (data === 3) {
                this.rotation += 0.8 * Math.PI / 180 * deltaTime;
                mat4.fromTranslation(modelMat, [distance * (index % this.lineNum) - offset[0], 0, distance * Math.floor(index / this.lineNum) - offset[1]]);
                mat4.rotateX(modelMat, modelMat, this.rotation);
                //console.log(rotation);
                gl.uniformMatrix4fv(modelLocation, false, modelMat);

                gl.drawElements(gl.TRIANGLES, indexSize, gl.UNSIGNED_SHORT, 0);
            }
        })
        // mat4.fromTranslation(modelMat, [50, 0, 0])
        // gl.uniformMatrix4fv(modelLocation, false, modelMat);
        // gl.drawElements(gl.TRIANGLES, indexSize, gl.UNSIGNED_SHORT, 0);
    }

    #changeTurn() {
        if (this.turn === 1) {
            this.turn = 2;
        }
        else {
            this.turn = 1;
        }

        let total = 0;
        for (let x = 0; x < this.lineNum; x++) {
            for (let y = 0; y < this.lineNum; y++) {
                if (this.getStone(new MyVec2(x, y)) === 0) {
                    const OverTurnData = this.checkOverTurn(new MyVec2(x, y), this.turn);
                    total += OverTurnData.num;
                    if (total > 0) {
                        console.log(total, OverTurnData);
                        return;
                    }
                }
            }
        }
        this.#changeTurn();
    }

    #changeStones(lineStones, startPos, mStone) {
        lineStones.forEach((([direction, num]) => {
            for (let i = 0; i < num; i++) {
                let tmp = new MyVec2(startPos.x + direction.x * (i + 1), startPos.y + direction.y * (i + 1));
                this.setStone(tmp, mStone);
            }
        }));
    }

    checkOverTurn(startPos, mStone) {
        let total = 0;

        const allDirection = [
            new MyVec2(-1, 0), new MyVec2(-1, 1),
            new MyVec2(0, 1), new MyVec2(1, 1),
            new MyVec2(1, 0), new MyVec2(1, -1),
            new MyVec2(0, -1), new MyVec2(-1, -1)
        ]

        let lineStones = new Array();

        allDirection.forEach((direction) => {
            let num = 0;
            let flag = false;

            for (let pos = new MyVec2(startPos.x + direction.x, startPos.y + direction.y); !(this.#isOver(pos)); pos.add(direction)) {

                let tmp = this.getStone(pos);

                if (this.getReverseStone(tmp) === mStone) {
                    num++;
                }
                else if (tmp === mStone) {
                    console.log('b');
                    flag = true;
                    break;
                }
                else {
                    break;
                }
                console.log(pos);
            }

            total += flag ? num : 0;

            lineStones.push([direction, flag ? num : 0]);
            console.log(num, flag, direction);

            // if (flag && num) {
            //     for (let i = 0; i < num; i++) {
            //         let tmp = new MyVec2(startPos.x + direction.x * (i + 1), startPos.y + direction.y * (i + 1));
            //         this.setStone(tmp, mStone);
            //     }
            // }
        });

        return { num: total, lineStones: lineStones };
    }


    createStone() {
        var vertex = new Array(), idx = new Array();
        const row = 254;
        const column = 254;
        const rad = 20.0;
        const heightRad = 5;


        for (let i = 0; i <= row; i++) {
            let r = Math.PI / row * i;
            let ry = Math.cos(r);
            //let rr = Math.sin(r);
            let rr = 1 - ((i - row / 2) / (row / 2)) ** 6;
            //console.log(rr);
            let color;
            if (i < row / 2) {
                color = [1, 1, 1, 1];
            }
            else {
                color = [0, 0, 0, 1];
            }
            for (let ii = 0; ii <= column; ii++) {
                let tr = Math.PI * 2 / column * ii;

                let nx = rr * Math.cos(tr);
                let ny = ry;
                let nz = rr * Math.sin(tr);

                let tx = nx * rad;
                let ty = ny * heightRad;
                let tz = nz * rad;

                //console.log(ty);
                vertex.push(tx, ty, tz);
                vertex.push(color[0], color[1], color[2], color[3]);
            }
        }
        let r = 0;
        for (let i = 0; i < row; i++) {
            for (let ii = 0; ii < column; ii++) {
                r = (column + 1) * i + ii;
                idx.push(r, r + 1, r + column + 2);
                idx.push(r, r + column + 2, r + column + 1);
            }
        }
        let vf = Float32Array.from(vertex);
        let idxf = Uint16Array.from(idx);
        return { v: vf, i: idxf };
    }
}