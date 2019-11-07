import { ImageClassifierWebcamComponent } from './image-classifier-webcam/image-classifier-webcam.component';
import { ImageClassfierUploadComponent } from './image-classfier-upload/image-classfier-upload.component';
import { ImageClassifierWebcamClientComponent } from './image-classifier-webcam-client/image-classifier-webcam-client.component';
import { ImageClassifierCaptionbotComponent } from './image-classifier-captionbot/image-classifier-captionbot.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'upload', component: ImageClassfierUploadComponent },
  { path: 'webcam', component: ImageClassifierWebcamComponent },
  { path: 'webcam_client', component: ImageClassifierWebcamClientComponent },
  { path: 'captionbot', component: ImageClassifierCaptionbotComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
