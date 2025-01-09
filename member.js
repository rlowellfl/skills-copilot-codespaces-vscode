function skillsMember()
{
    var member = {
        name: "John",
        age: 30,
        skills: ["JavaScript", "HTML", "CSS"],
        display: function() {
            console.log(this.name + " is " + this.age + " years old.");
            console.log(this.name + " has the following skills:");
            this.skills.forEach(function(skill) {
                console.log(skill);
            });
        }
    };

    return member;
}