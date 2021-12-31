module.exports = (app) => {
    const data = require('../controllers/formData.controller.js');

    //create a new form
    app.post('/create-byju-form', data.create);

    //retreive all form
    app.get('/get-byju-user-list', data.findAll);

    //retreive a single form with the formId
    app.get('/get-user-data/:formId', data.findOne);

    //Update a  form data with formId
    app.put('/update-form-data/:formId', data.update);

    //Delete a form with formId
    app.delete('/delete-form/:formId', data.delete);

}