new Vue({
    el: '#app',
    data() {
        return {
            newTask: {
                title: '',
                description: '',
                deadline: '',
                createdAt: new Date().toISOString().slice(0, 10),
                lastEdited: null
            },
            tasks: [],
            inProgressTasks: []
        }
    },
    methods: {
        addTask() {
            this.tasks.push({ ...this.newTask });
            this.newTask = { title: '', description: '', deadline: '', createdAt: new Date().toISOString().slice(0, 10), lastEdited: null };
        },
        deleteTask(taskIndex) {
            this.tasks.splice(taskIndex, 1);
        },
        editTask(taskIndex, updatedTask) {
            this.tasks[taskIndex] = { ...updatedTask, lastEdited: new Date().toISOString().slice(0, 10) };
        },
        moveToInProgress(taskIndex) {
            const taskToMove = this.tasks.splice(taskIndex, 1)[0];
            this.inProgressTasks.push(taskToMove);
        }
    }
});
