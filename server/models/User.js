const admin = require('firebase-admin');
const path = require('path');
const bcrypt = require('bcrypt');
var db = admin.firestore();


module.exports.Register = async function (req) {
    const usersRef = db.collection('Users');
    const snapshot = await usersRef.where('email', '==', req.email).get();
    if (snapshot.empty) {
        return bcrypt.hash(req.password, 10).then(async function (hash) {
            var data = {
                email: req.email,
                password: hash,
                lists: []
            };
            const response = await usersRef.doc().set(data);
            if (response.empty) {
                return false;
            }
            return "registered";
        })
    } else {
        return "user already exist";
    }
}

module.exports.Login = async function (req) {
    const usersRef = db.collection('Users');
    const snapshot = await usersRef.where('email', '==', req.email).get();
    if (!snapshot.empty) {
        const user = snapshot.docs[0].data();
        const match = await bcrypt.compare(req.password, user.password);
        if (match) {
            id = snapshot.docs[0].id;
            return id;
        }
        return false;
    }
    return false;
}