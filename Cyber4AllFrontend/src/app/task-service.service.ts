import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators'; //used to pipe observable results 

import { Task } from './task';
import { Category } from './category';
import { JsonPipe } from '@angular/common';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    private apiUrl = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    getTask(taskID: string): Observable<Task> {
        const url = this.apiUrl + "/listTask/" + taskID
        return this.http.get<Task>(url, { params: { '_id': taskID } }).pipe(catchError(this.handleError<Task>('GetTask')));
    }

    getTasks(): Observable<Task[]> {
        const url = this.apiUrl + "/listTasks"
        return this.http.get<Task[]>(url).pipe(catchError(this.handleError('GetTasks', [])));
    }

    getTasksSorted(sortField: string, sortDir: string): Observable<Task[]> {
        const url = this.apiUrl + "/listTasks"
        let sortNum: string = sortDir === "Ascending" ? "1" : "-1"
        //params has some issue passing in a string array unless we call stringify
        return this.http.get<Task[]>(url, { params: { 'sortFields': JSON.stringify([sortField]), 'sortDirection': sortNum } }).pipe(catchError(this.handleError('GetTasksFiltered', [])));
    }

    createTask(task: Task): Observable<Task> {
        const url = this.apiUrl + "/createTask"
        return this.http.post<Task>(url, task, httpOptions).pipe(
            catchError(this.handleError<Task>('createTask'))
        )
    }

    renameTask(task: Task): Observable<Task> {
        const url = this.apiUrl + "/renameTask"
        return this.http.put<Task>(url, task, httpOptions).pipe(
            catchError(this.handleError<Task>('renameTask'))
        )
    }

    completeTask(task: Task): Observable<Task> {
        const url = this.apiUrl + "/completeTask"
        return this.http.put<Task>(url, task, httpOptions).pipe(
            catchError(this.handleError<Task>('completeTask'))
        )
    }

    deleteTask(taskID: string): Observable<Task> {
        const url = this.apiUrl + '/deleteTask'
        return this.http.delete<Task>(url, { params: { _id: taskID } }).pipe(
            catchError(this.handleError<Task>('deleteTask'))
        )
    }

    getCategories(): Observable<Category[]> {
        const url = this.apiUrl + "/getCategories"
        return this.http.get<Category[]>(url).pipe(catchError(this.handleError('GetCategories', [])));
    }

    createCategory(cat: Category): Observable<Category> {
        const url = this.apiUrl + "/createCategory"
        return this.http.post<Category>(url, cat, httpOptions).pipe(
            catchError(this.handleError<Category>('CreateCategory'))
        )
    }

    deleteCategory(categoryID: string): Observable<Category> {
        const url = this.apiUrl + '/deleteCategory'
        return this.http.delete<Category>(url, { params: { _id: categoryID } }).pipe(
            catchError(this.handleError<Category>('DeleteCategory'))
        )
    }

    renameCategory(cat: Category): Observable<Category> {
        const url = this.apiUrl + '/renameCategory'
        return this.http.put<Category>(url, cat, httpOptions).pipe(
            catchError(this.handleError<Category>('RenameCategory'))
        )
    }

    addTaskToCategory(catID: string, taskIDs: string): Observable<string[]> {
        const url = this.apiUrl + '/addTaskToCategory'
        let taskIDList: string[] = taskIDs.split(",")
        return this.http.put<string[]>(url, { _id: catID, categories: taskIDList }, httpOptions).pipe(
            catchError(this.handleError<string[]>('AddTaskToCategory'))
        )
    }

    removeTaskFromCategory(catID: string, taskIDs: string): Observable<string[]> {
        const url = this.apiUrl + '/removeTaskFromCategory'
        let taskIDList: string[] = taskIDs.split(",")
        return this.http.put<string[]>(url, { _id: catID, categories: taskIDList }, httpOptions).pipe(
            catchError(this.handleError<string[]>('RemoveTaskFromCategory'))
        )
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            //TODO: Send error to remote logging infrastructure
            console.error(error);
            //TODO: better job of transforming error for user consumption
            alert(`${operation} failed: ${error.message}`);
            //Let app keep running by returning an empty result
            return of(result as T);
        }
    }

    isObjectEmpty(obj) {
        var name;
        for(name in obj) {
            return false
        }
        return true
    }
}
