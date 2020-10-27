const {EventEmitter} = require("events")
class TaskQueue extends EventEmitter {
    constructor(concurrency) {
        super()
        this.concurrency = concurrency
        this.running = 0
        this.queue = []
    }
    add(task) {
        this.queue.push(task)
        process.nextTick(this.next.bind(this))
    }
    next() {
        if (this.running === 0 && this.queue.length < 1) {
            return this.emit("empty")
        }
        while (this.running < this.concurrency && this.queue.length > 0) {
            const task = this.queue.shift()
            task(error => {
                if (error) {
                    this.emit("error", error)
                }
                this.running--
                process.nextTick(this.next.bind(this))
            })
            this.running++
        }
    }
}
module.exports = TaskQueue