import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { PortfolioComponent } from './portfolio/portfolio.component';

export const routes: Routes = [

  { 
    path: 'admin', 
    component: DashboardComponent, 
    title: 'Admin Dashboard | Management' 
  },
  
  { 
    path: 'portfolio', 
    component: PortfolioComponent, 
    title: 'Marwa Mubarak | Full Stack Portfolio' 
  },
  
  { path: '', redirectTo: 'portfolio', pathMatch: 'full' },
  
 
  { path: '**', redirectTo: 'portfolio' }
];
