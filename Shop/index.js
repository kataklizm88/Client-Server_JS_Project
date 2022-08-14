const URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'


class GoodsItem {
    constructor ({product_name="Товар скоро появится", price="Товара нет в наличии"}){
        this.product_name = product_name;
        this.price = price;
    }
    render (){
        return `<div class="col-sm-3 p-4 border bg-warning"  >
			        <h5 class="card-title">${this.product_name}</h5>
			         <p class="card-text">${this.price}</p>
			        <a href="#" class="btn btn-primary">Купить товар</a>
		        </div>`;
    }
}


class RenderGoodsList {
   items = []

   fetchGoods(url){
    return new Promise((resolve) => {
        let xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.send()
        xhr.onload = function(){
            resolve(JSON.parse(xhr.response))
        }
    })
   }

  render(data) {
    const goods = data.map(item => {
      const goodItem = new GoodsItem(item);
      return goodItem.render()
    }).join('');
  
    document.querySelector('.row').innerHTML = goods;
  }

   getSumm(data){
        let sum = 0;
        const sum_price = data.map(item => item.price)
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
goodsList.fetchGoods(URL).then((data) =>{
    goodsList.render(data);
    goodsList.getSumm(data);
})
