import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    ActiveMenuSubject = new Subject<number>();

    constructor(private router: Router) {}

    changeNavigation(navPath: string): void {
        this.router.navigate([navPath]);
    }
}
