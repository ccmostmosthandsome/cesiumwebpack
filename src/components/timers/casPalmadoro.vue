<template>
    <div style="display: inline-block;">
        <div>{{ timer }}</div> 
    </div>
</template>

<script>
import Rx from 'rxjs';
import moment from "moment";
export default {
    name: 'casPalmadoro',
    domStreams: ['plus$', 'minus$'],
    data: function(){
        return {
            mintues: null,
            seconds: null,
            date : {}
        }
    },
    subscriptions() {
        const start = 1500;
        var count$ = Rx.Observable
            .timer(1000, 1000) // timer(firstValueDelay, intervalBetweenValues)
            .map(i => start - i)
            .take(start + 1)
        //.do(i => console.log(i));
        return {
            count: count$
        }
    },
    methods: {
        moment(){
            return moment();
        },
        convertTime(){
            

           
            this.minutes = Math.floor(this.count / 60)
            
            //console.log("min min ???",Math.floor(this.count / 60) )
            
            this.seconds = Math.floor((this.count) % 60);
            return this.minutes + ":" + (this.seconds < 10 ? '0' : '') + this.seconds;
        }
    },
    computed: {
        timer() {
           // console.log(this.convertTime(),this.count);
            return this.convertTime();
            /*
            let duration = moment.duration(this.count, 'milliseconds');
            let fromMinutes = Math.floor(duration.asMinutes());
            let fromSeconds = Math.floor(duration.asSeconds() - fromMinutes * 60);
            console.log("this count computed", this.count,  fromSeconds);

            return Math.floor(duration.asSeconds()) >= 60 ? (fromMinutes <= 9 ? '0' + fromMinutes : fromMinutes) + ':' + (fromSeconds <= 9 ? '0' + fromSeconds : fromSeconds) :
                '00:' + (fromSeconds <= 9 ? '0' + fromSeconds : fromSeconds);
            */

        }
    }

}
</script>

<style>

</style>
