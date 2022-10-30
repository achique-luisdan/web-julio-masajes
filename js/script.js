let category = 1;
let service = 1;

let SERVICES_BY_CATEGORIES = [
  [
    1,
    2,
    3,
    4
  ],
  [
    5,
    6
  ],
  [
    7
  ],
  [
    8
  ]
]

function renderCategories(){
  let categories = document.getElementsByClassName('category')
  for (let i = 0; i < categories.length; i++) {
    categories[i].className = categories[i].className.replace("active-category", "");
    if (i === category -1){
      categories[i].className += " active-category";
    }
  }
  showServicesByCategory();
}

function selectCategory (index){
  category = index;
  selectInformation (SERVICES_BY_CATEGORIES[index-1][0])
  renderCategories();
}

function showServicesByCategory(){
  let services = document.getElementsByClassName('service')
  for (let i = 0; i < services.length; i++) {
    services[i].style.display = "none";
    if (findService(i)){
      services[i].style.display = "block";
    }
  }
}

function findService(index){
  return SERVICES_BY_CATEGORIES[category -1].findIndex (serviceElement => {
    return serviceElement === index + 1;
  }) > -1;
}



function showInformation(){
  let informations = document.getElementsByClassName('information')
  let services = document.getElementsByClassName('service')
  for (let i = 0; i < informations.length; i++) {
    // informations[i].style.visibility = 'hidden';
    informations[i].className = informations[i].className.replace("show", "");
    services[i].className = services[i].className.replace("active-service", "");
    if (i === service -1){
      // informations[i].style.visibility ='visible';
      services[i].className += " active-service";
      informations[i].className += " show";
    }
  }
}

function selectInformation (index){
  service = index;
  showInformation();
}

renderCategories()

showInformation();


function generateNumber (max, min=1){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class ElementUI {
  column = null;
  row = null;
}

class Rectangle extends ElementUI {
  color =  null;
  generatePosition(){
    let num1 =  generateNumber(10);
    let num2 = generateNumber(8);
    super.column = null;
    super.row = null;
    while(notRepeat(num1, num2)){
      if (notRepeat(num1, num2)) {
      num1 =  generateNumber(10);
      num2 = generateNumber(8);
      } else {
        this.column = num1;
        this.row = num2;
        break;
      }
    }
    super.column = num1;
    super.row = num2;

    this.generateColor();
    if (this.column >= 3 && this.column <= 9){
      if (this.row >=3 && this.row <= 6){
        this.color = 'transparent'
      }
    }
  }
  generateColor(){
    const num = generateNumber(4);
    if (num === 1){
      this.color = "primary";
    } else if (num === 2){
      this.color = "secondary";
    } else if (num === 3){
      this.color = "on-surface";
    }
    else if (num === 4){
      this.color = "transparent";
    }
  }
}


var rectangles = new Array();
for (let i= 0; i < 80; i = i +1){
  let rectangle = new Rectangle();
  rectangles.push(rectangle);
}

function notRepeat(column, row){
  return rectangles.filter (rectangle => {
    return rectangle.column === column && rectangle.row === row;
  }).length > 0;
}

function existent(column, row){
  return rectangles.filter (rectangle => {
    return rectangle.column === column && rectangle.row === row;
  }).length
}


function animation(){
  let rectanglesUI = document.getElementsByClassName('rectangle');
  for (let i= 0; i < 80; i = i +1){
    rectangles[i].generatePosition();
    rectanglesUI[i].style.gridColumn = rectangles[i].column;
    rectanglesUI[i].style.gridRow = rectangles[i].row;
    rectanglesUI[i].className = 'rectangle'
    rectanglesUI[i].className += ` show ${rectangles[i].color}`;
  }
}

setInterval(animation, 2000);