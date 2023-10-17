import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firebaseData: AngularFirestore) { }

  Logout() {
    localStorage.removeItem('token');
  }

  GetAllDatas(url: string) {
    return this.firebaseData.collection(url).snapshotChanges();
  }

  GetDataWithId(url:string,id:any) {
    return this.firebaseData.collection(url).doc(id).snapshotChanges();

  }

  AddDataFirebase(url: string, data: any) {
    return this.firebaseData.collection(url).add(data);
  }

  addDataWithCustomUid(uid: string, data: any) {
    return this.firebaseData.collection('/users').doc(uid).set(data);
  }

  UpdateFirebaseData(url: string, id: any, data: any) {
    return this.firebaseData.doc(url + id).update(data);
  }

  DeleteFirebaseData(url: any, dataId: number) {
    return this.firebaseData.doc(url + dataId).delete();
  }


}
