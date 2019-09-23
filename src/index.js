import Limiter from "async-limiter";

const t = new Limiter({ concurrency: 1 });

// add jobs using the familiar Array API

for (let i = 0; i < 3; i++) {
  t.push(worker(i + 1));
}

function childWorker(page) {
  return cb => {
    setTimeout(() => {
      console.log(page);
      cb();
    }, 500);
  };
}

function worker(item) {
  return cb => {
    setTimeout(() => {
      console.log("item - ", item);
      const subT = new Limiter({ concurrency: 1 });
      for (let i = 0; i < 10; i++) {
        subT.push(childWorker(i + 1));
      }
      subT.onDone(cb);
    }, 500);
  };
}
