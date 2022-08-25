const URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'

const service = (url) => fetch(url)
    .then((res)=> {
        return res.json()
     })


const app = new Vue({
    el: '#app',
    data: {
        items: [],
        filtederItems: [],
        searchline: '',
        isVisibleCart: false,
    },

    methods: {
        fetchGoods(){
            return service(URL).then((data)=>{
                this.items = data
            })
          },

        filterGoods(){

        },

        visibleCartOn(){
            this.isVisibleCart = true
            console.log(this.isVisibleCart)
        },

        visibleCartOff(){
            this.isVisibleCart = false
        }


    },

    mounted(){
        this.fetchGoods()

    }
})
