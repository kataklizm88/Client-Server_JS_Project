const URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'
const BASE_URL = "http://localhost:8000"
const GET_GOODS_ITEMS = `${BASE_URL}/goods.json`
const GET_BASKET_GOODS = `${BASE_URL}/basket_goods`


function service(url, method="GET", body) {
  return fetch(url, {
    headers: Object.assign({}, body ? {
      'Content-Type': 'application/json; charset=utf-8'
    } : {}),
    method,
    body: JSON.stringify(body)
  })
  .then((res) => res.json())
}


function init(){
    Vue.component('nav-comp',{
        template:`
            <div class="navbar navbar-expand-lg navbar-light bg-info">
                <div class="container-fluid">
                    <slot> </slot>
                </div>
            </div>`
    })

    Vue.component('main-comp',{
        template:`
            <div class="container" >
                <slot> </slot>
            </div>`
    })

    Vue.component('basket',{
        template:`
        <div class="fixed-area" >
            <slot> </slot>
        </div>`
    })

    Vue.component('goods-item',{
        props:[
            'item'
        ],
        template:`
        <div class="col-sm-3 p-4 border bg-warning" >
            <h5 class="card-title">{{item.product_name}}</h5>
            <p class="card-text">{{item.price}}</p>
            <custom-button  class="btn btn-primary" @click="addGood" button_name='Добавить' ></custom button>
        </div>`,
        methods: {
            addGood(){
                service(GET_BASKET_GOODS, 'PUT', {
                    id : this.item.id
                })
            }
        }
    })

    Vue.component('basket-item',{
        data(){
            return {
                basketGoodsItems : []
            }
        },
        template:`
            <div class="basket-card">
                <div style="text-align:right ">
                    <button type="button"  class="btn-close" aria-label="Close" v-on:click="$emit('my_click')"></button>
                </div>
               <div class="basket-card__header">
                  <h1 class="basket-card__header__title">basket card</h1>
                  <div class="basket-card__header__delete-icon"> </div>
               </div>
               <div class="basket-card__content">
                   <basket-goods-item v-for="item in basketGoodsItems" :item="item" @delete="deleteBasketGood" @add="addGood"></basket-goods-item>
               </div>
            </div>`,
        mounted(){
            service(GET_BASKET_GOODS).then((data)=>{
                this.basketGoodsItems = data
            })
        },
        methods: {
            deleteBasketGood(id) {
              service(GET_BASKET_GOODS, "DELETE", {
                id
              }).then((data) => {
                this.basketGoodsItems = data
              })
            },
            addGood(id) {
              service(GET_BASKET_GOODS, 'PUT', {
                id
              }).then((data) => {
                this.basketGoodsItems = data
              })
            }
          }
    })

    Vue.component('basket-goods-item', {
        props: [
          'item'
        ],
        template: `
          <div class="basket-card__content___item">
             <h3>{{item?.data?.product_name}}</h3>
             <div>count: {{item?.count}}</div>
             <div>total: {{item?.total}}</div>
             <custom-button class="btn btn-primary" @click="$emit('add', item.data.id)" button_name='Добавить'>добавить</custom-button>
             <custom-button class="btn btn-primary" @click="$emit('delete', item.data.id)" button_name='Удалить'>удалить</custom-button>
          </div>
        `
      })
   
    Vue.component('custom-button',{
        props:['button_name'],
        template:`
            <button type="button" v-on:click="$emit('click')">
                {{button_name}}
            </button>`
    })

    Vue.component('search',{
        props:[
            'value'
        ],
        template:`
            <div class="d-flex">
                <input type="text" class="form-control me-2" placeholder="Search" aria-label="Search" :value="value" @input="$emit('input', $event.target.value)"/>	
               
            </div>`
    })

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