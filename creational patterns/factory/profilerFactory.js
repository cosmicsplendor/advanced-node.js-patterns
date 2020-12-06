class Profiler {
    constructor (label) {
      this.label = label
      this.lastTime = null
    }
    start () {
      this.lastTime = process.hrtime()
    }
    end () {
      const [secs, nsecs] = process.hrtime(this.lastTime)
      console.log(`Timer "${this.label}" took ${secs} seconds ` +
        `and ${nsecs} nanoseconds.`)
    }
}
const mockProfiler = {
    start () {},
    end () {}
}

module.exports = (label) => {
    if (process.env.NODE_ENV === 'development') {
        return mockProfiler
    }
    return new Profiler(label)
}