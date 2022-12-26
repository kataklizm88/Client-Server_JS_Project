import {service} from '../services.js'
import {GET_BASKET_GOODS} from '../constants.js'


export const goodsItem = Vue.component('goods-item',{
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

export const basketItem = Vue.component('basket-item',{
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

export const basketGoodsItem = Vue.component('basket-goods-item', {
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