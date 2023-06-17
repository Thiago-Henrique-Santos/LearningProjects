class Person {
    constructor (id, firstName, lastName, birthdate, height, weight) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.height = height;
        this.weight = weight;
        this.birthdate = new Date(birthdate);
    }

    get id() {
        return this.id;
    }

    get firstName() {
        return this.firstName;
    }

    get lastName() {
        return this.lastName;
    }

    get height() {
        return this.height;
    }

    get weight() {
        return this.weight;
    }

    get birthdate() {
        const day  = this.birthdate.getUTCDate();
        const month = this.birthdate.getUTCMonth()+1;
        const year = this.birthdate.getFullYear();
        const birthdate = [day, month, year];
        return birthdate;
    }

    get fullName() {
        const fullName = this.firstName + this.lastName;
        return fullName;
    }

    get age() {
        const currentDate = new Date();

        let age = 0;
        if (currentDate.getMonth()+1 >= this.birthdate.getUTCMonth()+1 && currentDate.getDate() >= this.birthdate.getUTCDate())
            age = currentDate.getYear() - this.birthdate.getYear();
        else
            age = currentDate.getYear() - this.birthdate.getYear() - 1;

        return age;
    }
}