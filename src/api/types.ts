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

// User Gender Enum
export enum UserGender {
    MALE = 'Male',
    FEMALE = 'Female'
}

// Order Status Enum
export enum OrderStatus {
    PENDING = 'Pending',
    CONFIRMED = 'Confirmed',
    PREPARING = 'Preparing',
    DELIVERING = 'Delivering',
    DELIVERED = 'Delivered',
    CANCELLED = 'Cancelled'
}

// Dish Categories Enum
export enum DishCategory {
    MAIN = 'Main',
    APPETIZER = 'Appetizer',
    DESSERT = 'Dessert',
    BEVERAGE = 'Beverage',
    SALAD = 'Salad',
    SOUP = 'Soup'
}

// Sorting Options Enum
export enum SortOption {
    NAME_ASC = 'nameAsc',
    NAME_DESC = 'nameDesc',
    PRICE_ASC = 'priceAsc',
    PRICE_DESC = 'priceDesc',
    RATING_DESC = 'ratingDesc'
}

// API Response Types
export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
}

export interface ApiError {
    message: string;
    status: number;
    errors?: Record<string, string[]>;
}

// Form Validation Types
export interface ValidationError {
    field: string;
    message: string;
}

export interface FormValidation {
    isValid: boolean;
    errors: ValidationError[];
}

// UI State Types
export interface LoadingState {
    isLoading: boolean;
    error: string | null;
}

export interface PaginationState {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
}

