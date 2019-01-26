import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { TaskListComponent } from './task-list/task-list.component';
import { CategoryListComponent } from './category-list/category-list.component';

const routes: Routes = [
    { path: 'tasks', component: TaskListComponent },
    { path: 'categories', component: CategoryListComponent }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]

})
export class AppRoutingModule {

}
