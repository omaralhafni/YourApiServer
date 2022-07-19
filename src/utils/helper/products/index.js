import Product from "../../../models/product.model";

export const helperCreateProducts = (data, user) => {
    const { _id } = user;
    const {
        name,
        images,
        imageBanner,
        description,
        category
    } = data;

    const product = new Product({
        userId: _id, name, images, imageBanner, description, category
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

    product.userId = product.userId;
    product.name = name || product.name;
    product.images = images || product.images;
    product.imageBanner = imageBanner || product.imageBanner;
    product.description = description || product.description;
    product.category = category || product.category;

    return product;
}