import { Component,  OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CameraService } from 'src/app/services/shared/camera.service';
import { FileUploadService } from 'src/app/services/shared/file-upload.service';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-camera-dialog',
  templateUrl: './camera-dialog.component.html',
  styleUrls: ['./camera-dialog.component.css']
})
export class CameraDialogComponent implements OnInit{

  readonly allowedTypes: string[]  = ['image/jpg', 'image/jpeg'];
  readonly maxSizeMB: number = 12; 
  readonly defaultTextToUpload: string = 'Choose file to upload';

  firstScreen: boolean = true;

  fileSelected?: File;
  fileName: string = "";
    
  uploadFileText: string = this.defaultTextToUpload;
  uploadBackGroundColor: string = "";
  isUploadSelected: boolean = false;

  isCameraExists: boolean = false;
  showCameraNoExist: boolean = false;
  findCameras: boolean = false;
  isTakeFotoSelected: boolean = false;
  retryShotEnabled: boolean = false;
  isCameraEnable: boolean = false;
  showFoto: boolean = false;
  multipleWebcamsAvailable = false;  
  errors: WebcamInitError[] = [];
  webcamImage: WebcamImage | null = null;
  maxRetryCamCounter: number = 3;
  RetryCamCounter: number = 0;

  isBtnImportDisabled: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<CameraDialogComponent>,
    private _cameraService: CameraService,
    private _uploadFileService: FileUploadService
  ) 
  {  
  } 

  ngOnInit(): void {
   this.firstScreen = true;
   this.isUploadSelected = false;
  }

  regresar()
  {
    this.firstScreen = true;
    this.uploadFileText = this.defaultTextToUpload;
    this.fileName = "";
    this.fileSelected = null!;
    this.uploadBackGroundColor = "";
    this.isUploadSelected = false;
    this.isTakeFotoSelected = false;
    this.retryShotEnabled = false;
    this.isCameraEnable = false;
    this.showFoto = false;
  }

  submitFile()
  {
    let fileBase64: string = null!;

    if(this.isUploadSelected)
    {
      fileBase64 = this._uploadFileService.getFromFile(this.fileSelected!);
    }
    else if (this.isTakeFotoSelected)
    {      
      if(this.webcamImage && this.webcamImage.imageAsDataUrl)
        fileBase64 = this._uploadFileService.removeNonBase64Chars(this.webcamImage.imageAsDataUrl);   
    }

    if(fileBase64 === "" || fileBase64 === null)
    {
      alert("Error al procesar la imagen.");
      return;
    }

    
    this.dialogRef.close(
      { 
        event: 'import', 
        data: fileBase64
      });  
  }


  selectUpload()
  {
    this.firstScreen = false;
    this.isUploadSelected = true;
    this.isTakeFotoSelected = false;
    this.isCameraEnable = false;
    this.showFoto = false;
    this.showCameraNoExist = false;
    this.uploadBackGroundColor ='';
  }

  onFileSelected($event: any)
  { 
    this.fileSelected = null!;
    const input = $event.target as HTMLInputElement;

    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];

      if (!this._uploadFileService.fileValidations(file, this.allowedTypes, this.maxSizeMB)) {
        //mostrar mensaje o algo
        this.uploadFileText = 'Invalid file - Choose other file to upload';
        this.fileName = '';
        this.uploadBackGroundColor = 'rgba(241, 136, 136, 0.398)';
        return;
      }
      this.uploadBackGroundColor = 'rgba(110, 208, 131, 0.498)';
      this.fileName = file.name;
      this.uploadFileText = 'Archivo seleccionado: ';
      this.fileSelected = file;
      this.isBtnImportDisabled = false;
    }
  }

  closeDialog()
  { 
    this.fileSelected = null!;
    this.dialogRef.close({ event: 'no-action'});
  }

  selectTakeFoto()
  {    
    this.findCameras = true;
    this._cameraService.initCamera();
    this.uploadBackGroundColor = 'rgb(208, 230, 251)';

    setTimeout(() => {      
      if(this._cameraService.isCameraAvailable)
        {
          this.firstScreen = false;
          this.isUploadSelected = false;
          this.isTakeFotoSelected = true;
          this.isCameraEnable = true;
          this.showFoto = false;
          this.isCameraExists = true;
          this.multipleWebcamsAvailable = this._cameraService.multipleWebcamsAvailable;
          this.uploadBackGroundColor = '';
        }
        else{
          this.showCameraNoExist = true;
          this.uploadBackGroundColor = 'rgba(241, 136, 136, 0.398)';
        }
        this.findCameras = false;
    }, 600);

 
  }  

  changeCamera(directionOrDeviceId : string | boolean)
  {
    this._cameraService.changeCamera(directionOrDeviceId);
  }

  handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.isCameraEnable = false;
    this.showFoto = true;
  }
  
  handleInitError(error: WebcamInitError): void
  { 
    this.errors.push(error);    
    if(this.RetryCamCounter < this.maxRetryCamCounter)
    {
      this.RetryCamCounter++;
      console.log("Error al inicializar la camara", error.message);
      setTimeout(() => {      
        this._cameraService.initCamera();
      }, 1000);
    }   
  } 

  takeShot(): void {
    this._cameraService.TakePicture();
    this.isBtnImportDisabled = false;
    this.retryShotEnabled = true;
  }

  retryShot()
  {
    this.retryShotEnabled = false;
    this.isCameraEnable = true;
    this.isBtnImportDisabled = true;
  }

  get triggerObservable(): Observable<void> {
    return this._cameraService.triggerObservable;
  }

  get nextWebCamObservable(): Observable<string | boolean> {
    return this._cameraService.nextWebCamObservable;
  }

}
