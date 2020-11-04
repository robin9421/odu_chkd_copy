var express = require('express');
const SurgeryTypes = require('../models/SurgeryTypes');
var router = express.Router();
var SurgeryType = require('../models/SurgeryTypes');


router.post('/addSurgeryType', (req, res, next) => {
    console.log(req.body);
    var surgeryType = new SurgeryType(req.body);
    console.log("%%%%%%%%%%%%%%%%%%%%%%%")
    console.log(req.body)
    console.log("%%%%%%%%%%%%%%%%%%%%%%%")

    SurgeryType.findOne({ type: surgeryType.type })
        .then(surgery => {
            if (!surgery) {
                surgeryType.save().then(response => {
                    res.status(200).json(response);
                }).catch(err => {
                    console.log(err);
                    res.status(403).json({ message: 'Failed' })
                });
            }
        }).catch((err) => {
            res.status(400).json({ message: "SurgeryType Already exists" })
        })

})

router.get('/getSurgeryTypes', (req, res, next) => {
    SurgeryType.find().then(user => {
        var surgerytype = [];
        for (var i = 0; i < user.length; i++) {
            surgerytype[i] = user[i].type;
        }
        res.status(200).json({ surgerytype, user })
    }).catch(err => {
        res.status(404).json(err)
    });
})


module.exports = router;