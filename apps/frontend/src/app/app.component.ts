import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthState, getLoginStarted, loginSuccess } from '@marbles/auth';
import { Store } from '@ngrx/store';
import { combineLatest, filter, pipe } from 'rxjs';

@Component({
  selector: 'marbles-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authStore: Store<AuthState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.authStore.select(getLoginStarted),
      this.route.queryParams,
    ])
      .pipe(filter(([loginStarted, _]) => {
        return loginStarted;
      }))
      .subscribe(([_, queryParams]) => {
        const address: string = queryParams['address'];
        if (address) {
          console.log('je vais navigate to avec null query params', this.route)
          this.authStore.dispatch(loginSuccess({ authEntity: { address } }));
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {}
          });
        }
      });
  }
}
