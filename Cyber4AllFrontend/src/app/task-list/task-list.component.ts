import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task-service.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = []
  sortFilters: string[] = ["none", "date", "text", "completed"]
  sortDirection: string = "Ascending"

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks)
  }

  addTask(text: string, completed: boolean) {
    text = text.trim();
    if(text)
    {
        let task: Task = {_id: "", text: text, completed: completed, date: new Date()}
        this.taskService.createTask(task).subscribe(task => { if(task) this.tasks.push(task);})
    }
  }

  deleteTask(task: Task) {
      this.taskService.deleteTask(task._id).subscribe(deletedTask => { if(deletedTask) this.tasks = this.tasks.filter(t=>t._id !== task._id)});
  }

  renameTask(task: Task) {
    this.taskService.renameTask(task).subscribe()
  }

  completeTask(task: Task, newCompleted: boolean) {
    task.completed = newCompleted
    this.taskService.completeTask(task).subscribe()
  }

  sortTasks(filter: string) {
    if(filter)
    {
        console.log(filter)
        this.taskService.getTasksSorted(filter, this.sortDirection).subscribe(sortedTasks => this.tasks = sortedTasks)
    }
  }
}
