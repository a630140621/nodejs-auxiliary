// jobs 为一组返回值为 promise 的函数，其中有些执行非常慢
const jobs = [1, 2, 3, 4, 5, 6, 7].map(item => {
    return function () {
        return new Promise(resolve => {
            if (item !== 3 || item !== 5) {
                setTimeout(() => {
                    console.log(item);
                    resolve(item);
                }, 1000);
            } else {
                setTimeout(() => {
                    console.log(item);
                    resolve(item);
                }, 3000);
            }
        });
    };
});

function run(jobs, limit) {
    if (limit == 0) throw `limit must large than zero`;
    if (jobs.length === 0) return [];
    return new Promise((resolve, reject) => {
        let running = limit;
        let res = new Array(jobs.length);
    
        function* nextJob() {
            let i = limit;
            while (i < jobs.length) {
                yield [i, jobs[i]];
                i += 1;
            }
        }
    
        function resolveOne(index, ret) {
            res[index] = ret;
            running -= 1;
            execNextJobIfExist();
        }
        
        function rejectOne(index, err) {
            res[index] = err;
            running -= 1;
            execNextJobIfExist();
        }
        
        let g = nextJob();
        function execNextJobIfExist() {
            let {value, done} = g.next();
            if (!done) {
                let [i, job] = value;
                job()
                    .then(ret => {
                        resolveOne(i, ret);
                    })
                    .catch(err => {
                        rejectOne(i, err);
                    });
                running += 1;
            }
            resolveIfNotRunning();
        }

        function resolveIfNotRunning() {
            // console.log(`running = ${running}`);
            if (running === 0) resolve(res);
        }
    
        jobs.slice(0, limit).map((job, index) => {
            job()
                .then(ret => {
                    resolveOne(index, ret);
                })
                .catch(err => {
                    rejectOne(index, err);
                });
        });
    });
}

// run(jobs, 2).then(console.log).catch(console.error);