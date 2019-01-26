import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task-service.service';
import { Category } from '../category';
import { Task } from '../task';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

    cats: Category[] = []
    selectedCat: Category //category whose tasks were viewing
    selectedCatTasks: Task[] = [] //actual tasks displayed when the task view opens

    constructor(private taskService: TaskService) { }

    ngOnInit() {
        this.taskService.getCategories().subscribe(cats => this.cats = cats)
    }

    selectCategory(newSelectedCat: Category) {
        this.selectedCat = newSelectedCat
        if (!this.taskService.isObjectEmpty(newSelectedCat)) {
            this.updateTaskView(newSelectedCat.tasks)       
        }
    }

    private updateTaskView(newTasks) {
        this.selectedCatTasks = []
        if (newTasks.length > 0) {
            for (let taskID of newTasks) {
                this.taskService.getTask(taskID).subscribe(foundTask => { if (!this.taskService.isObjectEmpty(foundTask)) this.selectedCatTasks.push(foundTask) })
            }
        }
    }

    createCategory(catName: string) {
        catName = catName.trim();
        if (catName) {
            let category: Category = { _id: "", name: catName, tasks: [] }
            this.taskService.createCategory(category).subscribe(resultCat => { if (resultCat) this.cats.push(resultCat) })
        }
    }

    deleteCategory(cat: Category) {
        this.taskService.deleteCategory(cat._id).subscribe(deletedCat => { if (deletedCat) this.cats = this.cats.filter(c => c._id !== cat._id) })
    }

    renameCategory(cat: Category) {
        this.taskService.renameCategory(cat).subscribe()
    }

    addTaskToCat(category: Category, taskIDs: string) {
        taskIDs = taskIDs.trim()
        this.taskService.addTaskToCategory(category._id, taskIDs).subscribe(taskIDsAdded => {
            if (taskIDsAdded.length > 0) {
                for (let taskID of taskIDsAdded) {
                    category.tasks.push(taskID)
                }
                if(category === this.selectedCat)
                    this.updateTaskView(category.tasks)
            }
            else {
                alert("Invalid IDs")
            }
        })
    }

    removeTaskFromCat(category: Category, taskIDs: string) {
        taskIDs = taskIDs.trim()
        this.taskService.removeTaskFromCategory(category._id, taskIDs).subscribe(taskIDsAdded => {
            if (taskIDsAdded.length > 0) {       
                category.tasks = category.tasks.filter(task => taskIDsAdded.indexOf(task) === -1 )
                if(category === this.selectedCat)
                    this.updateTaskView(category.tasks)
            }
            else {
                alert("Invalid IDs")
            }
        })
    }
}
