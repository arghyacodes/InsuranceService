import { Routes } from '@angular/router';
import { Home } from './component/home/home';
import { About } from './component/about/about';
import { Plans } from './component/plans/plans';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path:'home', component:Home},
    {path:'plans', component:Plans},
    {path:'about', component:About},
];
