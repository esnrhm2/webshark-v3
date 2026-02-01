import { ModalResizableService } from './../controls/modal-resizable/modal-resizable.service';
import { WebSharkDataService } from '@app/services/web-shark-data.service';
import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';


declare const transcode: Function;
@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.scss']
})
export class HomeComponent implements OnInit {
  typeOfChart: any = 'area';
  isKIOSK = !!environment.kiosk;
  dialogs: any[] = [];
  framePosition: any = ['vertical', 'horizontal'];
  
  // Check if file parameter exists
  private static hasFileParam(): boolean {
    const urlParams = new URLSearchParams(window.location.search);
    return !!urlParams.get('file') || !!location.hash;
  }
  
  // Show error if no file is specified
  hasError: boolean = !HomeComponent.hasFileParam();
  errorMessage: string = 'No file specified. Please provide a file parameter in the URL. Example: ?file=path/to/file.pcap';
  
  // Loading state - stays true until data is ready
  isLoading: boolean = !this.hasError;
  
  constructor(
    private webSharkDataService: WebSharkDataService,
    private modalResizableService: ModalResizableService
  ) {
    this.modalResizableService.event.subscribe(({ open, data }) => {
      if (open) {
        this.dialogs.push(data)
      }
    });

  }
  
  // Called when data is ready from webshark component
  onDataReady(data: any) {
    this.isLoading = false;
  }
  
  async ngOnInit() {
    // Do nothing if there's no file
  }
  onClose(idx: number): void {
    this.dialogs = this.dialogs.filter((i, k) => k !== idx);
  }
  get captureFile() {
    return this.webSharkDataService.getCapture();
  }

  downloadFile(filename: string) {
    if (!filename) {
      return;
    }
    // console.log('downloading file', filename);
    const href = encodeURIComponent('/' + filename);
    const url = `/webshark/json?method=download&capture=${href}&token=self`;

    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    // link.remove();
  }

  saveToFile(data: any, filename: string, type = 'application/octet-stream') {
    const file = new Blob([data], { type: type });
    const nav: any = window.navigator as any;
    if (nav.msSaveOrOpenBlob) {
      // IE10+
      nav.msSaveOrOpenBlob(file, filename);
    } else {
      // Others
      const a = document.createElement('a'),
        url = URL.createObjectURL(file);
      a.href = url;
      a.target = '(file)';
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  }

}
