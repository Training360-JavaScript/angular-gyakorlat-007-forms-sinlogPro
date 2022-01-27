import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {

  event$: Observable<Event> = this.ar.params.pipe(
    switchMap(params => this.eventService.get(params['id']))
  );

  constructor(
    private ar: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onUpdate(event: Event): void {
    this.eventService.update(event).subscribe(
      // event => console.log(event),
      () => this.router.navigate(['/', 'user']),
      err => console.log(err)
    )
  }

}
