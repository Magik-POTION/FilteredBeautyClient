/**
 * Represents a product.
 */
export default class Product {
    /**
     *
     * @param {*} product, a product element from a database.
     */
    constructor(product) {
        this.id = product.id;
        this.brand = product.brand;
        this.name = product.name;
        this.image_link = product.image_link;
        this.description = product.description;
        this.category = product.category;
        this.product_type = product.product_type;
        this.tag_list = product.tag_list;
        this.api_featured_image = product.api_featured_image;
        this.product_colors = product.product_colors;
    }

    getProperties() {
        return {
            id: this.id,
            brand: this.brand,
            name: this.name,
            image_link: this.image_link,
            description: this.description,
            category: this.category,
            product_type: this.product_type,
            tag_list: this.tag_list,
            api_featured_image: this.api_featured_image,
            product_colors: this.product_colors,
        };
    }
}
