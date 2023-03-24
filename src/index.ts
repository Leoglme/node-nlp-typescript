class Point {
    x = 0
    y = 0

    move(x: number, y: number){
        this.x += x
        this.y += y
        return this
    }
}
