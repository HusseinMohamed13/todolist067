const admin = require('firebase-admin');
const path = require('path');
var serviceAccount = require(path.join(__dirname, '..', 'todolist-1da12-firebase-adminsdk-no0wv-6dd6244af1.json'));
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();

module.exports.getAllLists = async function (req) {
    const usersRef = db.collection('Users');
    const snapshot = await usersRef.doc(req.id).get();
    if (snapshot.empty) {
        return false;
    }

    const listsRef = db.collection('Lists');
    const documents = {};
    
    for (let x = 0;x < snapshot.data()['lists'].length;x++){
        const snapshot1 = await listsRef.doc(snapshot.data()['lists'][x]).get();
        documents[snapshot.data()['lists'][x]] = snapshot1.data();
    }
    return documents;
}

module.exports.addList = async function (req) {
    const listsRef = db.collection('Lists');

    const snapshot = await listsRef.doc(req.list).get();
    if (!snapshot.exists) {
        const snapshot1 = await listsRef.doc(req.list).set({ dummy: "null" });
        if (snapshot1.empty) {
            return false;
        }
        const snapshot2 = await listsRef.doc(req.list).get();
        if (snapshot2.empty) {
            return false;
        }
        data = snapshot2.data();
        delete data["dummy"];

        const snapshot3 = await listsRef.doc(req.list).set(data);
        if (snapshot3.empty) {
            return false;
        }

        const usersRef = db.collection('Users');
        const snapshot4 = await usersRef.doc(req.userid).get();
        if (snapshot4.empty) {
            return false;
        }
        let newList = [] ;
        if(snapshot4.data()['lists'].length <= 0){
            newList[0] = req.list;
        }else{
            newList = snapshot4.data()['lists'];
            newList[newList.length] = req.list;
        }
        const snapshot5 = await usersRef.doc(req.userid).update({lists: newList});
        if (snapshot5.empty) {
            return false;
        }

        return snapshot5;
    }
    return false;
}

module.exports.addTask = async function (req) {
    const listsRef = db.collection('Lists');
    var itemId = Math.floor((Math.random() * 100000) + 1).toString();

    const newItem = {
        [itemId]: { name: req.itemname, done: false }
    };
    const snapshot = await listsRef.doc(req.list).set(newItem, { merge: true });
    if (snapshot.empty) {
        return false;
    }
    return snapshot;
}

module.exports.deleteTask = async function (req) {
    const listsRef = db.collection('Lists');

    const snapshot = await listsRef.doc(req.list).get();
    if (snapshot.empty) {
        return false;
    }
    data = snapshot.data();
    delete data[req.itemid];

    const snapshot1 = await listsRef.doc(req.list).set(data);
    if (snapshot1.empty) {
        return false;
    }
    return snapshot1;
}

module.exports.markTaskDone = async function (req) {
    const listsRef = db.collection('Lists');
    console.log(req);
    const snapshot = await listsRef.doc(req.list).update({ [req.itemid]: { name: req.itemname, done: true } });
    if (snapshot.empty) {
        return false;
    }
    return snapshot;
}