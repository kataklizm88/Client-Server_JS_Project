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

const renderGoodsItem = ({title="Товар скоро появится", price="Товара нет в наличии"}) => {
	return `<div class="col-sm-3 p-4 border bg-warning"  >
				<h5 class="card-title">${title}</h5>
			    <p class="card-text">${price}</p>
			    <a href="#" class="btn btn-primary">Купить товар</a>
			</div>`;
};

const renderGoodsList = (list=goods) => {
	let goodsList = list.map(item => renderGoodsItem(item));
	document.querySelector('.row').innerHTML = goodsList.join('');
}
renderGoodsList(goods);