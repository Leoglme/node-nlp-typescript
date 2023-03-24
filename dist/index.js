"use strict";
class Point {
    x = 0;
    y = 0;
    move(x, y) {
        this.x += x;
        this.y += y;
        return this;
    }
}
