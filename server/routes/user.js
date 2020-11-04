var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Surgery = require('../models/Surgery');
var sha256 = require('sha256')

router.get('/getAllUser', (req, res, next) => {
    User.find().then(user => {
        res.status(200).json(user)
    }).catch(err => {
        res.status(404).json(err)
    });
})

router.get('/getPatients', (req, res, next) => {
    User.find({ role: 'Patient' }).then(user => {
        res.status(200).json(user)
    }).catch(err => {
        console.log(err);
        res.status(404).json(err)
    });
})

// --------get patients for registering surgery-------
router.get('/getPatientForSurgery/:id', (req, res, next) => {
    User.find({ phoneNumber: req.params.id }).then((patient) => {
        if (!patient) {
            throw new Error('no user with that id')
        } else {
            var firstname = [];
            var lastname = [];
            var dateOfBirth = [];
            var value;
            if (patient.length > 1) {
                for (var i = 0; i < patient.length; i++) {
                    firstname[i] = patient[i].firstname;
                    lastname[i] = patient[i].lastname;
                    dateOfBirth[i] = patient[i].BirthDate;
                }
                value = 2;
                res.status(200).json({ firstname, patient, lastname, dateOfBirth, value })
            } else {
                res.status(200).json(patient)
            }
        }
    }).catch((err) => {
        res.status(400).json({ error: err })
    });
})


router.get('/getDoctors', (req, res, next) => {
    User.find({ role: 'Pre Op Coordinator' }).then(user => {
        console.log(user);
        res.status(200).json(user)
    }).catch(err => {
        console.log(err);
        res.status(404).json(err)
    });
})

router.post('/addSurgery', (req, res, next) => {
    console.log(req.body);
    var surgery = new Surgery(req.body);

    surgery.date = new Date(req.body.date)
    surgery.save().then(response => {
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(403).json({ message: 'Failed' })
    });
})

router.get('/getAllSurgeries', (req, res, next) => {
    Surgery.find().populate('cordinator').populate('patient').then(surgereis => {
        res.status(200).json(surgereis);
    }).catch(err => {
        res.status(400).json(err)
    })
})

router.post('/change/:email', (req, res, next) => {
    console.log(req.params.email)
    User.findOne({ email: req.params.email })
        .then(user => {
            if (user.password == sha256(req.body.oldPass)) {
                User.updateOne({ email: req.params.email }, { password: sha256(req.body.newPass) })
                    .then(response => {
                        res.status(200).json({ message: "Changed" });
                    }).catch(err => {
                        console.log(err);
                        res.status(400).json({ error: err.message })
                    });
            } else {
                res.status(403).json({ error: 'Old Password is incorrect' })
            }
        }).catch(err => {
            console.log(err);
            res.status(402).json({ error: 'Something went wrong' })
        });
})

router.get('/deleteSurgery/:id', (req, res, next) => {
    Surgery.deleteOne({ _id: req.params.id })
        .then(response => {
            res.status(200).json({ message: "Deleted" })
        })
        .catch(err => {
            console.log(err);
            res.status(402).json({ error: 'Cannot Delete' })
        });
})

router.get('/getSurgery/:id', (req, res, next) => {
    Surgery.findOne({ _id: req.params.id }).then(surgery => {
        res.status(200).json(surgery)
    }).catch(err => {
        console.log(err)
        res.status(400).json({ error: "Somethign went wrong" })
    });
})

router.get('/getPatient/:id', (req, res, next) => {
    User.findOne({ phoneNumber: req.params.id }).then((patient) => {
        if (!patient) {
            throw new Error('no user with that id')
        }
        res.status(200).json(patient)
    }).catch((err) => {
        res.status(400).json({ error: err })
    });
})

router.get('/getPatientWithPhoneAndFirstname', (req, res, next) => {
    User.findOne({ phoneNumber: req.query.phoneNumber, firstname: req.query.firstname }).then((patient) => {
        if (!patient) {
            throw new Error('no user with that id')
        }
        console.log("+++++++++++++++++++++++")
        console.log(patient);
        console.log("+++++++++++++++++++++++")
        res.status(200).json(patient)
    }).catch((err) => {
        res.status(400).json({ error: err })
    });
})

router.post('/getSurgery/:id', (req, res, next) => {
    Surgery.updateOne({ _id: req.params.id }, req.body).then(surgery => {
        res.status(200).json(surgery)
    }).catch(err => {
        console.log(err)
        res.status(400).json({ error: "Somethign went wrong" })
    });
})

// -----------specific patients surgery details-----------
router.get('/getSpecificUser/:id', (req, res, next) => {
    var id = req.params.id;
    Surgery.find({ patient: id }).populate('patient').populate('cordinator').then(users => {
        res.status(200).json(users)
    }).catch(err => {
        res.status(400).json({ error: "Something went wrong" })
    });
})

module.exports = router;