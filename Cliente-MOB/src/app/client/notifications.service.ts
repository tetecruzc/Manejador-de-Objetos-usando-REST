// import { Injectable } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
// import { TranslateService } from '@ngx-translate/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class NotificationsService {
//   constructor(
//     private toastr: ToastrService,
//     private translate: TranslateService
//   ) {}

//   showSuccessToast(term: string): void {
//     this.translate.get(term).subscribe((res) => {
//       this.toastr.success(res);
//     });
//   }

//   showErrorToast(term: string): void {
//     this.translate.get(term).subscribe((res) => {
//       this.toastr.error(res);
//     });
//   }

//   showInfoToast(term: string): void {
//     this.translate.get(term).subscribe((res) => {
//       this.toastr.info(res);
//     });
//   }

//   showWarningToast(term: string): void {
//     this.translate.get(term).subscribe((res) => {
//       this.toastr.warning(res);
//     });
//   }
// }
