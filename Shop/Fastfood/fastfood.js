class Burger {
  price = 0
  calories = 0

  add_spices() {
    this.price += + 15
  }
  add_mayonnaise() {
    this.price +=20
    this.calories +=5
  }

  with_cheeze(){
    this.price += 10
    this.calories += 20
  }
  with_salad(){
    this.price += 20
    this.calories += 5
  }
  with_potato(){
    this.price += 15
    this.calories += 10
  }
}


class SmallBurger extends Burger {
  price = 50
  calories = 20
}

class BigBurger extends Burger {
  price = 100
  calories = 50
}


class Choise {
  constructor(burger_type='', topping='', additional=''){
    this.burger_type = burger_type;
    this.topping = topping;
    this.additional = additional;
    let burger = Object
    if (this.burger_type === 'Big'){
      this.burger = new BigBurger;
    } else if (this.burger_type === 'Small'){
      this.burger = new SmallBurger;
    } else {
      alert("Вы ввели неполные данные ")
      throw new SyntaxError("Вы ввели неполные данные");
    }
  }
  choose_topping () {
    if (this.topping === 'cheeze'){
      this.burger.with_cheeze()
    } else if (this.topping === 'salad'){
      this.burger.with_salad()
    } else if (tthis.opping === 'potato'){
      this.burger.with_potato()
    } else{
    alert("Такой добавки нет")
      throw new SyntaxError("Такой добавки нет");
    }
  }
  choose_additional() {
    if (this.additional === 'spice'){
      this.burger.add_spices()
    }else if (this.additional === 'mayonnaise'){
      this.burger.add_mayonnaise()
    }else if (this.additional === 'no'){
  
    }else{
      alert("Вы ввели неполные данные")
      throw new SyntaxError("Вы ввели неполные данные");
    }
  }
  result(){
    alert(`Ваш бургер стоит ${this.burger.price} рублей, и в нем ${this.burger.calories} калорий`)
  }  
}

window.Storage.Choise = Choise