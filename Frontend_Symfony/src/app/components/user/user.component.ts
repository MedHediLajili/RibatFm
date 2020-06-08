import { Component, OnInit, OnDestroy } from '@angular/core';
/*import { Observable, Observer, Subscription , interval} from 'rxjs';
import {map} from 'rxjs/operators';*/

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  /*numberObsSubscription: Subscription ;
  customObsSubscription: Subscription ;*/
  constructor() { }
  ngOnInit() {
    /*const myNumbers = interval(1000)
    .pipe(map(
      (data: number) => {
        return data*2;
      }
    ));
    this.numberObsSubscription = myNumbers.subscribe(
      (number: number) =>{
        console.log(number);
      }
    );

    const myObservable = Observable.create(
      (observer: Observer<string>) => {
        setTimeout(
          () => {
            observer.next('first package');
          },2000);
        setTimeout(
          () => {
            observer.next('second package');
          },6000);
        setTimeout(
          () => {
            //observer.error('this does not work');
            observer.complete();
          },8000);
          setTimeout(
            () => { observer.next('third package');
          },9000);
      });
      this.customObsSubscription = myObservable.subscribe(
        (data: string) =>{console.log(data);},
        (error: string) =>{console.log(error);},
        () =>{console.log('completed');}
      );*/
  }

  ngOnDestroy(): void {
    /*this.numberObsSubscription.unsubscribe();
    this.customObsSubscription.unsubscribe();*/
  }


}
