// sometimes for handleing error of the other lib that included before this lib we put ;
// in the fisrt line of the library
;
//this makes new Context for variable
//IIF (immediately invoeld function)

(
  //we pass window and jquery in to the function
  function (global, $) {
    var Greetr = function (firstname, lastname, language) {
      //returen the Greeter init function so this help us every time
      // for building a G object, no need to call new every time
        return new Greetr.init(firstname, lastname, language);
    }

    var supportedLangs = ['en', 'es'];
    var greetings = {
        en: 'hello',
        es: 'hola'
    };

    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    };

    var logMessages = {
        en: 'Logged in',
        es: 'Inocio sesion'
    };


    // for every object we build no need to save the function
    // we put all function in to prototype to share those between the classes

    Greetr.prototype = {
        fullName: function () {
            return this.firstname + ' ' + this.lastname;
        },
        validate: function () {
            if (supportedLangs.indexOf(this.language) === -1) {
                throw "Invalid Language";
            }
        },
        greeting: function () {
            return greetings[this.language] + ' ' + this.firstname;
        },
        formalGreeting: function () {
            return formalGreetings[this.language] + ' ' + this.firstname;
        },
        greet: function (formal) {

            var msg;
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }
            if (console) {
                console.log(msg);
            }

            return this;
        },
        log: function () {
            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }
            return this;
        },
        setLang: function (lang) {
            this.language = lang;
            this.validate();
            return this;
        }
    };


    Greetr.init = function (firstname, lastname, language) {
        var self = this;
        // if we had the firstname put that else make it to defult ''
        self.firstname = firstname || '';
        self.lastname = lastname || '';
        self.language = language || 'en';
    }

    // make a pointer between the prototype to greeter init function
    Greetr.init.prototype = Greetr.prototype;
    // make the variable global and attach that to window
    global.G$ = global.Greetr = Greetr;
}(window, jQuery));
