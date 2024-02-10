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
            inProgressTasks: [],
            editingTaskIndex: null,
        }
    },
    methods: {
        addTask() {
            if (this.editingTaskIndex !== null) {
                this.tasks[this.editingTaskIndex] = { ...this.newTask, lastEdited: new Date().toISOString().slice(0, 10) };
                this.editingTaskIndex = null;
            } else {
                this.tasks.push({ ...this.newTask });
            }
            this.newTask = { title: '', description: '', deadline: '', createdAt: new Date().toISOString().slice(0, 10), lastEdited: null };
        },
        deleteTask(taskIndex) {
            this.tasks.splice(taskIndex, 1);
        },
        editTask(taskIndex, updatedTask) {
            this.editingTaskIndex = taskIndex;
            this.newTask = { ...updatedTask };
        },
        moveToInProgress(taskIndex) {
            const taskToMove = this.tasks.splice(taskIndex, 1)[0];
            this.inProgressTasks.push(taskToMove);
        }
    }
});
