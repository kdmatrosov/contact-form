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
        self.saveContact = function (contact) {

            return true;
        };
    });