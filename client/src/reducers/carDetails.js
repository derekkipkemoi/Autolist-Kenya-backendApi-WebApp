import { 
    CAR_DETAILS
} from '../actions/types'

const DEFAULT_STATE = {
    carDetails: {},
    carImages: [],
    carFeatures: [],
    carSeller: {}
}


export default(state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case CAR_DETAILS:
            return{...state, carDetails: action.payload.carDetails, carImages: action.payload.carImages, carFeatures: action.payload.carFeatures, carSeller: action.payload.carSeller}
        default:
           return state;
    }
}


