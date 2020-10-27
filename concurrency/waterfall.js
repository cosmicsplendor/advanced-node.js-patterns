const waterfall = (tasks, ...initalArgs) => cb => {
    function iterate(index, ...args) {
        tasks[index](...args, (error, result) => {
            if (error) {
                return cb(error)
            }
            if (index === 0) {
                return cb(null, result)
            }
            iterate(index - 1, result)
        })
    }
    iterate(tasks.length - 1, ...initalArgs)
}