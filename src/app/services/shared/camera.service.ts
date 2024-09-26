import { Injectable } from '@angular/core';
import { WebcamImage, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  //public webcamImage: WebcamImage | undefined;
  public multipleWebcamsAvailable = false;
  public isCameraAvailable = false;
  public deviceId: string | undefined;
  private trigger: Subject<void> = new Subject<void>();
  private nextWebCam: Subject<string | boolean> = new Subject<string | boolean>();

  initCamera() {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
      this.isCameraAvailable = mediaDevices && mediaDevices.length > 0;
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    });
  }

  
  changeCamera(directionOrDeviceId : string | boolean)
  {
    this.nextWebCam.next(directionOrDeviceId);
  }
 

  TakePicture(): void {
    this.trigger.next();
  }

 

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  get nextWebCamObservable(): Observable<string | boolean> {
    return this.nextWebCam.asObservable();
  }

}
