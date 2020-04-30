import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { fromEvent, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'circleMove';
  mouseEvent: Subscription;
  timer: Subscription;
  counter: number;
  isDisplay: boolean;
  @ViewChild('circle') circle: ElementRef

  ngOnInit() {
    this.counterTime()
  }

  public counterTime() {
    const source = interval(1000);
    this.timer = source.subscribe(res => {
      this.counter = res
      if (res >= 10) {
        this.isDisplay = true
        this.timer.unsubscribe()
      }
    })
  }

  ngAfterViewInit() {
    this.mouseEvent = fromEvent(this.circle.nativeElement, 'mousemove').subscribe(res => {
      const inner = document.getElementById('inner')
      inner.setAttribute('style', `top: ${res['clientY']}px; left: ${res['clientX']}px;`);
      if (this.counter >= 10) {
        this.mouseEvent.unsubscribe()
      }
    })
  }








}


