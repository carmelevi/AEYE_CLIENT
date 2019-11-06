import { ImageClassifierWebcamComponent } from './image-classifier-webcam/image-classifier-webcam.component';
import { ImageClassfierUploadComponent } from './image-classfier-upload/image-classfier-upload.component';
import { ImageClassifierWebcamClientComponent } from './image-classifier-webcam-client/image-classifier-webcam-client.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'upload', component: ImageClassfierUploadComponent },
  { path: 'webcam', component: ImageClassifierWebcamComponent },
  { path: 'webcam_client', component: ImageClassifierWebcamClientComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
