import { NgModule } from '@angular/core';
import { AuthRoutesMenus } from './auth.routes';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth.component';

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            { path: '', pathMatch: 'full', component: LoginComponent },
            { path: AuthRoutesMenus.Login, component: LoginComponent },
            { path: AuthRoutesMenus.Register, component: RegisterComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
