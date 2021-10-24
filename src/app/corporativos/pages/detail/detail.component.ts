import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailCorporativoResponse } from 'app/corporativos/models/detail-corporativo.model';
import { CorporativosService } from 'app/corporativos/services/corporativos.service';
import { Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: [
     '../../../../assets/sass/pages/page-users.scss',
     '../../../../assets/sass/libs/select.scss'
    ]
})
export class DetailComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  corporativo: DetailCorporativoResponse;

  constructor(
      private activatedRoute: ActivatedRoute,
      private corporativosService: CorporativosService
  ) { }

  ngOnInit(): void {
    this.getDetail();
  }

  private getDetail() {
    this.subscription.add(this.activatedRoute.params
      .pipe(
          map(({id}) => id),
          switchMap(id => this.corporativosService.getCorporativoById(id)),
          tap(corporativo => {
              this.corporativo = corporativo;
          })
      )
      .subscribe()
    );
  }

  onChangeCorporativo(corporativo: DetailCorporativoResponse): void {
    this.corporativo = corporativo;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
  }

}