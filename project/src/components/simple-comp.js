export const nav = Vue.component('nav-comp',{
        template:`
            <div class="navbar navbar-expand-lg navbar-light bg-info">
                <div class="container-fluid">
                    <slot> </slot>
                </div>
            </div>`
    })

export const main = Vue.component('main-comp',{
        template:`
            <div class="container" >
                <slot> </slot>
            </div>`
    })

export const basket = Vue.component('basket',{
        template:`
        <div class="fixed-area" >
            <slot> </slot>
        </div>`
    })

export const button = Vue.component('custom-button',{
        props:['button_name'],
        template:`
            <button type="button" v-on:click="$emit('click')">
                {{button_name}}
            </button>`
    })

export const search = Vue.component('search',{
        props:[
            'value'
        ],
        template:`
            <div class="d-flex">
                <input type="text" class="form-control me-2" placeholder="Search" aria-label="Search" :value="value" @input="$emit('input', $event.target.value)"/>
            </div>`
    })