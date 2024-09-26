import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  readonly maxSizeBytes: number = 1024 * 1024;

  constructor() { }

  fileValidations(file:File, allowedTypes: string[], maxSize: number) : boolean
  {
    if (!allowedTypes.includes(file.type)) {
      alert('Tipo de archivo no permitido'); //mostrar mensaje o algo
      return false;
    }

    if (file.size > (this.maxSizeBytes * maxSize)) {
      alert(`El archivo debe ser menor o igual a ${maxSize} MB`);  //mostrar mensaje o algo
      return false;
    }
    
    return true;
  }



  getFromFile(file: File) : string {
    if(file)
    {
      this.getFileAsBase64(file).then(base64File => {

        base64File = this.removeNonBase64Chars(base64File);    
        return  base64File;
      });
    }
    return "";
  }
 
  private getFileAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string); // El archivo en formato base64
      };
      reader.onerror = reject;
      reader.readAsDataURL(file); // Convertir archivo a base64
    });
  }

  removeNonBase64Chars(base64File: string): string {
    return base64File.replace(/^data:image\/[a-z]+;base64,/, '');
  } 
}
