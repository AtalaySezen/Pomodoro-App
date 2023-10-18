import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private valueChangesSubscription: Subscription;

  constructor(private firebaseData: AngularFirestore) { }


  GetAllDatas(url: string) {
    return this.firebaseData.collection(url).snapshotChanges();
  }

  GetDataWithId(url: string, id: any) {
    return this.firebaseData.collection(url).doc(id).snapshotChanges();

  }

  AddDataFirebase(url: string, data: any) {
    return this.firebaseData.collection(url).add(data);
  }

  addDataWithCustomUid(collectionName: string, uid: string, data: any) {
    return this.firebaseData.collection(collectionName).doc(uid).set(data);
  }

  UpdateFirebaseData(url: string, id: any, data: any) {
    return this.firebaseData.doc(url + id).update(data);
  }

  DeleteFirebaseData(url: any, dataId: number) {
    return this.firebaseData.doc(url + dataId).delete();
  }
  
  
  deleteDataFromArray(collectionName: string, docId: string, arrayName: string, elementId: string): Promise<void> {
    const docRef = this.firebaseData.collection(collectionName).doc(docId);

    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }

    return new Promise<void>((resolve, reject) => {
      this.valueChangesSubscription = docRef.valueChanges().subscribe((doc: any) => {
        const updatedArray = doc[arrayName].filter((item: any) => item !== elementId);
        docRef.update({ [arrayName]: updatedArray })
          .then(() => {
            console.log('Element removed from the array.');
            resolve();
          })
          .catch(error => {
            console.error('Error removing element from the array:', error);
            reject(error); // Reject the promise with the error
          });

        this.valueChangesSubscription.unsubscribe(); // Unsubscribe after the update
      });
    });
  }


}
