import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageClassifierCaptionbotComponent } from './image-classifier-captionbot.component';

describe('ImageClassifierCaptionbotComponent', () => {
  let component: ImageClassifierCaptionbotComponent;
  let fixture: ComponentFixture<ImageClassifierCaptionbotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageClassifierCaptionbotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageClassifierCaptionbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
