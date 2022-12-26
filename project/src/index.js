import './style.css'
import {BASE_URL, GET_GOODS_ITEMS, GET_BASKET_GOODS} from './constants.js'
import {service} from './services.js'
import {nav, main, basket, button, search} from './components/simple-comp.js'
import {goodsItem, basketItem, basketGoodsItem} from './components/items-comp.js'



function init(){
    const app = new Vue({
        el: '#app',
        data: {
            name: "Jack",
            items: [],
            searchline: '',
            isVisibleCart: false,
        },
        methods: {
            fetchGoods(){
                return service(GET_GOODS_ITEMS).then((data)=>{
                    this.items = data;
                })
            },

            setVisionCard() {
                this.isVisibleCart = !this.isVisibleCart
            },

            visibleCartOn(){
                this.isVisibleCart = true
            },

            visibleCartOff(){
                this.isVisibleCart = false
            },
            onSearchComponent(value){
                this.searchline = value
            }
        },
        computed: {
            get_total() {
            return this.items.reduce((prev, { price }) => {
              return prev + price;
                }, 0)
            },
            filterGoods(){
                return this.items.filter(({ product_name }) => {
                    return product_name.match(new RegExp(this.searchline, 'gui'))
                    })
                },
        },
        mounted(){
            this.fetchGoods()
        }
    })
}

window.onload = init