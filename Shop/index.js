const goods = [
	{ title: 'Shirt', price: 150 },
	{ title: 'Socks', price: 50 },
	{ title: 'Jacket', price: 350 },
	{ title: 'Shoes' },
	{ title: 'Shirt', price: 150 },
	{ title: 'Socks', price: 50 },
	{ title: 'Jacket', price: 350 },
	{ title: 'Shoes' },
	{ title: 'Shirt', price: 150 },
	{ title: 'Socks', price: 50 },
	{ title: 'Jacket', price: 350 },

];


class GoodsItem {
    constructor ({title="Товар скоро появится", price="Товара нет в наличии"}){
        this.title = title;
        this.price = price;
    }
    render (){
        return `<div class="col-sm-3 p-4 border bg-warning"  >
			        <h5 class="card-title">${this.title}</h5>
			         <p class="card-text">${this.price}</p>
			        <a href="#" class="btn btn-primary">Купить товар</a>
		        </div>`;
    }
}


class RenderGoodsList {
   constructor(list=goods){
       this.list = list
       this.goodsList = this.list.map((item) => (new GoodsItem(item)).render())
   }

   render(){
       document.querySelector('.row').innerHTML = this.goodsList.join('');
   }

   getSumm(){
        let sum = 0;
        const sum_price = this.list.map(item => item.price)
        for (var i = 0; i < sum_price.length; i++){
            if (isNaN(sum_price[i]) === false) {
                sum += sum_price[i]
            }
        };
        const sum_render = `<button type="button" class="summ btn btn-success">Общая сумма товаров: ${sum}</button>`
        return document.querySelector('.summ').innerHTML = sum_render
   }
}


const goodsList = new RenderGoodsList();
goodsList.render()
goodsList.getSumm()