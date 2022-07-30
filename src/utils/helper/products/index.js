import Product from "../../../models/product.model.js";

export const helperCreateProducts = (data, user) => {
    const { userName } = user;
    const {
        name,
        images,
        imageBanner,
        description,
        category
    } = data;

    const product = new Product({
        userName, name, images, imageBanner, description, category
    });

    return product;
}
export const helperUpdateProducts = (data, product) => {

    const {
        name,
        images,
        imageBanner,
        description,
        category
    } = data

    product.userName = product.userName;
    product.name = name || product.name;
    product.images = images || product.images;
    product.imageBanner = imageBanner || product.imageBanner;
    product.description = description || product.description;
    product.category = category || product.category;

    return product;
}