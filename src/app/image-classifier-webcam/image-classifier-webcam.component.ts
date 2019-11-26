import { Prediction } from './../prediction';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-image-classifier-webcam',
  templateUrl: './image-classifier-webcam.component.html',
  styleUrls: ['./image-classifier-webcam.component.scss']
})
export class ImageClassifierWebcamComponent implements OnInit, AfterViewInit {

  @ViewChild('video') video: ElementRef;
  predictions: Prediction[];
  model: any;
  loading = true;
  flip = false;
  constructor(private deviceService: DeviceDetectorService) {}

  async ngOnInit() {
    if (this.deviceService.isDesktop()) {
      document.getElementById('flipCamera').style.visibility = 'hidden';
    }
    console.log('loading mobilenet model...');
    this.model = await mobilenet.load();
    console.log('Sucessfully loaded model');
    this.loading = false;

    setInterval(async () => {
      this.predictions = await this.model.classify(this.video.nativeElement);
      await tf.nextFrame();
    }, 3000);
  }

  async ngAfterViewInit() {
    const vid = this.video.nativeElement;

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(
        { video: true
        })
        .then((stream) => {
          vid.srcObject = stream;

        })
        .catch((error) => {
          console.log('Something went wrong!');
        });
    }
  }

  onChangeCamClick() {
    const vid = this.video.nativeElement;

    if (this.flip) {
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(
          { video: true })
          .then((stream) => {
            vid.srcObject = stream;
          })
          .catch((error) => {
            console.log('Something went wrong!');
          });
      }
    } else {
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(
          { video: {
            facingMode: {
              exact: 'environment'
            }
          }
        })
          .then((stream) => {
            vid.srcObject = stream;
          })
          .catch((error) => {
            console.log('Something went wrong!');
          });
      }
    }
    this.flip = !this.flip;
  }

}
