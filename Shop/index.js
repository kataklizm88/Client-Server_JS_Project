const URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'

const service = (url) => fetch(url)
    .then((res)=> {
        return res.json()
     })



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


    Vue.component('item-card',{
        props:[
            'item'
        ],
        template:`
        <div class="col-sm-3 p-4 border bg-warning" >
            <h5 class="card-title">{{item.product_name}}</h5>
            <p class="card-text">{{item.price}}</p>
            <a href="#" class="btn btn-primary">Купить товар</a>
        </div>`
    })

    Vue.component('basket-item',{
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
                  content
               </div>
            </div>`           
    })

    Vue.component('search',{
        props:['searchline'],
        template:`
            <div class="d-flex">
                <slot> </slot>
                <custom-button class="btn btn-outline-success" @some_click="filterGoods" button_name='Искать'> </custom-button>
            </div>`            
    })


    Vue.component('custom-button',{
        props:['button_name'],
        template:`
            <button  type="button" v-on:click="$emit('some_click')" >{{button_name}}</button>`
    })



    const app = new Vue({
        el: '#app',
        data: {
            name: "Jack",
            items: [],
            filtederItems: [],
            searchline: '',
            isVisibleCart: false,
        },

        methods: {
            fetchGoods(){
                return service(URL).then((data)=>{
                    this.items = data;
                    this.filteredItems = data
                })
            },

            setVisionCard() {
                this.isVisibleCart = !this.isVisibleCart
            },

            filterGoods(){
                this.filteredItems = this.items.filter(({ product_name }) => {
                return product_name.match(new RegExp(this.search, 'gui'))
                })
            },

            visibleCartOn(){
                this.isVisibleCart = true
                console.log(this.isVisibleCart)
            },

            visibleCartOff(){
                this.isVisibleCart = false
            }
        },
        computed: {
            get_total() {
            return this.filteredItems.reduce((prev, { price }) => {
              return prev + price;
            }, 0)
          }
        },
        mounted(){
            this.fetchGoods()
        }
    })
}

window.onload = init
