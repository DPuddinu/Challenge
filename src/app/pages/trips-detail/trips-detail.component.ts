import { ResolverResponse } from '@/resolvers/trip-detail.resolver';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-trips-detail',
  imports: [],
  template: `<p>trips-detail works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripsDetailComponent {
  private readonly activatedRoute = inject(ActivatedRoute);

  protected readonly trip$ = this.activatedRoute.data.pipe(map((data): ResolverResponse => data['trip']));
}
