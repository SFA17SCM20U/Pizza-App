class Pizza{

    static fetchPizzaList(){
        return fetch('https://aquent-pizza-api.herokuapp.com/pizzas')
        .then((response) =>{
            return response.json();
        });
    }

}

export default Pizza;