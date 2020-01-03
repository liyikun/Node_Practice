

# 宏任务 微任务 详解



## macro-task

script ,setTimeout, setInterval, setImmediate, I/O

## micro-task
process.nextTick, Promises, MutationObserver

在ES6中macro-task队列又称为ScriptJobs，而micro-task又称PromiseJobs



## example

<<< @/eventLoop/eventLoop.js