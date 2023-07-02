import { Product } from "../models/product.model";
import { User } from "../models/user.model";
import * as bcrypt from "bcryptjs";

export const sampleProducts: Product[] = [
  {
    name: "Levi Strauss & Co Pants",
    slug: "levi-strauss-pants",
    category: "Pants",
    image: "../images/p1.jpg",
    price: 220,
    countInStock: 24,
    brand: "Levi Strauss & Co",
    rating: 4.7,
    numReviews: 17,
    description: "high quality product",
    isSale: true,
    isLatest: false,
  },
  {
    name: "Lacoste Pants",
    slug: "lacoste-free-pants",
    category: "Pants",
    image: "../images/p2.jpg",
    price: 229,
    countInStock: 16,
    brand: "Lacoste",
    rating: 4.5,
    numReviews: 17,
    description: "high quality product",
    isSale: true,
    isLatest: false,
  },
  {
    name: "Ralph Lauren Pant",
    slug: "ralph-lauren-pant",
    category: "Pants",
    image: "../images/p3.jpg",
    price: 278,
    countInStock: 15,
    brand: "Ralph Lauren",
    rating: 4.8,
    numReviews: 14,
    description: "high quality product",
    isSale: true,
    isLatest: false,
  },
  {
    name: "Nike Slim Pant",
    slug: "nike-slim-pant",
    category: "Pants",
    image: "../images/p4.jpg",
    price: 178,
    countInStock: 15,
    brand: "Nike",
    rating: 4.5,
    numReviews: 14,
    description: "high quality product",
    isSale: true,
    isLatest: false,
  },
  {
    name: "BAGGY Pant",
    slug: "baggy-pant",
    category: "Pants",
    image: "../images/p5.jpg",
    price: 75,
    countInStock: 0,
    brand: "Baggy",
    rating: 4.5,
    numReviews: 14,
    description: "high quality product",
    isSale: false,
    isLatest: false,
  },
  {
    name: "CARGO Pant",
    slug: "cargo-pant",
    category: "Pants",
    image: "../images/p6.jpg",
    price: 98,
    countInStock: 13,
    brand: "Cargo",
    rating: 4.5,
    numReviews: 14,
    description: "high quality product",
    isSale: false,
    isLatest: true,
  },
  {
    name: "CARGO Pant",
    slug: "cargo-pant2",
    category: "Pants",
    image: "../images/p7.jpg",
    price: 89,
    countInStock: 15,
    brand: "Cargo",
    rating: 4.5,
    numReviews: 12,
    description: "high quality product",
    isSale: false,
    isLatest: true,
  },

  {
    name: "GAP shirt",
    slug: "gap-shirt",
    category: "Shirts",
    image: "../images/s1.jpg",
    price: 260,
    countInStock: 10,
    brand: "GAP",
    rating: 4.7,
    numReviews: 13,
    description: "high quality shirt",
    isSale: false,
    isLatest: false,
  },
  {
    name: "Nike Slim shirt",
    slug: "nike-slim-shirt",
    category: "Shirts",
    image: "../images/s2.jpg",
    price: 120,
    countInStock: 10,
    brand: "Nike",
    rating: 4.5,
    numReviews: 10,
    description: "high quality shirt",
    isSale: false,
    isLatest: false,
  },
  {
    name: "Nike Slim shirt",
    slug: "nike-slim-shirt2",
    category: "Shirts",
    image: "../images/s3.jpg",
    price: 120,
    countInStock: 10,
    brand: "Nike",
    rating: 4.5,
    numReviews: 10,
    description: "high quality shirt",
    isSale: false,
    isLatest: false,
  },
  {
    name: "Adidas Fit Shirt",
    slug: "adidas-fit-shirt",
    category: "Shirts",
    image: "../images/s4.jpg",
    price: 200,
    countInStock: 20,
    brand: "Adidas",
    rating: 4.6,
    numReviews: 10,
    description: "high quality product",
    isSale: true,
    isLatest: false,
  },
  {
    name: "Uniqlo Shirt",
    slug: "uniqlo-shirt",
    category: "Shirts",
    image: "../images/s5.jpg",
    price: 300,
    countInStock: 22,
    brand: "Uniqlo",
    rating: 4.5,
    numReviews: 10,
    description: "high quality product",
    isSale: false,
    isLatest: true,
  },
  {
    name: "Adidas Fit Shirt",
    slug: "adidas-fit-shirt2",
    category: "Shirts",
    image: "../images/s6.jpg",
    price: 130,
    countInStock: 20,
    brand: "Adidas",
    rating: 4.0,
    numReviews: 10,
    description: "high quality product",
    isSale: false,
    isLatest: true,
  },
  {
    name: "MANGA Shirt",
    slug: "manga-shirt",
    category: "Shirts",
    image: "../images/s7.jpg",
    price: 150,
    countInStock: 0,
    brand: "Manga",
    rating: 4.0,
    numReviews: 10,
    description: "high quality product",
    isSale: false,
    isLatest: false,
  },
  {
    name: "MANGA Shirt",
    slug: "manga-shirt2",
    category: "Shirts",
    image: "../images/s8.jpg",
    price: 120,
    countInStock: 20,
    brand: "Manga",
    rating: 4.0,
    numReviews: 10,
    description: "high quality product",
    isSale: true,
    isLatest: false,
  },
  {
    name: "MANGA Shirt",
    slug: "manga-shirt3",
    category: "Shirts",
    image: "../images/s9.jpg",
    price: 160,
    countInStock: 20,
    brand: "Manga",
    rating: 4.0,
    numReviews: 10,
    description: "high quality product",
    isSale: true,
    isLatest: false,
  },
  {
    name: "MANGA Shirt",
    slug: "manga-shirt4",
    category: "Shirts",
    image: "../images/s10.jpg",
    price: 160,
    countInStock: 20,
    brand: "Manga",
    rating: 4.0,
    numReviews: 10,
    description: "high quality product",
    isSale: true,
    isLatest: false,
  },
  {
    name: "Calvin Klein Shirt",
    slug: "calvin-klein-shirt",
    category: "Shirts",
    image: "../images/s10.jpg",
    price: 180,
    countInStock: 20,
    brand: "Calvin Klein",
    rating: 4.4,
    numReviews: 15,
    description: "high quality product",
    isSale: false,
    isLatest: true,
  },
  {
    name: "Frame Shirt",
    slug: "frame-shirt",
    category: "Shirts",
    image: "../images/s11.jpg",
    price: 230,
    countInStock: 20,
    brand: "Frame",
    rating: 4.0,
    numReviews: 10,
    description: "high quality product",
    isSale: false,
    isLatest: true,
  },
  {
    name: "Frame Shirt",
    slug: "frame-shirt2",
    category: "Shirts",
    image: "../images/s12.jpg",
    price: 230,
    countInStock: 20,
    brand: "Frame",
    rating: 4.0,
    numReviews: 10,
    description: "high quality product",
    isSale: false,
    isLatest: false,
  },
  {
    name: "OVERSİZE Shirt",
    slug: "oversize-shirt",
    category: "Shirts",
    image: "../images/s13.jpg",
    price: 129,
    countInStock: 20,
    brand: "Oversize",
    rating: 4.2,
    numReviews: 10,
    description: "high quality product",
    isSale: false,
    isLatest: false,
  },
  {
    name: "OVERSİZE Shirt",
    slug: "oversize-shirt2",
    category: "Shirts",
    image: "../images/s14.jpg",
    price: 129,
    countInStock: 20,
    brand: "Oversize",
    rating: 4.2,
    numReviews: 10,
    description: "high quality product",
    isSale: false,
    isLatest: false,
  },
];

export const sampleUsers: User[] = [
  {
    name: "Dev1437",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456"),
    isAdmin: true,
  },
  {
    name: "User",
    email: "user@example.com",
    password: bcrypt.hashSync("123456"),
    isAdmin: false,
  },
];
