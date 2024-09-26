import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CameraDialogComponent } from '../components/shared/camera-dialog/camera-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  
  constructor(private readonly dialog: MatDialog) {
    
  }
  openDialog() {
    const dialogRef = this.dialog.open(CameraDialogComponent, 
      {
        height:'700px',
        maxHeight: '95vh',
        width: '800px',
        hasBackdrop: true,
       
      }
    );

    dialogRef.afterClosed().subscribe((result: any) => {

      if(result)
      {
        if(result.event === 'no-action') 
          console.log('No action was taken');
        if(result.event === 'import')         
        {
          let data = result.data; //nos llega la imagen en base64
        }
      }      
    
    });
  }
}
