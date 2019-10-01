import { Component } from '@angular/core';
import { Task } from './model/task.model';
import { TaskService } from './service/task.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  taskList: Task[];
  cols: any[];
  display: boolean = false;
  selectedData: number[] = [];
  id = null;
  userId = null;
  title = "";
  body = "";
  isUpdate = false;

  constructor(private taskService: TaskService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.initializeData();
    this.cols = [
      { field: 'id', header: 'Id'},
      { field: 'userId', header: 'User Id'},
      { field: 'title', header: 'Title'},
      { field: 'body', header: 'Body'},
      { field: 'action', header: 'Action'}
    ];
  }

  onSelectionChange(data) {
    this.selectedData = [];
    data.forEach((element) => this.selectedData.push(element.id));
  }

  onRowSelect(event) {
    this.selectedData.push(event.data.id);
    console.log(this.selectedData);
  }

  onRowUnselect(event) {
    this.selectedData = this.selectedData.filter(function (value, index, arr) {
      return value !== event.data.id;
    });
  }

  showUpdateTaskDialog(task: Task) {
    this.isUpdate = true;
    this.id = task.id;
    this.userId = task.userId;
    this.title = task.title;
    this.body = task.body;
    this.display = true;
  }

  resetDialog() {
    this.id = null;
    this.userId = null;
    this.title = "";
    this.body = "";
    this.isUpdate = false;
  }

  showNewTaskDialog() {
    this.isUpdate = false;
    this.resetDialog();
    this.display = true;
  }

  closeDialog() {
    this.display = false;
  }

  showRemoveAllConfirmationDialog() {
    this.confirmationService.confirm({
      message: 'Do you want to delete all selected tasks?',
      header: 'Delete filter',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.deleteSelectedTasks();
      },
      reject: () => {
        return;
      }
    });
  }

  showRemoveConfirmationDialog(task: Task) {
    this.confirmationService.confirm({
      message: 'Do you want to the task: ' + task.id + '?',
      header: 'Delete filter',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.deleteTaskById(task);
      },
      reject: () => {
        return;
      }
    });
  }

  deleteTaskById(task: Task) {
    this.taskList = this.taskList.filter((element) => element.id !== task.id);
    this.selectedData = this.selectedData.filter((element) => element !== task.id);
  }

  initializeData() {
    this.taskService.getAllData().subscribe(res => {
      this.taskList = res;
    });
  }

  deleteSelectedTasks() {
    this.taskList = this.taskList.filter((element) => this.selectedData.indexOf(element.id) == -1);
    this.selectedData = [];
  }

  saveUpdateTask() {
    var tasks: Task[] = this.taskList.filter((element) => element.id === this.id);
    if (tasks.length > 0) {
      tasks[0].userId = this.userId;
      tasks[0].title = this.title;
      tasks[0].body = this.body;
    } else {
      var task = {
        id: this.id,
        userId: this.userId,
        title: this.title,
        body: this.body
      }
      this.taskList = [...this.taskList, task];
    }
    this.closeDialog();
  }
}
