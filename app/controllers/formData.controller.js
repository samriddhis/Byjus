const FormData = require('../models/formData.model.js');

//Create and save new forms
exports.create = (req, res) => {
    //validate request
    if (!req.body) {
        return res.status(400).send({
            message: "data  content can not be empty"
        })
    }
    // Create a form
    console.log(req)
    const data = new FormData({
        name: req.body.name,
        email_id: req.body.email_id,
        contact: req.body.contact,
        address: req.body.address,
        dob: req.body.dob,
    })
    data.save()
        .then(result => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "sm."
            })
        })
}

//Reterive and return all forms from the database
exports.findAll = (req, res) => {
    FormData.find()
        .then(data => {
            res.send({ "byjus": data });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving forms."
            })
        })

}

//retreive a single form with the formId
exports.findOne = (req, res) => {
    FormData.findById(req.params.formId)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "form id not found " + req.params.formId
                })
            }
            res.send(data);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "form not found with id " + req.params.formId
                });
            }
            return res.status(500).send({
                message: "Error retrieving form with id " + req.params.formId
            });
        })

}


//Update a new Form with formId
exports.update = (req, res) => {
    //Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Form content can not be empty"
        })
    }
    // Find Form and update it with the request body
    FormData.findByIdAndUpdate(req.params.formId, {
        name: req.body.name,
        email_id: req.body.email_id,
        contact: req.body.contact,
        address: req.body.address,
        dob: req.body.dob,
    }, { new: true })
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    message: "Form not found with id " + req.params.formId
                })
            }
            res.send(data);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Form not found with id " + req.params.formId
                })
            }
            return res.status(500).send({
                message: "Error updating Form with id " + req.params.formId
            })
        })

}

//Delete a form with formId
exports.delete = (req, res) => {
    FormData.findByIdAndRemove(req.params.formId)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Form not found with id " + req.params.formId
                })
            }
            res.send(data);
        })
        .catch(error => {
            if (error.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Form not found with id " + req.params.formId
                })
            }
            return res.status(500).send({
                message: "Could not delete form with id " + req.params.formId
            })
        })
}

