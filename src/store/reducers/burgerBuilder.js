import * as actionTypes from "../actions/actionTypes";

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    buildingBurger: false
}
const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 2.0,
    cheese: 3.5,
    meat: 5.0
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.SET_INGREDIENTS):
            return {
                ...state,
                //ingredients: action.ingredients,
                //here we are trying to re-arrange ingredients
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                error: false,
                totalPrice: 4,
                buildingBurger: false
            }
        case (actionTypes.FETCH_INGREDIENTS_FAILED):
            return {
                ...state,
                error: true
            }
        case (actionTypes.ADD_INGREDIENT):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    //in es6 dyanmically overwite property in object
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                buildingBurger: true
            }
        case (actionTypes.REMOVE_INGREDIENT):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    //in es6 dyanmically overwite property in object
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                buildingBurger: true
            }
        default:
            return state;
    }
}
export default reducer;