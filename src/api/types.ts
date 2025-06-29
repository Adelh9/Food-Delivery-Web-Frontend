export interface ILoginRequest {
    email: string,
    password: string,
}

export interface IUpdateProfileRequest {
    fullName: string,
    birthDate: string,
    gender: string,
    address: string,
    phoneNumber: string
}

export type IRegisterRequest = IUpdateProfileRequest & ILoginRequest

export interface ILoginResponse {
    token: string,
}

export interface IUserInfoResponse {
    id: string,
    fullName: string,
    birthDate: string,
    gender: string,
    address: string,
    email: string,
    phoneNumber: string,
}

///Dishes
export interface IDish {
    name: string,
    description: string,
    price: number,
    image: string,
    vegetarian: boolean,
    rating: number | null,
    category: string,
    id: string,
}

export interface IPagination {
    count: number,
    current: number,
    size: number,
}

export interface IDishRequest {
    categories?: string[],
    vegetarian?: boolean,
    sorting?: string,
    page: number | string,
}

export interface IDishesResponse {
    dishes: IDish[],
    pagination: IPagination,
};

///Basket
export interface ICartItem {
    id: string,
    name: string,
    price: number,
    totalPrice: number,
    amount: number,
    image: string
}

export type IBasketResponse = ICartItem[]

export interface IAddToBasketRequest {
    dishId: string,
}

export interface IDeleteFromBasketRequest {
    dishId: string,
    increase: boolean,
}

///Ordes
export interface IOrderItem {
    id: string,
    deliveryTime: string,
    orderTime: string,
    status: string,
    price: number,
}

export type IGetOrdersResponse = IOrderItem[]

export interface IGetOrderResponse extends IOrderItem {
    dishes: ICartItem[],
    address: string,
}

export interface IConfrimOrderRequest {
    deliveryTime: string,
    address: string,
}

export interface ISetRateRequest {
    id: string,
    ratingScore: number,
}

