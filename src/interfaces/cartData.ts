import { product } from "./products";

export interface CartData {
    status:         string;
    message?:       string;
    numOfCartItems: number;
    cartId:         string;
    data:           Data;
}

export interface Data {
    _id:            string;
    cartOwner:      string;
    products:       ProductElement[];
    createdAt:      Date;
    updatedAt:      Date;
    __v:            number;
    totalCartPrice: number;
}

export interface ProductElement {
    count:   number;
    _id:     string;
    product: product;
    price:   number;
}

