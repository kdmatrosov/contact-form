angular.module("contact-form.services", [])
    .service('ContactFormService', function () {
        var self = this;
        self.initNewContact = function () {
            return angular.copy({
                name: {
                    first: '',
                    last: ''
                },
                company: {
                    name: '',
                    industry: '',
                    address: {
                        email: '',
                        phone: '',
                        place: ''
                    }
                },
                event: {
                    attendees: '',
                    date: '',
                    description: ''
                }
            });
        };

        var regex = {
            date: /^(0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])[/](19|20)\d\d$/,
            phone: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s]\d{3}[-]\d{4}$/,
            email: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
        };
        var errorMessages = {
            date: 'Wrong date format',
            phone: 'Wrong phone format',
            email: 'Wrong email format'
        };

        function isNullOrUndefinedOrEmpty(val) {
            return val === undefined || val === null || val === "";
        }

        self.saveContact = function (contact) {
            var res = {
                error: false, message: '', name: contact.name.first + ' ' + contact.name.last
            };
            var test =
                regex.date.test(contact.event.date);
            if (!test) {
                res = {
                    type: 'date',
                    error: true,
                    message: errorMessages.date
                }
            }
            if (!isNullOrUndefinedOrEmpty(contact.company.address.phone)) {
                test =
                    regex.phone.test(contact.company.address.phone);
                if (!test) {
                    res = {
                        type: 'phone',
                        error: true,
                        message: errorMessages.phone
                    }
                }
            }
            else {
                contact.company.address.phone = '';
            }
            if (!isNullOrUndefinedOrEmpty(contact.company.address.email)) {
                test =
                    regex.email.test(contact.company.address.email);
                if (!test) {
                    res = {
                        type: 'email',
                        error: true,
                        message: errorMessages.email
                    }
                }
            }
            else {
                contact.company.address.email = '';
            }
            if (isNullOrUndefinedOrEmpty(contact.event.attendees)) {
                contact.event.attendees = 0;
            }
            return res;
        };
    });