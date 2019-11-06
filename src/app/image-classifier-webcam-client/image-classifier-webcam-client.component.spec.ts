import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageClassifierWebcamClientComponent } from './image-classifier-webcam-client.component';

describe('ImageClassifierWebcamClientComponent', () => {
  let component: ImageClassifierWebcamClientComponent;
  let fixture: ComponentFixture<ImageClassifierWebcamClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageClassifierWebcamClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageClassifierWebcamClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
