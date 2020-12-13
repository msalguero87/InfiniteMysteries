var firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "Wiliam", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen", "Christopher", "Nancy", "Daniel", "Lisa", "Matthew", "Margaret", "Anthony", "Betty", "Donald", "Sandra", "Mark", "Ashley", "Paul", "Dorothy", "Steven", "Kimberly", "Andrew", "Emily", "Kenneth", "Donna", "Joshua", "Michelle", "Kevin", "Carol", "Brian", "Amanda", "George", "Melissa", "Edward", "Deborah", "Ronald", "Stephanie", "Timothy", "Rebecca", "Jason", "Laura", "Jeffrey", "Sharon", "Ryan", "Cynthia", "Jacob", "Kathleen", "Gary", "Amy", "Nicholas", "Shirley", "Eric", "Angela", "Jonathan", "Helen", "Stephen", "Anna", "Larry", "Brenda", "Justin", "Pamela", "Scott", "Nicole", "Brandon", "Marcela"];
var lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson"];

var occupations = [{ name: "Truck driver"}, { name: "Nurse" }, {name : "Supervisor"}, { name: "Salesperson"},{ name:  "Customer Service"},{ name:  "Accountant"},{ name:  "Teacher"},{ name:  "Doctor"},{ name:  "Pilot"},{ name:  "Manager"},{ name:  "Actor"},{ name:  "Cashier"},{ name:  "Secretary"},{ name:  "Chef"},{ name:  "Lawyer"}];
var weapons = ["Gun", "Knife", "Poison", "Rope", "Arrow"];
var hairColors = ["Brown", "Brown", "Brown", "Blonde", "Blonde", "Black", "Black", "Black", "White", "Gray"];

var heights = ["5'1", "5'2", "5'3", "5'4", "5'5", "5'6", "5'7", "5'8", "5'9", "6'0", "6'2", "6'3"];

var builds = ["Slim", "Fit", "Fat", "Muscular", "Skinny", "Well built"];

var complexions = ["Dark", "Light", "Fair", "Olive", "Tan", "Pale"];

var ages = ["Young Adult", "Middle Aged", "Old"];

function generateName(){
    var firstName = Math.floor(Math.random() * firstNames.length); 
    var lastName = Math.floor(Math.random() * lastNames.length); 
    return firstNames[firstName] + " " + lastNames[lastName];
}

function getAge(){
    var age = Math.floor(Math.random() * ages.length); 
    return ages[age];
}

function getHairColor(){
    var hair = Math.floor(Math.random() * hairColors.length); 
    return hairColors[hair];
}

function getHeight(){
    var height = Math.floor(Math.random() * heights.length); 
    return heights[height];
}

function getBuild(){
    var build = Math.floor(Math.random() * builds.length); 
    return builds[build];
}

function getComplexion(){
    var complexion = Math.floor(Math.random() * complexions.length); 
    return complexions[complexion];
}

function generatePerson(location, isGuilty){
    var person = {};
    person.name = generateName();
    person.guilty = isGuilty;
    if((Math.floor(Math.random() * 100)) >40)
        person.occupation = location.occupations[Math.floor(Math.random() * location.occupations.length)];
    else
        person.occupation = occupations[Math.floor(Math.random() * occupations.length)];
    person.hair = getHairColor();
    person.height = getHeight();
    person.build = getBuild();
    person.complexion = getComplexion();
    person.age = getAge();
    return person;
}

function generateCase(score){
    var criminalCase = {};
    criminalCase.victim = generateName();
    criminalCase.location = locations[Math.floor(Math.random() * locations.length)];
    criminalCase.suspects = [];
    var suspectCount = 3;
    if(score > 10) suspectCount++;
    if(score > 30) suspectCount++;
    if(score > 50) suspectCount++;

    var guiltyFound = false;
    for (let i = 0; i < suspectCount; i++) {
        var guilty = guiltyFound ? false : ( (i == suspectCount - 1) ? true : (Math.floor(Math.random() * 100)) > 50);
        criminalCase.suspects.push(generatePerson(criminalCase.location, guilty));
        guiltyFound = guiltyFound || guilty;
    }

    if((Math.floor(Math.random() * 100)) >70){
        var culprit = criminalCase.suspects.find(function(suspect){return suspect.guilty});
        var occupation = criminalCase.location.occupations.find(function(o){o.name === culprit.occupation.name});
        if(occupation && occupation.tools)
            criminalCase.weapons = occupation.tools[Math.floor(Math.random() * occupation.tools.length)];
            else
        criminalCase.weapon = weapons[Math.floor(Math.random() * weapons.length)];
    }else
        criminalCase.weapon = weapons[Math.floor(Math.random() * weapons.length)];

    return criminalCase;
}