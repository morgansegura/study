window.onload = function() {
    new Vue({
        el: "#app",
        data: {
            title: "Hello world!"
        },
        methods: {
            changeTitle: function(event){
                this.title = event.target.value;
            }
        }
    });
};
