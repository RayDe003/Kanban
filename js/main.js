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
            inTest: [],
            editingTaskIndex: null,
            editingColumn: null
        }
    },
    methods: {
        addTask() {
            if (this.editingTaskIndex !== null) {
                const updatedTask = { ...this.newTask, lastEdited: new Date().toISOString().slice(0, 10) };
                if (this.editingColumn === 'tasks') {
                    this.$set(this.tasks, this.editingTaskIndex, updatedTask);
                } else if (this.editingColumn === 'inProgressTasks') {
                    this.$set(this.inProgressTasks, this.editingTaskIndex, updatedTask);
                }
                this.editingTaskIndex = null;
                this.editingColumn = null;
            } else {
                this.tasks.push({ ...this.newTask });
            }
            this.newTask = { title: '', description: '', deadline: '', createdAt: new Date().toISOString().slice(0, 10), lastEdited: null };
        },
        deleteTask(taskIndex, column) {
            if (column === 'tasks') {
                this.tasks.splice(taskIndex, 1);
            } else if (column === 'inProgressTasks') {
                this.inProgressTasks.splice(taskIndex, 1);
            }
            this.editingTaskIndex = null;
            this.editingColumn = null;
        },
        editTask(taskIndex, task, column) {
            this.newTask = { ...task };
            this.editingTaskIndex = taskIndex;
            this.editingColumn = column;
        },
        moveToInProgress(taskIndex) {
            const taskToMove = this.tasks.splice(taskIndex, 1)[0];
            this.inProgressTasks.push(taskToMove);
        },
        moveToInTest(taskIndex) {
            const taskToMove = this.inProgressTasks.splice(taskIndex, 1)[0];
            this.inTest.push(taskToMove);
        },
    }
});
