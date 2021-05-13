import firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAV_JOFCeeCeyVDpyTE1szFO8ULFN2OdeI",
  authDomain: "los-todos-de-la-lista.firebaseapp.com",
  projectId: "los-todos-de-la-lista",
  storageBucket: "los-todos-de-la-lista.appspot.com",
  messagingSenderId: "696919531142",
  appId: "1:696919531142:web:a6055f4d953636fb83fb07"
};

export default class Fire {
  constructor (callback) {
    this.init(callback);
  }

  init (callback) {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged(user => {
      if (user) callback(null);
      else firebase.auth().signInAnonymously().catch(error => { callback(error); })
    })
  }

  get ref () {
    return firebase.firestore().collection("lists");
  }
  
  getLists (callback) {
    let ref = this.ref.orderBy("name");
    this.unsubscribe = ref.onSnapshot(snapshot => {
      let lists = [];
      snapshot.forEach(doc => {
        lists.push({ id: doc.id, ...doc.data() });
      });
      callback(lists)
    }, function (error) {
      console.error(error);
    })
  }

  getList (id) {
    let ref = this.ref;
    ref.doc(id).get();
  }
  
  addList (list) {
    let ref = this.ref;
    ref.add(list);
  }
  
  deleteList (list) {
    let ref = this.ref;
    ref.doc(list).delete();
  }
  
  updateList (id, list) {
    let ref = this.ref;
    ref.doc(id).update(list);
  }

  // Test d'ajout de tâches avec la méthode arrayUnion tranquillou
  newTask (id, task) {
    let ref = this.ref;
    const newRef = ref.doc(id)
    newRef.update({
      todos: firebase.firestore.FieldValue.arrayUnion(task)
  });
  }

  deleteTask (id, task) {
    let ref = this.ref;
    const newRef = ref.doc(id)
    
    newRef.update({
      todos: firebase.firestore.FieldValue.arrayRemove(task)
  });
  }

  completeTask (id, task) {
    let ref = this.ref;
    const newRef = ref.doc(id)
    newRef.update({
      todos: firebase.firestore.FieldValue.arrayUnion(task)
  });
  }

  updateList (id, list) {
    let ref = this.ref;
    ref.doc(id).update(list);
  }

  detach () {
    this.unsubscribe();
  }
}