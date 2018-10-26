import { OnInit, OnDestroy } from "@angular/core";
import { LoaderService, loaderCommand } from "./load.service";
import { takeWhile } from "rxjs/operators";

export class LoadingComponent implements OnInit, OnDestroy {

    private isAlive: boolean = true;
    private message: string;
    constructor(private loaderService: LoaderService ) { }
  
    ngOnInit() {
    //   this.dbsService.dbsEvent.pipe(takeWhile(() => this.isAlive)).subscribe((res: any) => {
    //     if (res.command == loaderCommand.Begin) {
    //       this.message = res.message ? res.message : "Loading...";
    //       //do something to show the spinner
    //     }
    //     if (res.command == loaderCommand.End)
    //       //do something to hide the spinner
    //   })
    }
    ngOnDestroy() {
      this.isAlive = false;
    }
  }