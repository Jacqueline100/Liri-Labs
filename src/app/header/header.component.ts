import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { startWith, map} from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line: member-ordering
  userIsAuthenticated = false;
  // tslint:disable-next-line: member-ordering
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) {}
  control = new FormControl();
  labs: string[] = ['Liri Labs'];
  filteredLabs: Observable<string[]>;

  ngOnInit() {
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(
      isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });

    this.filteredLabs = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.labs.filter(lab => this._normalizeValue(lab).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }


}
